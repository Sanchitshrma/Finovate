require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Lightweight fetch polyfill for environments where global fetch is unavailable (e.g., Node < 18)
// This is used by the Gemini AI fallback path below.
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const UserData = require("./models/UserModel");
const { WatchlistModel } = require("./models/WatchlistModel");
const { authenticateToken } = require("./middleware/auth");

const PORT = 8000;
const uri = process.env.MONGODB_URL;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempHoldings = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// Watchlist routes
app.get("/watchlist", authenticateToken, async (req, res) => {
  try {
    const watchlist = await WatchlistModel.find({ userId: req.user.id }).sort({ addedAt: -1 });
    res.json(watchlist.map(item => item.symbol));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch watchlist" });
  }
});

app.post("/watchlist", authenticateToken, async (req, res) => {
  try {
    const { symbol } = req.body;
    
    if (!symbol) {
      return res.status(400).json({ message: "Stock symbol is required" });
    }

    // Check if already in watchlist
    const existing = await WatchlistModel.findOne({ 
      userId: req.user.id, 
      symbol: symbol.toUpperCase() 
    });

    if (existing) {
      return res.status(400).json({ message: "Stock already in watchlist" });
    }

    const watchlistItem = new WatchlistModel({
      userId: req.user.id,
      symbol: symbol.toUpperCase(),
    });

    await watchlistItem.save();
    res.status(201).json({ message: "Stock added to watchlist", symbol: symbol.toUpperCase() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add stock to watchlist" });
  }
});

app.delete("/watchlist/:symbol", authenticateToken, async (req, res) => {
  try {
    const { symbol } = req.params;
    
    const result = await WatchlistModel.findOneAndDelete({
      userId: req.user.id,
      symbol: symbol.toUpperCase(),
    });

    if (!result) {
      return res.status(404).json({ message: "Stock not found in watchlist" });
    }

    res.json({ message: "Stock removed from watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove stock from watchlist" });
  }
});

// AI Insights proxy (Gemini)
app.post('/ai/insights', authenticateToken, async (req, res) => {
  // Helper to always produce HTML from markdown, even if 'marked' fails
  const mdToHtml = async (md = '') => {
    try {
      const { marked } = await import('marked');
      return marked.parse(md || '');
    } catch {
      // Minimal fallback: paragraphs + bold
      const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const p = esc(md).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return `<div>${p.split(/\n\n+/).map(x=>`<p>${x.replace(/\n/g,'<br>')}</p>`).join('')}</div>`;
    }
  };

  try {
    const { symbol, history = [], extraContext = '', models = [], apiKey } = req.body || {};
    const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || apiKey;
    if (!GEMINI_KEY) {
      const html = await mdToHtml('Gemini API key not configured on server');
      return res.status(500).json({ message: 'Gemini API key not configured on server', html, text: 'Gemini API key not configured on server' });
    }

    // Prepare history and simple stats
    const hist = (history || []).map(p => ({ date: new Date(p.date), close: Number(p.close) }))
      .filter(p => !Number.isNaN(p.close))
      .sort((a,b) => a.date - b.date);
    const first = hist[0]?.close ?? 0;
    const last = hist[hist.length-1]?.close ?? 0;
    const cagr = (first>0 && last>0) ? Math.pow(last/first, 1/5)-1 : 0;
    let peak = first || 0; let maxDrawdown=0;
    for (const p of hist) { peak = Math.max(peak, p.close); const dd = (p.close-peak)/peak; if (dd<maxDrawdown) maxDrawdown=dd; }

    const prompt = `Create a professional research brief (~500–700 words) for the stock below with clear section headings in markdown. Sections to include:\n1) Overview (business, listing exchange)\n2) 5-year performance (CAGR, annualized volatility, max drawdown)\n3) Trend & key levels (recent momentum, support/resistance, notable inflection dates)\n4) Risks & what to watch\n5) Catalysts (near-term and medium-term)\n6) Outlook scenarios (bull / base / bear) with important levels\n7) Concise closing summary with actionable watchpoints.\n\nCRITICAL FORMAT & LOCALE RULES:\n- Assume Indian markets (NSE/BSE) and use Indian Rupee only.\n- Currency must be INR with the rupee symbol (₹) everywhere.\n- Do NOT use the $ symbol or USD unless explicitly stated; convert to ₹ if any figures are mentioned.\n- Indian numbering (lakh/crore) is acceptable when it improves readability.\n- If data is unknown, state it explicitly; do not fabricate.\n\nSymbol: ${symbol}\nCAGR: ${(cagr*100).toFixed(2)}%  MaxDD: ${(maxDrawdown*100).toFixed(2)}%\nHistory (date, close):\n${hist.slice(-750).map(p=>`${p.date.toISOString().slice(0,10)}, ${p.close}`).join('\n')}\n${extraContext ? `\nExtra context: ${extraContext}` : ''}`;

    // Call Gemini via REST using a single fast model to keep latency low.
    try {
      const MODEL = 'gemini-2.5-flash';
      const body = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(GEMINI_KEY)}`;
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const raw = await r.text().catch(() => '');
      if (!r.ok) {
        const html = await mdToHtml(raw || 'Gemini error');
        return res.status(r.status).json({
          message: raw || 'Gemini error',
          html,
          text: raw || 'Gemini error',
        });
      }

      let data = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        // If parsing fails, just return the raw text as the response body.
        const html = await mdToHtml(raw || 'Gemini response parse error');
        return res.json({ text: raw || 'Gemini response parse error', html });
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const html = await mdToHtml(text || '');
      return res.json({ text, html });
    } catch (sdkErr) {
      console.error('Gemini REST call failed:', sdkErr);
      const html = await mdToHtml('Gemini API call failed.');
      return res
        .status(500)
        .json({ message: 'Gemini API call failed.', html, text: 'Gemini API call failed.' });
    }
  } catch (e) {
    console.error('AI insights proxy failed:', e);
    res.status(500).json({ message: 'AI insights failed', html: '<p>AI insights failed.</p>', text: 'AI insights failed.' });
  }
});

app.get("/allHoldings", authenticateToken, async (req, res) => {
  try {
    // Get holdings for the authenticated user
    let allHoldings = await HoldingsModel.find({ userId: req.user.id });
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", authenticateToken, async (req, res) => {
  try {
    // Get positions for the authenticated user
    let allPositions = await PositionsModel.find({ userId: req.user.id });
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch positions" });
  }
});

// app.post("/newOrder", (req, res) => {
//   let newOrder = new OrdersModel({
//     name: req.body.name,
//     qty: req.body.qty,
//     price: req.body.price,
//     mode: req.body.mode,
//   });

//   newOrder.save();

//   res.send("Order Saved");
// });

app.post("/newOrder", authenticateToken, async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const userId = req.user.id;

  try {
    // Save the order
    const newOrder = new OrdersModel({
      userId,
      name,
      qty,
      price,
      mode,
      date: new Date(),
    });
    await newOrder.save();

    // Update holdings based on buy/sell
    if (mode === "BUY") {
      // Check if user already has this stock
      let existingHolding = await HoldingsModel.findOne({ userId, name });

      if (existingHolding) {
        // Update existing holding - calculate new average price
        const totalQty = existingHolding.qty + qty;
        const totalCost = existingHolding.avg * existingHolding.qty + price * qty;
        const newAvg = totalCost / totalQty;

        existingHolding.qty = totalQty;
        existingHolding.avg = newAvg;
        existingHolding.price = price;
        await existingHolding.save();
      } else {
        // Create new holding
        const newHolding = new HoldingsModel({
          userId,
          name,
          qty,
          avg: price,
          price: price,
          net: "0.00%",
          day: "0.00%",
        });
        await newHolding.save();
      }
    } else if (mode === "SELL") {
      // Find existing holding
      let existingHolding = await HoldingsModel.findOne({ userId, name });

      if (existingHolding) {
        if (existingHolding.qty >= qty) {
          // Reduce quantity
          existingHolding.qty -= qty;

          if (existingHolding.qty === 0) {
            // Remove holding if quantity becomes 0
            await HoldingsModel.deleteOne({ _id: existingHolding._id });
          } else {
            // Update price
            existingHolding.price = price;
            await existingHolding.save();
          }
        } else {
          return res.status(400).json({ message: "Insufficient quantity to sell" });
        }
      } else {
        return res.status(400).json({ message: "You don't own this stock" });
      }
    }

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

app.get("/orders", authenticateToken, async (req, res) => {
  try {
    // Get orders for the authenticated user
    const orders = await OrdersModel.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

app.get("/holdings/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const userHoldings = await HoldingsModel.find({ userId });
    res.json(userHoldings);
  } catch (err) {
    res.status(500).send("Failed to fetch holdings");
  }
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const findEmail = await UserData.find({ email: email });
  if (findEmail.length > 0) {
    return res.status(400).json({ message: "User already exist" });
  } else {
    let newUser = new UserData({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      message: "success",
      token: token,
      user: { id: newUser._id, email: newUser.email },
    });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findEmail = await UserData.find({ email: email });
  if (findEmail.length > 0) {
    if (await bcrypt.compareSync(password, findEmail[0].password)) {
      // Generate JWT token
      const token = jwt.sign(
        { id: findEmail[0]._id, email: findEmail[0].email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        message: "User found",
        token: token,
        user: { id: findEmail[0]._id, email: findEmail[0].email },
      });
    } else {
      return res.status(400).json({ message: "Password not match" });
    }
  } else {
    return res.status(400).json({ message: "User not found" });
  }
});

// Verify token endpoint
app.get("/verify", authenticateToken, (req, res) => {
  // If authenticateToken middleware passes, token is valid
  res.json({
    valid: true,
    user: { id: req.user.id, email: req.user.email },
  });
});

// Add sample positions for testing (DEVELOPMENT ONLY)
app.post("/addSamplePositions", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Clear existing positions
    await PositionsModel.deleteMany({ userId });

    // Sample positions
    const samplePositions = [
      {
        userId,
        product: "MIS", // Intraday
        name: "EVEREADY",
        qty: 2,
        avg: 316.27,
        price: 312.35,
        net: "-1.24%",
        day: "-1.24%",
        isLoss: true,
      },
      {
        userId,
        product: "CNC", // Delivery
        name: "JUBLFOOD",
        qty: 1,
        avg: 3124.75,
        price: 3082.65,
        net: "-1.35%",
        day: "-1.35%",
        isLoss: true,
      },
    ];

    await PositionsModel.insertMany(samplePositions);

    res.status(201).json({ 
      message: "Sample positions added successfully",
      count: samplePositions.length 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add sample positions" });
  }
});

app.listen(PORT, () => {
  console.log("App started", PORT);
  mongoose.connect(uri);
  console.log("DB Connected");
});
