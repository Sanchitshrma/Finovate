// Gemini client backed by the dashboard API proxy.
import api from "./axios";

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
