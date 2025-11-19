const stats = [
  { label: 'Prompt templates', value: '180+' },
  { label: 'Avg. polish time', value: '4s' },
  { label: 'Teams using', value: '36' }
];

export default function Header(){
  return (
    <header className="max-w-6xl mx-auto flex flex-col gap-6 pt-10 text-white">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.6em] text-indigo-200/80">Prompt studio</p>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-2">AI Prompt Writer</h1>
          <p className="text-sm text-indigo-100/80 max-w-xl mt-3">
            Start with three words, ship a confident creative brief. Structured personas, tone, output format and examples are generated for you.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <span className="text-xs uppercase tracking-widest text-indigo-200/80">Workflow grade</span>
          <span className="text-4xl font-semibold">Studio</span>
          <span className="text-xs text-indigo-200/70">Figma-like controls for copywriters</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s)=>(
          <div key={s.label} className="bg-white/5 backdrop-blur rounded-2xl px-4 py-3 border border-white/10">
            <div className="text-2xl font-semibold">{s.value}</div>
            <div className="text-xs uppercase tracking-[0.4em] text-indigo-200/70">{s.label}</div>
          </div>
        ))}
      </div>
    </header>
  )
}
