import React, { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getHistoricalDaily } from "../services/stockService";
import { generateStockInsights } from "../utils/gemini";
import DOMPurify from 'dompurify';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const GEMINI_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const StockInsights = () => {
  const [symbol, setSymbol] = useState("");
  const [history, setHistory] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [analysisHtml, setAnalysisHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rangeYears, setRangeYears] = useState(5); // 0.5, 1, 2, 5
  const [exportOpen, setExportOpen] = useState(false);
  const analysisRef = useRef(null);

  const chartData = useMemo(() => {
    const labels = history.map(h => h.date.toISOString().slice(0, 10));
    const data = history.map(h => h.close);
    return {
      labels,
      datasets: [
        {
          label: `${symbol || 'Symbol'} price`,
          data,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          tension: 0.2,
          pointRadius: 0,
        },
      ],
    };
  }, [history, symbol]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      x: { type: 'category', ticks: { maxTicksLimit: 12 } },
      y: { beginAtZero: false },
    },
  };

  const run = async (yr = rangeYears) => {
    setError("");
    setAnalysis("");
    setAnalysisHtml("");
    setLoading(true);
    try {
      const cleaned = (symbol || '').trim().toUpperCase();
      if (!cleaned) {
        setError('Enter a stock symbol (e.g., TCS, RELIANCE, INFY).');
        return;
      }
      const hist = await getHistoricalDaily(cleaned, yr);
      setHistory(hist);
      const label = yr === 0.5 ? 'last 6 months' : yr === 1 ? 'last 1 year' : yr === 2 ? 'last 2 years' : 'last 5 years';
      const result = await generateStockInsights({ apiKey: GEMINI_KEY, symbol: cleaned, history: hist, extraContext: `Range used: ${label}` });
      // Strict mode: only use server-provided HTML (no client-side markdown parsing)
      setAnalysis(result.text || "");
      let html = (result.html || '').trim();
      if (html) {
        html = DOMPurify.sanitize(html);
      }
      setAnalysisHtml(html);
      setExportOpen(false);
    } catch (e) {
      console.error(e);
      setError(e.message || 'Failed to generate insights.');
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    if (!history || history.length < 2) return null;
    const first = history[0].close;
    const last = history[history.length - 1].close;
    const years = rangeYears;
    const cagr = years > 0 ? Math.pow(last / first, 1 / years) - 1 : 0;
    let peak = history[0].close, maxDD = 0;
    for (const p of history) { peak = Math.max(peak, p.close); const dd = (p.close - peak) / peak; if (dd < maxDD) maxDD = dd; }
    const rets = []; for (let i = 1; i < history.length; i++) rets.push(history[i].close / history[i-1].close - 1);
    const mean = rets.reduce((a,b)=>a+b,0)/rets.length; const var_ = rets.reduce((a,b)=>a+Math.pow(b-mean,2),0)/rets.length; const vol = Math.sqrt(var_) * Math.sqrt(252);
    return { first, last, cagr, maxDD, vol };
  }, [history, rangeYears]);

  const RangeButton = ({ y, label }) => (
    <button
      className={"btn " + (y === rangeYears ? 'btn-blue' : '')}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: y===rangeYears? '#4184f3' : '#fff', color: y===rangeYears? '#fff' : '#111' }}
      onClick={() => { setRangeYears(y); run(y); }}
      disabled={loading}
    >{label}</button>
  );

  // Export helpers
  const download = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const exportMarkdown = () => {
    if (!analysis && !analysisHtml) return;
    const md = analysis && analysis.trim().length ? analysis : (analysisRef.current ? analysisRef.current.innerText : '');
    const filename = `${(symbol||'stock')}_${rangeYears===0.5?'6M':rangeYears+'Y'}_insights.md`;
    download(new Blob([md], { type: 'text/markdown;charset=utf-8' }), filename);
  };

  const exportPDF = () => {
    const html = analysisHtml && analysisHtml.trim().length
      ? analysisHtml
      : `<pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;">${(analysis||'').replace(/[&<>]/g, c=>({"&":"&amp;","<":"&lt;",
">":"&gt;"}[c]))}</pre>`;
    const w = window.open('', '_blank');
    if (!w) return;
    const css = `body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; margin:24px;} h1,h2,h3{margin:10px 0 6px;} p{margin:6px 0;} ul{padding-left:18px;} .muted{color:#6b7280;font-size:12px;margin-bottom:10px;}`;
    const header = `<div class="muted">${symbol?.toUpperCase()||''} • Range: ${rangeYears===0.5?'6M':rangeYears+'Y'} • Exported ${new Date().toLocaleString()}</div>`;
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Insights</title><style>${css}</style></head><body>${header}${html}</body></html>`);
    w.document.close();
    // Wait for layout then open print dialog (user can Save as PDF)
    setTimeout(() => { w.focus(); w.print(); }, 400);
  };

  // Close export menu on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest('.ai-export')) setExportOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="panel ai-insights" style={{ padding: 16 }}>
      <div className="ai-header">
        <div>
          <h2 className="ai-title">AI Stock Insights</h2>
          <p className="ai-subtitle">Enter an NSE/BSE symbol to analyze, pick a range, then generate insights in ₹.</p>
        </div>
        <div className="ai-toolbar">
          <input
            type="text"
            placeholder="e.g., RELIANCE, TCS, INFY"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            onKeyDown={(e) => { if (e.key === 'Enter') run(); }}
            className="ai-input"
          />
          <button onClick={() => run()} className="ai-primary" disabled={loading}>
            {loading ? 'Analyzing…' : 'Get insights'}
          </button>
          <div className="ai-export">
            <button className="ai-ghost" onClick={() => setExportOpen(v=>!v)} title="Export">Export</button>
            {exportOpen && (
              <div className="ai-export-menu">
                <button onClick={exportMarkdown}>Download Markdown (.md)</button>
                <button onClick={exportPDF}>Export to PDF…</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {!GEMINI_KEY && (
        <div className="ai-hint">Set REACT_APP_GEMINI_API_KEY to enable AI analysis.</div>
      )}

      {error && (
        <div style={{ color: '#b91c1c', marginTop: 12 }}>{error}</div>
      )}

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
        <RangeButton y={0.5} label="6M" />
        <RangeButton y={1} label="1Y" />
        <RangeButton y={2} label="2Y" />
        <RangeButton y={5} label="5Y" />
      </div>

      {(history.length > 0 || analysisHtml) && (
        <div className="ai-grid">
          <div className="ai-left">
            {history.length > 0 && (
              <>
                <div className="ai-chart" style={{ width: '100%', height: 320 }}>
                  <Line data={chartData} options={chartOptions} />
                </div>
                {stats && (
                  <div className="ai-stats" aria-live="polite">
                    Using range: {rangeYears===0.5? '6M': rangeYears+'Y'} · Start: {history[0].date.toISOString().slice(0,10)} · Latest: {history[history.length-1].date.toISOString().slice(0,10)} ·
                    Last price: {stats.last.toFixed(2)} · CAGR: {(stats.cagr*100).toFixed(2)}% · Vol: {(stats.vol*100).toFixed(2)}% · MaxDD: {(stats.maxDD*100).toFixed(2)}%
                  </div>
                )}
              </>
            )}
          </div>
          {analysisHtml && (
            <div className="ai-right">
              <div ref={analysisRef} className="ai-analysis" dangerouslySetInnerHTML={{ __html: analysisHtml }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockInsights;
