// pages/api/generate-prompt.js
import { generateGroq } from "../../providers/groq.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phrase, creativity = "medium", preset = "general" } = req.body;

    if (!phrase || phrase.trim().length < 2) {
      return res.status(400).json({ error: "Please provide a short phrase." });
    }

    // Build system prompt
    const creativityPercent =
      creativity === "high" ? "80%" : creativity === "low" ? "40%" : "70%";

    const presetRoles = {
      general:
        "versatile AI prompt engineer with deep reasoning and precision writing expertise",
      writing:
        "expert content strategist with advanced narrative, tone, and clarity specialization",
      coding:
        "senior full-stack engineer with architecture, debugging, and best-practice mastery",
      marketing:
        "growth strategist skilled in messaging, consumer psychology, and campaign design",
      design:
        "UI/UX designer specializing in clarity, hierarchy, layout, and visual storytelling",
      image:
        "AI image prompt writer specializing in cinematic detail, composition, and styles",
    };

    const systemPrompt = `
You are a ${presetRoles[preset] || presetRoles["general"]}.
Your job is to expand a short phrase into a complete, production-ready AI prompt.

Short phrase: "${phrase}"
Creativity setting: ${creativityPercent}

Follow this structure EXACTLY:
# ROLE & EXPERTISE
# PRIMARY TASK
# CONTEXT & BACKGROUND
# TONE & COMMUNICATION STYLE
# OUTPUT FORMAT & STRUCTURE
# CONSTRAINTS & REQUIREMENTS
# FINAL INSTRUCTIONS

Only output the fully formatted prompt.
`;

    const userPrompt = `Expand into a complete professional prompt following all system instructions.`;

    // Call GROQ
    const groqOutput = await generateGroq(systemPrompt, userPrompt, {
      max_tokens: 1500,
      temperature:
        creativity === "high" ? 0.9 : creativity === "low" ? 0.2 : 0.6,
    });

    return res.status(200).json({
      provider: "groq",
      mode: "live",
      result: groqOutput.text,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Groq request failed",
      details: err.message,
    });
  }
}
