'use client'
import {useMemo, useState} from 'react'

export default function PromptCard({data}) {
  const [copied, setCopied] = useState(false)
  const promptText = useMemo(()=>{
    if (!data) return ''
    if (data.error && !data.result) return String(data.error)
    // Get the plain text prompt - it's always in raw or result.raw
    if (typeof data.raw === 'string') return data.raw
    if (data.result?.raw) return data.result.raw
    // Fallback: if result is a string, use it directly
    if (typeof data.result === 'string') return data.result
    // Last resort: stringify if it's an object
    return String(data.result || '')
  }, [data])

  if (!data) {
    return (
      <div className="rounded-2xl border border-white/10 p-6 text-sm text-slate-400">
        Output pane is empty. Generate a prompt to see the complete AI prompt here.
      </div>
    )
  }

  if (data.error && !data.result) {
    return (
      <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-100">
        {String(data.error)}
      </div>
    )
  }

  async function handleCopy(){
    try {
      await navigator.clipboard.writeText(promptText)
      setCopied(true)
      setTimeout(()=>setCopied(false),1500)
    } catch(e){}
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-indigo-200/80">Complete AI Prompt</p>
          {(data.source || data.mode) && (
            <p className="text-xs text-slate-400 mt-1">
              {data.source ? `Source · ${data.source}` : null}
              {data.source && data.mode ? ' · ' : ''}
              {data.mode ? `Mode · ${data.mode}` : null}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-full text-xs font-semibold border border-white/10 hover:border-white/40 transition bg-indigo-500/20 hover:bg-indigo-500/30"
          >
            {copied ? '✓ Copied!' : 'Copy Prompt'}
          </button>
          <a
            className="px-4 py-2 rounded-full text-xs font-semibold border border-white/10 hover:border-white/40 transition"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(promptText)}`}
            download="prompt.txt"
          >
            Export .txt
          </a>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/5 px-6 py-5 text-sm whitespace-pre-wrap leading-relaxed font-mono text-slate-100">
        {promptText}
      </div>
    </div>
  )
}
