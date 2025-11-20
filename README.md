Below is a **clean, professional, production-ready README.md** tailored specifically for **your AI Prompt Writer project** (Groq-only version + modern UI).
It will look great on GitHub and clearly explain everything to developers and users.

---

# 🚀 **AI Prompt Writer**

### Turn rough phrases into fully structured, professional AI prompts.

AI Prompt Writer is a modern, responsive, and ultra-fast web application that transforms **3–4 vague words** into a **fully engineered AI prompt** with:

* Persona
* Deep context
* Task definition
* Output format
* Tone/style
* Creativity controls
* Constraints & rules
* Professional structure

Built with a **premium SaaS-style UI** and powered by **Groq LLMs (FREE — fastest models available)**.

---

# 🌟 **Features**

### 🧠 AI Prompt Generation

* Converts short phrases into full production-level prompts
* Supports multiple presets:
  **General, Writing, Coding, Marketing, Design, Image**
* Three creativity modes:
  **Grounded · Balanced · Exploratory**

### ⚡ Powered by Groq

* Uses **llama3.1 models** (free + extremely fast)
* No rate limits like OpenAI free tier
* Reliable + low latency

### 🎨 Premium UI/UX

* Glassmorphism + modern gradients
* Responsive layout
* Auto-growing textarea
* Smooth transitions
* Copy-to-clipboard animation
* Quick-start templates
* Prompt history tracking

### 🛠 Tech Stack

**Frontend:** Next.js + TailwindCSS
**Backend:** Node.js + Express
**AI Provider:** Groq Llama 3.1 (free)
**Styling:** TailwindCSS + modern UI patterns

---

# 📂 **Project Structure**

```
/frontend
  /components
  /styles
  /pages
/backend
  /providers
  server.js
  .env
```

---

# 🔧 **Setup Instructions**

## 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-prompt-writer.git
cd ai-prompt-writer
```

---

## 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Add your `.env` file

Create `backend/.env`:

```
PORT=4000

# Groq API Key (Required)
GROQ_API_KEY=your_groq_key_here

# Groq model
GROQ_MODEL=llama-3.1-8b-instant
```

You can get your free key at:
👉 [https://console.groq.com/keys](https://console.groq.com/keys)

---

## 4️⃣ Run backend

```bash
npm run dev
```

Backend runs at:
**[http://localhost:4000](http://localhost:4000)**

---

## 5️⃣ Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## 6️⃣ Configure frontend `.env.local`

Create:

```
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

---

## 7️⃣ Start frontend

```bash
npm run dev
```

Frontend runs at:
**[http://localhost:3000](http://localhost:3000)**

---

# 🧪 API Endpoint

### `POST /generate-prompt`

Request body:

```json
{
  "phrase": "react login page",
  "creativity": "medium",
  "preset": "coding"
}
```

Response:

```json
{
  "source": "groq",
  "mode": "live",
  "result": { "raw": "..." }
}
```

---

# 🖥 Screenshots (Optional — add once deployed)

You can add screenshots like:

```
![Prompt Writer Screenshot](./screenshots/main-ui.png)
```

---

# 🚀 Deployment Guide

### Frontend → Vercel

```
vercel deploy
```

### Backend → Render

* Create Web Service
* Set Environment Variables
* Deploy from GitHub

I can generate a full deployment guide if you want.

---

# 💡 Future Enhancements

* Export prompts (JSON, TXT, Markdown)
* Multiple output styles (funny, strict, academic)
* Prompt marketplace
* User accounts + saved prompts
* Multi-agent workflow generator

---

# 📝 License

MIT License — free to modify and use commercially.

---

# ❤️ Contributing

Pull requests are welcome!
If you'd like help improving the project, open an issue or ask me directly.
