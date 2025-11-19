// backend/providers/groq.js

import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

// Create client only if API key exists
// (Prevents crashes in server startup)
let client = null;
if (process.env.GROQ_API_KEY) {
  client = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

/**
 * Supported Groq models (2025)
 * You can let users choose, or auto-select best model.
 */
const AVAILABLE_MODELS = [
  "llama-3.1-70b-versatile",  // Best + free
  "llama-3.1-8b-instant",     // Fastest + free
  "gemma2-9b-it",             // Optional alternative
  "mixtral-8x7b-32768"        // Also available
];

/**
 * Select an appropriate model based on:
 * - opts.model
 * - env var GROQ_MODEL
 * - fallback chain
 */
function selectModel(preferred) {
  if (preferred && AVAILABLE_MODELS.includes(preferred)) return preferred;

  if (process.env.GROQ_MODEL && AVAILABLE_MODELS.includes(process.env.GROQ_MODEL)) {
    return process.env.GROQ_MODEL;
  }

  // Default fallback
  return "llama-3.1-8b-instant";
}

/**
 * Generate text using Groq API
 */
export async function generateGroq(systemPrompt, userPrompt, opts = {}) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("missing_groq_api_key");
  }

  const model = selectModel(opts.model);

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    max_tokens: opts.max_tokens || 1500,
    temperature:
      typeof opts.temperature === "number" ? opts.temperature : 0.6
  });

  const text = response.choices?.[0]?.message?.content || "";

  return {
    text,
    raw: text
  };
}
