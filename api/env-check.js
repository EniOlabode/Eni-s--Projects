export const config = { runtime: "nodejs" };

export default function handler(req, res) {
  res.status(200).json({
    OPENAI_API_KEY_present: !!process.env.OPENAI_API_KEY,
    OPENAI_API_KEY2_present: !!process.env.OPENAI_API_KEY2,
    _v: "env-check@1"
  });
}
