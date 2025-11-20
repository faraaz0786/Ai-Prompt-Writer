# 🚀 AI Prompt Writer

**A lightning-fast AI-powered prompt generator built on Groq + Next.js.**
Craft fully-structured, production-ready prompts from just a few words.

Live Demo → **[https://promptstudio-sand.vercel.app](https://promptstudio-sand.vercel.app)**
(Deployed on Vercel)

---

## ✨ What does this tool do?

AI Prompt Writer takes a short rough phrase like:

> “social media plan for a new fitness app”

…and instantly transforms it into a **complete, layered, professional prompt** including:

* **Persona**
* **Primary task**
* **Deep contextual background**
* **Tone & style**
* **Output format expectations**
* **Constraints & rules**
* **Final instructions**

Generated using **Groq’s ultra-fast LLMs (llama-3.1-8b-instant / 70b-versatile)**.

---

## 🛠️ Tech Stack

### **Frontend**

* Next.js 14 (App Router)
* React (Client Components)
* TailwindCSS
* Deployed on Vercel

### **Backend (Serverless)**

* Next.js API Routes → `/pages/api/generate-prompt.js` & `/pages/api/health.js`
* Groq SDK (`groq-sdk`)
* Lives inside Vercel (no separate backend)

---

## ⚡ Features

### ✅ **Prompt Expander**

Turn a short phrase into a full, refined, structured prompt.

### ✅ **Creativity Modes**

* Grounded
* Balanced
* Exploratory

### ✅ **Preset Categories**

* General
* Coding
* Writing
* Marketing
* Design
* Image Generation

### ✅ **History + Quick Starts**

Save last 4 outputs + 1-click starter ideas.

### ✅ **Live Health Indicator**

Shows real-time backend status.

### ✅ **Groq-Only Backend (Fast + Free)**

Uses:

* **llama-3.1-8b-instant** (default)

---

## 📁 Project Structure

```
/frontend
│
├── pages
│   ├── index.js              # Main UI
│   └── api
│       ├── generate-prompt.js  # Backend prompt generator (Groq)
│       └── health.js           # Health check API
│
├── components
│   ├── Header.js
│   └── PromptCard.js
│
├── styles
│   └── globals.css
│
└── .env.local (ignored)
```

---

## 🔧 Environment Variables

Create `.env.local`:

```
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
NEXT_PUBLIC_API_BASE=/api
```

Your key stays server-side safe.

---

## ▶️ Running Locally

```
npm install
npm run dev
```

Open → [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploying (Vercel)

Just push to GitHub → Vercel auto-builds:

* UI
* API routes
* No backend separation needed

Add variables under:

**Vercel → Project → Settings → Environment Variables**

---

## 🤝 Contributing

Feedback, ideas, or improvements are welcome!
Create an issue or PR.

---

## 🧑‍💻 Creator

Built by **Faraaz** — a quick idea turned into a fast, deployable AI tool.
