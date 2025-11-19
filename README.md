# AI Prompt Writer
Full-stack project: Next.js + Tailwind frontend, Node.js + Express backend.

Features:
- Converts a rough phrase (3-4 words) to a structured, production-ready AI prompt.
- Frontend: modern UI, autosize textarea, copy-to-clipboard animation, responsive, dark/light modes.
- Backend: /generate-prompt endpoint that proxies to OpenAI (or other LLM) and implements prompt-engine logic.

How to run (local):
1. Backend:
   - cd backend
   - cp .env.example .env and set OPENAI_API_KEY
   - npm install
   - npm run dev
2. Frontend:
   - cd frontend
   - cp .env.local.example .env.local and set NEXT_PUBLIC_API_BASE (e.g. http://localhost:4000)
   - npm install
   - npm run dev
