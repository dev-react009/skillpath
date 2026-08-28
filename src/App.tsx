import { useMemo, useState } from 'react'
import './App.css'

type Track = 'DevOps' | 'DSA' | 'Blockchain' | 'LLM / AI'

type Module = { name: string; level: string; duration: string; done: boolean }

const curriculum: Record<Track, Module[]> = {
  DevOps: [
    { name: 'Linux & networking foundations', level: 'Foundation', duration: '2 weeks', done: true },
    { name: 'Containers with Docker', level: 'Builder', duration: '2 weeks', done: true },
    { name: 'Kubernetes deployments', level: 'Operator', duration: '3 weeks', done: false },
    { name: 'Infrastructure as code', level: 'Production', duration: '3 weeks', done: false },
  ],
  DSA: [
    { name: 'Arrays, strings & complexity', level: 'Foundation', duration: '2 weeks', done: true },
    { name: 'Trees & graph traversal', level: 'Builder', duration: '3 weeks', done: false },
    { name: 'Dynamic programming', level: 'Advanced', duration: '3 weeks', done: false },
    { name: 'System interview patterns', level: 'Production', duration: '2 weeks', done: false },
  ],
  Blockchain: [
    { name: 'Cryptography & distributed systems', level: 'Foundation', duration: '2 weeks', done: false },
    { name: 'Solidity smart contracts', level: 'Builder', duration: '3 weeks', done: false },
    { name: 'Protocol security', level: 'Advanced', duration: '3 weeks', done: false },
    { name: 'Indexing & production dApps', level: 'Production', duration: '3 weeks', done: false },
  ],
  'LLM / AI': [
    { name: 'Python, embeddings & transformers', level: 'Foundation', duration: '2 weeks', done: true },
    { name: 'RAG systems', level: 'Builder', duration: '3 weeks', done: true },
    { name: 'Agent evaluation', level: 'Advanced', duration: '2 weeks', done: false },
    { name: 'LLM production operations', level: 'Production', duration: '3 weeks', done: false },
  ],
}

const trackNotes: Record<Track, string> = {
  DevOps: 'Operate reliable systems from a terminal to production.',
  DSA: 'Build problem-solving fluency for technical interviews and systems work.',
  Blockchain: 'Understand decentralized systems, protocols, and smart contract risk.',
  'LLM / AI': 'Engineer evaluation-aware AI features that can operate in production.',
}

function App() {
  const [track, setTrack] = useState<Track>('LLM / AI')
  const [modules, setModules] = useState(curriculum)
  const [week, setWeek] = useState(5)
  const activeModules = modules[track]
  const completed = activeModules.filter((item) => item.done).length
  const completion = Math.round((completed / activeModules.length) * 100)
  const overall = useMemo(() => Object.values(modules).flat().filter((item) => item.done).length, [modules])

  const toggleModule = (moduleIndex: number) => {
    setModules((current) => ({
      ...current,
      [track]: current[track].map((module, index) => index === moduleIndex ? { ...module, done: !module.done } : module),
    }))
  }

  return (
    <main className="path-app">
      <header className="path-header">
        <a href="#dashboard" className="path-brand"><span>SP</span> SkillPath</a>
        <nav aria-label="Primary"><a className="active" href="#dashboard">My path</a><a href="#library">Library</a><a href="#review">Reviews</a></nav>
        <button type="button" className="week-control" onClick={() => setWeek((value) => value + 1)}>Week {week} <span>+</span></button>
      </header>

      <section className="path-shell" id="dashboard">
        <header className="welcome">
          <div><p>CAREER BUILDING SYSTEM</p><h1>Build senior-level depth, one focused sprint at a time.</h1><span>12-week path · {overall} modules completed · last session today</span></div>
          <aside className="streak"><strong>06</strong><span>day learning streak</span></aside>
        </header>

        <section className="track-tabs" aria-label="Learning tracks">
          {(Object.keys(curriculum) as Track[]).map((item) => (
            <button key={item} type="button" className={track === item ? 'active' : ''} onClick={() => setTrack(item)}>
              <strong>{item}</strong><span>{modules[item].filter((module) => module.done).length}/{modules[item].length} complete</span>
            </button>
          ))}
        </section>

        <section className="learning-grid">
          <article className="path-card main-path">
            <div className="card-top"><div><p className="eyebrow">ACTIVE TRACK</p><h2>{track}</h2><span>{trackNotes[track]}</span></div><div className="completion"><strong>{completion}%</strong><span>complete</span></div></div>
            <div className="progress-line"><span style={{ width: `${completion}%` }} /></div>
            <ol className="module-list">
              {activeModules.map((module, index) => (
                <li key={module.name} className={module.done ? 'done' : ''}>
                  <button type="button" aria-pressed={module.done} onClick={() => toggleModule(index)}>{module.done ? '✓' : String(index + 1).padStart(2, '0')}</button>
                  <div><strong>{module.name}</strong><span>{module.level} · {module.duration}</span></div>
                  <small>{module.done ? 'Complete' : index === completed ? 'Up next' : 'Locked'}</small>
                </li>
              ))}
            </ol>
          </article>

          <aside className="right-column">
            <article className="path-card focus-card"><p className="eyebrow">TODAY'S FOCUS</p><h2>Evaluate an agentic RAG flow</h2><p>Run 10 adversarial questions, identify a failure pattern, and document the fix.</p><div><span>75 min</span><span>LLM / AI</span></div><button type="button">Start focus session</button></article>
            <article className="path-card competency-card"><p className="eyebrow">SKILL RADAR</p><div className="radar-list"><span><strong>DevOps</strong><i style={{ width: '42%' }} /></span><span><strong>DSA</strong><i style={{ width: '28%' }} /></span><span><strong>Blockchain</strong><i style={{ width: '12%' }} /></span><span><strong>LLM / AI</strong><i style={{ width: '56%' }} /></span></div></article>
          </aside>
        </section>

        <section className="review-strip" id="review"><div><p className="eyebrow">NEXT REVIEW</p><strong>Friday · Architecture synthesis</strong></div><p>Connect this week's LLM evaluation work to deployment, observability, and cost control.</p><button type="button">Open review</button></section>
      </section>
    </main>
  )
}

export default App
