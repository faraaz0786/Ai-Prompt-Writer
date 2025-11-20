export default function handler(req, res) {
    return res.status(200).json({
      status: "ok",
      provider: "groq",
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant"
    });
  }
  