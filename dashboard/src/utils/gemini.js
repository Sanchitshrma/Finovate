// Gemini client; prefers backend proxy to avoid CORS; falls back to direct REST.
import api from './axios';

export async function generateStockInsights({
  apiKey,
  symbol,
  history,
  extraContext,
}) {
  if (!apiKey) {
    throw new Error("Missing REACT_APP_GEMINI_API_KEY");
  }
  const MODELS = [
    // Prefer current 2.x Gemini text models; backend will fall back through this list.
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash-001",
  ];

  const summaryStats = (() => {
    if (!history || history.length === 0) return {};
    const first = history[0].close;
    const last = history[history.length - 1].close;
    const cagr = Math.pow(last / first, 1 / 5) - 1;
    let maxDrawdown = 0;
    let peak = history[0].close;
    for (const p of history) {
      peak = Math.max(peak, p.close);
      const dd = (p.close - peak) / peak;
      if (dd < maxDrawdown) maxDrawdown = dd;
    }
    const returns = [];
    for (let i = 1; i < history.length; i++) {
      returns.push(history[i].close / history[i - 1].close - 1);
    }
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance =
      returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
    const vol = Math.sqrt(variance) * Math.sqrt(252); // annualized
    return { cagr, maxDrawdown, vol };
  })();

  const text = `You are a financial research assistant.
Given the following stock symbol and last 5 years of daily adjusted closing prices, provide a concise yet comprehensive analysis:
- Company overview (if known), primary business, and region
- 5-year performance summary with CAGR, annualized volatility, and max drawdown
- Trend phases (bull/bear/range) and notable inflection dates
- Risk factors and what to watch
- Outlook scenarios (bull/base/bear) with key levels
- DO NOT invent data; if something is unknown, say so. Keep under 350 words.

Symbol: ${symbol}
Summary stats: CAGR=${(summaryStats.cagr * 100).toFixed(2)}%, Vol=${(
    summaryStats.vol * 100
  ).toFixed(2)}%, MaxDD=${(summaryStats.maxDrawdown * 100).toFixed(2)}%
History (date, close):
${(history || [])
  .slice(-750)
  .map((p) => `${p.date.toISOString().slice(0, 10)}, ${p.close}`)
  .join("\n")}
${extraContext ? `\nExtra context: ${extraContext}` : ""}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text }],
      },
    ],
  };

  // First try backend proxy
  try {
    const payload = {
      symbol,
      history: (history || []).map((p) => ({ date: p.date.toISOString(), close: p.close })),
      extraContext,
      models: MODELS,
      apiKey,
    };
    const resp = await api.post("/ai/insights", payload);
    return {
      text: resp.data?.text || resp.data?.message || "No response.",
      html: resp.data?.html || "",
    };
  } catch (proxyErr) {
    // Surface backend error directly in the UI instead of falling back to browser fetch,
    // which often results in an unhelpful "Failed to fetch".
    const backendMessage =
      proxyErr?.response?.data?.message ||
      proxyErr?.response?.data?.error ||
      proxyErr?.message;

    throw new Error(backendMessage || "AI insights backend error");
  }
}
