// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// === your coach handler logic ===
async function coachHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", _v: "coach@4" });
  }

  try {
    const body = req.body || {};
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
    const context = body?.context ?? {};

    const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY2;
    if (!apiKey) {
      console.error("[coach] Missing OPENAI_API_KEY");
      return res.status(500).json({ error: "Server not configured: missing OPENAI_API_KEY", _v: "coach@4" });
    }

    const system =
      "You are Mayor Chat, a Detroit-focused grant coach. Assess eligibility; list categories; outline steps, deadlines, and document checklists; draft short grant answers. Consider city/Wayne County/State of Michigan/federal (e.g., SBIR/STTR)/private foundations and CDFI/credit union microloans. Tailor to ZIP, stage, industry, and hiring goals (returning citizens, youth). Never ask for SSNs or bank details.";

    const messages = [
      { role: "system", content: system },
      { role: "user", content: typeof context === "string" ? context : JSON.stringify(context) },
      ...rawMessages.map(m => (typeof m === "string" ? { role: "user", content: m } : m)),
    ];

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!r.ok) {
      const details = await r.text();
      console.error("[coach] OpenAI error", r.status, details);
      return res.status(502).json({ error: "OpenAI error", status: r.status, details, _v: "coach@4" });
    }

    const data = await r.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply, _v: "coach@4" });
  } catch (e) {
    console.error("[coach] Unexpected error", e);
    return res.status(500).json({ error: "Unexpected server error", details: String(e?.message || e), _v: "coach@4" });
  }
}

// === Login handler ===
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // For now, simple validation - you can integrate with Supabase later
    // This is a basic implementation
    if (email && password.length >= 6) {
      return res.status(200).json({ 
        message: "Login successful", 
        user: { email } 
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("[login] Error:", error);
    return res.status(500).json({ error: "Server error during login" });
  }
});

// === Signup handler ===
app.post("/api/signup", async (req, res) => {
  try {
    const { companyName, email, password, industry, zip } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // For now, simple validation - you can integrate with Supabase later
    // This is a basic implementation
    return res.status(201).json({ 
      message: "Account created successfully", 
      user: { 
        email, 
        companyName: companyName || null,
        industry: industry || null,
        zip: zip || null
      } 
    });
  } catch (error) {
    console.error("[signup] Error:", error);
    return res.status(500).json({ error: "Server error during signup" });
  }
});

app.post("/api/coach", coachHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[server] API listening on http://localhost:${PORT}`);
  console.log(`[server] Available endpoints: /api/login, /api/signup, /api/coach`);
});
