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

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: messages,
        max_output_tokens: 500,
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
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply, _v: "coach@4" });
  } catch (e) {
    console.error("[coach] Unexpected error", e);
    return res.status(500).json({ error: "Unexpected server error", details: String(e?.message || e), _v: "coach@4" });
  }
}

app.post("/api/coach", coachHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[coach] API listening on http://localhost:${PORT}`);
});
