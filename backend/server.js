// backend/server.js — GROQ-ONLY VERSION WITH CORRECT CORS

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { generateGroq } from "./providers/groq.js";

const app = express();

/* ----------------------------------------------------------- */
/*                     🚀 FIXED CORS CONFIG                    */
/* ----------------------------------------------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://promptstudio-sand.vercel.app",   // your Vercel frontend
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Allow preflight
app.options("*", cors());

/* ----------------------------------------------------------- */
/*                       BASIC CONFIG                          */
/* ----------------------------------------------------------- */
app.use(express.json());
const PORT = process.env.PORT || 4000;

/* ----------------------------------------------------------- */
/*                          HEALTH                             */
/* ----------------------------------------------------------- */
app.get("/health", (_req, res) => {
  return res.json({
    status: "ok",
    provider: "groq",
    groq_key_loaded: !!process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || "llama-3.1-8b-instant"
  });
});

/* ----------------------------------------------------------- */
/*                    SYSTEM PROMPT BUILDER                    */
/* ----------------------------------------------------------- */
function buildSystemPrompt(phrase, creativity = "medium", preset = "general") {
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
      "AI image prompt writer specializing in cinematic detail, composition, and styles"
  };

  return `
You are a ${presetRoles[preset] || presetRoles["general"]}.
Your job is to expand a short phrase into a complete, production-ready professional AI prompt.

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

Only output the fully formatted prompt. No meta text.
  `;
}

/* ----------------------------------------------------------- */
/*                        MAIN ROUTE                           */
/* ----------------------------------------------------------- */
app.post("/generate-prompt", async (req, res) => {
  try {
    const { phrase, creativity = "medium", preset = "general" } = req.body;

    if (!phrase || phrase.trim().length < 2) {
      return res.status(400).json({ error: "Please provide a short phrase." });
    }

    const systemPrompt = buildSystemPrompt(phrase, creativity, preset);
    const userPrompt = `Expand into a complete professional prompt following all system instructions.`;

    const groqOutput = await generateGroq(systemPrompt, userPrompt, {
      max_tokens: 1500,
      temperature:
        creativity === "high" ? 0.9 : creativity === "low" ? 0.2 : 0.6
    });

    return res.json({
      provider: "groq",
      mode: "live",
      result: groqOutput.text
    });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({
      error: "Groq request failed",
      details: err.message
    });
  }
});

/* ----------------------------------------------------------- */
/*                       START SERVER                          */
/* ----------------------------------------------------------- */
app.listen(PORT, () => {
  console.log(`🔥 AI Prompt Writer backend running on port ${PORT} (Groq-only mode)`);
});
