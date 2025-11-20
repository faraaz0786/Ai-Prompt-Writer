// providers/groq.js

import Groq from "groq-sdk";

/**
 * Clean and reliable Groq provider
 * Recommended models:
 *  - llama-3.1-8b-instant   (fastest, free)
 *  - llama-3.1-70b-versatile (smartest free)
 */

export async function generateGroq(systemPrompt, userPrompt, opts = {}) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY");
  }

  // Create client fresh for each request (best practice for serverless)
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  // Choose model
  const model =
    opts.model ||
    process.env.GROQ_MODEL ||
    "llama-3.1-8b-instant"; // default

  // Call Groq
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
    raw: response
  };
}
