// api/coach.js
import { OpenAI } from 'openai';

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY2,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", _v: "coach@4" });
  }

  try {
    const body = req.body;
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const context = body?.context || {};

    // Check for API key
    if (!openai.apiKey) {
      return res.status(500).json({ 
        error: "Server not configured: missing OPENAI_API_KEY", 
        _v: "coach@4" 
      });
    }

    // Create system message with context
    const systemMessage = {
      role: "system",
      content: `You are Mayor Chat, a Detroit-focused grant coach. 
      Assess eligibility; list categories; outline steps, deadlines, and document checklists; draft short grant answers. 
      Consider city/Wayne County/State of Michigan/federal (e.g., SBIR/STTR)/private foundations and CDFI/credit union microloans. 
      Tailor to ZIP: ${context.profile?.zip || 'not provided'}, 
      stage: ${context.profile?.stage || 'not provided'}, 
      industry: ${context.profile?.industry || 'not provided'},
      hiring goals: ${context.profile?.isReturningCitizenHiring ? 'returning citizens' : ''} 
      ${context.profile?.youthHiring ? 'youth hiring' : ''}.
      Never ask for SSNs or bank details.`
    };

    // Prepare messages for OpenAI
    const openAIMessages = [systemMessage];
    
    // Add conversation history
    messages.forEach(msg => {
      openAIMessages.push({
        role: msg.role,
        content: msg.content
      });
    });

    // Use the correct Chat Completions API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: openAIMessages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    return res.status(200).json({ reply, _v: "coach@4" });
  } catch (e) {
    console.error("OpenAI API error:", e);
    return res.status(500).json({ 
      error: "Unexpected server error", 
      details: String(e?.message || e), 
      _v: "coach@4" 
    });
  }
}

export const config = {
  runtime: "nodejs",
};