'use client'
import { useEffect, useMemo, useState } from 'react'
import PromptCard from '../components/PromptCard'
import Header from '../components/Header'

const API_BASE = "/api";

const presetOptions = [
  { value: 'general', label: 'General', description: 'Versatile prompts for any task or workflow.' },
  { value: 'coding', label: 'Coding', description: 'Technical prompts for software development and engineering.' },
  { value: 'writing', label: 'Writing', description: 'Creative and professional writing prompts for content creation.' },
  { value: 'marketing', label: 'Marketing', description: 'Campaigns, copywriting, and growth strategy prompts.' },
  { value: 'design', label: 'Design', description: 'Visual design, UX/UI, and creative direction prompts.' },
  { value: 'image', label: 'Image', description: 'Image generation, editing, and visual content prompts.' }
]

const creativityLevels = [
  { value: 'low', label: 'Grounded', helper: 'Stick to literal instructions, deterministic output.' },
  { value: 'medium', label: 'Balanced', helper: 'Blend clarity with creative suggestions.' },
  { value: 'high', label: 'Exploratory', helper: 'Inventive tone, bold variations and riffs.' }
]

const quickStarts = [
  'React authentication system',
  'Blog post about AI trends',
  'Social media campaign strategy',
  'Mobile app UI design',
  'Product photography setup'
]

/* ----------------------- Local Fallback (unchanged) ------------------------- */
function buildLocalMock({ phrase }) {
  return { raw: `Mock prompt for: ${phrase}` }
}

/* --------------------- Fallback reason helper (kept) ------------------------ */
function describeFallback(reason) {
  if (!reason) return 'fallback'
  if (reason === 'client_network') return 'client network issue'
  return reason.replace(/_/g, ' ')
}

/* ---------------------------- MAIN COMPONENT ------------------------------- */

export default function Home() {
  const [phrase, setPhrase] = useState('')
  const [creativity, setCreativity] = useState('medium')
  const [preset, setPreset] = useState('general')

  // ❌ REMOVED provider + providerAvailability
  // const [provider, setProvider] = useState('openai')
  // const [providerAvailability, setProviderAvailability] = useState(...)

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusNote, setStatusNote] = useState('')
  const [apiStatus, setApiStatus] = useState({ healthy: false, label: 'Checking…' })
  const [history, setHistory] = useState([])

  const activePreset = useMemo(
    () => presetOptions.find((opt) => opt.value === preset) ?? presetOptions[0],
    [preset]
  )

  /* --------------------------- HEALTH CHECK (Simplified) -------------------- */
  useEffect(() => {
    async function ping() {
      try {
        const r = await fetch(`${API_BASE}/health`)
        if (!r.ok) throw new Error()

        setApiStatus({
          healthy: true,
          label: 'Live mode'
        })
      } catch {
        setApiStatus({ 
          healthy: false, 
          label: 'Offline' 
        })
      }
    }
    ping()
  }, [])

  /* ----------------------------- GENERATE ---------------------------------- */
  async function handleGenerate() {
    const trimmed = phrase.trim()
    if (!trimmed) {
      setErrorMessage('Give me at least two words to sculpt a prompt.')
      setStatusNote('')
      return
    }

    setErrorMessage('')
    setLoading(true)

    const payload = { phrase: trimmed, creativity, preset }  // ❗ provider removed

    try {
      const r = await fetch(`${API_BASE}/generate-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const j = await r.json()
      if (!r.ok || j.error) throw new Error(j.error || 'Unable to craft prompt.')

      setResult(j)

      // ❌ REMOVE degraded mode warnings
      setStatusNote('')

      setHistory((prev) =>
        [{ id: Date.now(), phrase: trimmed, preset, creativity, payload: j }, ...prev].slice(0, 4)
      )
    } catch (e) {
      const fallback = {
        source: 'local-fallback',
        mode: 'local',
        fallbackReason: 'client_network',
        result: buildLocalMock(payload),
        raw: buildLocalMock(payload).raw
      }

      setResult(fallback)
      setStatusNote('Could not reach backend. Showing local mock output.')

      setHistory((prev) =>
        [{ id: Date.now(), phrase: trimmed, preset, creativity, payload: fallback }, ...prev].slice(0, 4)
      )
    } finally {
      setLoading(false)
    }
  }

  /* ------------------------------ UI --------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#4c1d95_0%,_rgba(15,23,42,0)_60%)]" />
      <Header />

      <main className="max-w-6xl mx-auto mt-10">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">

          {/* LEFT: Prompt Editor */}
          <section className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10">

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-indigo-200/80">Prompt canvas</p>
                <h2 className="text-2xl font-semibold mt-2">{activePreset.label}</h2>
                <p className="text-sm text-slate-300">{activePreset.description}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  apiStatus.healthy ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-100'
                }`}
              >
                {apiStatus.label}
              </span>
            </div>

            {/* Starter phrase */}
            <div className="mt-6 space-y-4">
              <label className="text-xs uppercase tracking-[0.3em] text-indigo-200/80">Starter phrase</label>
              <div className="relative">
                <textarea
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  placeholder='Ex: "AI onboarding email series"'
                  className="w-full min-h-[140px] rounded-2xl bg-slate-900/60 border border-white/10 px-4 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400/70"
                />
                <span className="absolute bottom-3 right-4 text-xs text-slate-400">
                  {phrase.trim().length} chars
                </span>
              </div>
            </div>

            {/* Presets */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/80 mb-3">Presets</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {presetOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPreset(opt.value)}
                    className={`text-left rounded-2xl border px-4 py-3 transition-all ${
                      preset === opt.value
                        ? 'border-white/70 bg-white/10 shadow-lg shadow-indigo-500/20'
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-sm font-semibold">{opt.label}</div>
                    <p className="text-xs text-slate-300 mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ❌ Provider Dropdown removed completely */}

            {/* Creativity */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/80 mb-3">Creativity dial</p>
              <div className="flex flex-wrap gap-3">
                {creativityLevels.map((lvl) => (
                  <button
                    key={lvl.value}
                    onClick={() => setCreativity(lvl.value)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all ${
                      creativity === lvl.value
                        ? 'border-indigo-400 bg-indigo-500/10'
                        : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-300 mt-2">
                {creativityLevels.find((lvl) => lvl.value === creativity)?.helper}
              </p>
            </div>

            {/* Errors */}
            {errorMessage && (
              <div className="mt-6 text-sm text-rose-200 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3">
                {errorMessage}
              </div>
            )}
            {!errorMessage && statusNote && (
              <div className="mt-6 text-sm text-amber-100 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3">
                {statusNote}
              </div>
            )}

            {/* Generate */}
            <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
              <div className="text-xs text-slate-400">
                Tip: click a quick start on the right to auto-fill the field.
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-700 disabled:text-slate-400 transition px-6 py-3 rounded-full text-sm font-semibold"
              >
                {loading ? 'Crafting prompt…' : 'Generate prompt'}
              </button>
            </div>

            <div className="mt-8">
              <PromptCard data={result} />
            </div>
          </section>

          {/* Sidebar: Quickstarts + History */}
          <aside className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/80">Quick starts</p>
              <div className="mt-4 space-y-3">
                {quickStarts.map((item) => (
                  <button
                    key={item}
                    onClick={() => setPhrase(item)}
                    className="w-full text-left px-4 py-3 rounded-2xl border border-white/5 hover:border-indigo-300/60 transition"
                  >
                    <span className="text-sm">{item}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/80">Recent iterations</p>
              {history.length === 0 && (
                <p className="text-sm text-slate-400 mt-3">Generate prompts to build a mini history.</p>
              )}
              <div className="mt-4 space-y-3">
                {history.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => {
                      setPhrase(entry.phrase)
                      setCreativity(entry.creativity)
                      setPreset(entry.preset)
                    }}
                    className="w-full text-left px-4 py-3 rounded-2xl border border-white/5 hover:border-white/30 transition"
                  >
                    <div className="text-sm font-medium">{entry.phrase}</div>
                    <p className="text-xs text-slate-400 capitalize">
                      {entry.preset} · {entry.creativity}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
