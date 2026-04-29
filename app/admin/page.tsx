'use client'

import { useState, useEffect, useCallback } from 'react'

type PortfolioData = any

const SECTIONS = ['Hero','Stats','Marquee','About','Skills','Projects','Experience','Contact','Footer']

export default function AdminPage() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [active, setActive] = useState('Hero')
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')

  useEffect(() => {
    fetch('/api/portfolio').then(r => r.json()).then(setData)
  }, [])

  const save = useCallback(async () => {
    setStatus('saving')
    try {
      const res = await fetch('/api/portfolio', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      setStatus(res.ok ? 'saved' : 'error')
      setTimeout(() => setStatus('idle'), 2500)
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 2500) }
  }, [data])

  const set = (path: string[], value: any) => {
    setData((prev: any) => {
      const next = structuredClone(prev)
      let cur = next
      for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]]
      cur[path[path.length - 1]] = value
      return next
    })
  }

  if (!data) return <div style={styles.loading}>Loading…</div>

  return (
    <div style={styles.shell}>
      <style>{adminCSS}</style>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.adminBadge}>ADMIN</span>
          <span style={styles.headerTitle}>Portfolio Editor</span>
        </div>
        <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
          <a href="/" target="_blank" style={styles.viewLink}>View Site ↗</a>
          <button onClick={save} style={{ ...styles.saveBtn, ...(status==='saving' ? styles.saveBtnSaving : status==='saved' ? styles.saveBtnSaved : status==='error' ? styles.saveBtnError : {}) }}>
            {status==='saving' ? 'Saving…' : status==='saved' ? '✓ Saved!' : status==='error' ? '✗ Error' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div style={styles.body}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setActive(s)} className={`admin-nav-btn${active===s?' active':''}`}>{s}</button>
          ))}
        </aside>

        {/* Main */}
        <main style={styles.main}>
          {active==='Hero' && <HeroPanel data={data} set={set} />}
          {active==='Stats' && <StatsPanel data={data} setData={setData} />}
          {active==='Marquee' && <MarqueePanel data={data} setData={setData} />}
          {active==='About' && <AboutPanel data={data} set={set} />}
          {active==='Skills' && <SkillsPanel data={data} setData={setData} />}
          {active==='Projects' && <ProjectsPanel data={data} setData={setData} />}
          {active==='Experience' && <ExpPanel data={data} setData={setData} />}
          {active==='Contact' && <ContactPanel data={data} set={set} setData={setData} />}
          {active==='Footer' && <FooterPanel data={data} set={set} />}
        </main>
      </div>
    </div>
  )
}

/* ── Field helpers ─────────────────────────────────────────── */
const Field = ({ label, value, onChange, multiline=false, hint='' }: any) => (
  <div className="a-field">
    <label className="a-label">{label}{hint && <span className="a-hint">{hint}</span>}</label>
    {multiline
      ? <textarea className="a-input a-textarea" value={value} onChange={e => onChange(e.target.value)} rows={4} />
      : <input className="a-input" value={value} onChange={e => onChange(e.target.value)} />}
  </div>
)

const SectionTitle = ({ t }: { t: string }) => <h2 className="a-section-title">{t}</h2>

/* ── Section Panels ────────────────────────────────────────── */
function HeroPanel({ data, set }: any) {
  const h = data.hero
  return (
    <div>
      <SectionTitle t="Hero Section" />
      <Field label="Nav Logo" value={data.nav.logo} onChange={(v:string)=>set(['nav','logo'],v)} hint="HTML allowed e.g. &lt;Name /&gt;" />
      <div className="a-divider" />
      <Field label="Label (above name)" value={h.label} onChange={(v:string)=>set(['hero','label'],v)} />
      <Field label="Name" value={h.name} onChange={(v:string)=>set(['hero','name'],v)} />
      <Field label="Tagline (glitch line)" value={h.tagline} onChange={(v:string)=>set(['hero','tagline'],v)} />
      <Field label="Subtitle (gradient line)" value={h.subtitle} onChange={(v:string)=>set(['hero','subtitle'],v)} />
      <Field label="Bio text" value={h.bio} onChange={(v:string)=>set(['hero','bio'],v)} multiline />
      <Field label="Bio highlight 1" value={h.bioHighlight1} onChange={(v:string)=>set(['hero','bioHighlight1'],v)} hint="Shown in green" />
      <Field label="Bio highlight 2" value={h.bioHighlight2} onChange={(v:string)=>set(['hero','bioHighlight2'],v)} hint="Shown in green" />
      <Field label="Terminal command" value={h.terminalCmd} onChange={(v:string)=>set(['hero','terminalCmd'],v)} />
      <Field label="Primary CTA text" value={h.ctaPrimary} onChange={(v:string)=>set(['hero','ctaPrimary'],v)} />
      <Field label="Secondary CTA text" value={h.ctaSecondary} onChange={(v:string)=>set(['hero','ctaSecondary'],v)} />
    </div>
  )
}

function StatsPanel({ data, setData }: any) {
  const stats = data.stats
  const update = (i: number, key: string, val: any) => setData((p:any) => { const n=structuredClone(p); n.stats[i][key]=val; return n })
  const add = () => setData((p:any) => { const n=structuredClone(p); n.stats.push({ display:'0', label:'New stat', animate:false }); return n })
  const remove = (i:number) => setData((p:any) => { const n=structuredClone(p); n.stats.splice(i,1); return n })
  return (
    <div>
      <SectionTitle t="Stats Strip" />
      {stats.map((s:any, i:number) => (
        <div key={i} className="a-card">
          <div className="a-card-row">
            <Field label="Display text" value={s.display} onChange={(v:string)=>update(i,'display',v)} />
            <Field label="Label" value={s.label} onChange={(v:string)=>update(i,'label',v)} />
          </div>
          <div className="a-card-row" style={{ alignItems:'center' }}>
            <label className="a-toggle"><input type="checkbox" checked={!!s.animate} onChange={e=>update(i,'animate',e.target.checked)} /> Count-up animation</label>
            {s.animate && <><Field label="Target number" value={s.target??''} onChange={(v:string)=>update(i,'target',Number(v))} /><Field label="Suffix" value={s.suffix??''} onChange={(v:string)=>update(i,'suffix',v)} /></>}
            <button onClick={()=>remove(i)} className="a-remove-btn">✕ Remove</button>
          </div>
        </div>
      ))}
      <button onClick={add} className="a-add-btn">+ Add Stat</button>
    </div>
  )
}

function MarqueePanel({ data, setData }: any) {
  const items: string[] = data.marquee
  const update = (i:number, v:string) => setData((p:any)=>{const n=structuredClone(p);n.marquee[i]=v;return n})
  const add = () => setData((p:any)=>{const n=structuredClone(p);n.marquee.push('New Tech');return n})
  const remove = (i:number) => setData((p:any)=>{const n=structuredClone(p);n.marquee.splice(i,1);return n})
  return (
    <div>
      <SectionTitle t="Marquee Tech Strip" />
      <div className="a-tag-grid">
        {items.map((item,i) => (
          <div key={i} className="a-tag-row">
            <input className="a-input" value={item} onChange={e=>update(i,e.target.value)} />
            <button onClick={()=>remove(i)} className="a-remove-btn">✕</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="a-add-btn">+ Add Technology</button>
    </div>
  )
}

function AboutPanel({ data, set }: any) {
  const a = data.about; const c = a.code
  return (
    <div>
      <SectionTitle t="About Section" />
      <Field label="Paragraph 1" value={a.para1} onChange={(v:string)=>set(['about','para1'],v)} multiline />
      <Field label="Paragraph 2" value={a.para2} onChange={(v:string)=>set(['about','para2'],v)} multiline />
      <Field label="Paragraph 3" value={a.para3} onChange={(v:string)=>set(['about','para3'],v)} multiline />
      <div className="a-divider" />
      <p className="a-sub-title">Code Block</p>
      <div className="a-card-row">
        <Field label="Name" value={c.name} onChange={(v:string)=>set(['about','code','name'],v)} />
        <Field label="Role" value={c.role} onChange={(v:string)=>set(['about','code','role'],v)} />
      </div>
      <div className="a-card-row">
        <Field label="Experience" value={c.experience} onChange={(v:string)=>set(['about','code','experience'],v)} />
        <Field label="Location" value={c.location} onChange={(v:string)=>set(['about','code','location'],v)} />
      </div>
      <Field label="Frontend stack (comma-separated)" value={c.frontend.join(', ')} onChange={(v:string)=>set(['about','code','frontend'],v.split(',').map((s:string)=>s.trim()))} />
      <Field label="Backend stack (comma-separated)" value={c.backend.join(', ')} onChange={(v:string)=>set(['about','code','backend'],v.split(',').map((s:string)=>s.trim()))} />
      <Field label="Database stack (comma-separated)" value={c.db.join(', ')} onChange={(v:string)=>set(['about','code','db'],v.split(',').map((s:string)=>s.trim()))} />
    </div>
  )
}

function SkillsPanel({ data, setData }: any) {
  const groups = data.skills
  const updateTitle = (i:number, v:string) => setData((p:any)=>{const n=structuredClone(p);n.skills[i].title=v;return n})
  const updateItems = (i:number, v:string) => setData((p:any)=>{const n=structuredClone(p);n.skills[i].items=v.split(',').map((s:string)=>s.trim()).filter(Boolean);return n})
  const addGroup = () => setData((p:any)=>{const n=structuredClone(p);n.skills.push({title:'New Group',items:[]});return n})
  const removeGroup = (i:number) => setData((p:any)=>{const n=structuredClone(p);n.skills.splice(i,1);return n})
  return (
    <div>
      <SectionTitle t="Skills" />
      {groups.map((g:any, i:number) => (
        <div key={i} className="a-card">
          <div className="a-card-row">
            <Field label="Group title" value={g.title} onChange={(v:string)=>updateTitle(i,v)} />
            <button onClick={()=>removeGroup(i)} className="a-remove-btn" style={{marginTop:'1.8rem'}}>✕ Remove</button>
          </div>
          <Field label="Skills (comma-separated)" value={g.items.join(', ')} onChange={(v:string)=>updateItems(i,v)} />
        </div>
      ))}
      <button onClick={addGroup} className="a-add-btn">+ Add Group</button>
    </div>
  )
}

function ProjectsPanel({ data, setData }: any) {
  const projects = data.projects
  const update = (i:number, key:string, val:any) => setData((p:any)=>{const n=structuredClone(p);n.projects[i][key]=val;return n})
  const updateTags = (i:number, val:string) => {
    const tags = val.split(',').map(s=>s.trim()).filter(Boolean).map(s=>{
      const lower = s.toLowerCase()
      const type = lower.includes('full')? 'full' : lower.includes('back')||lower.includes('node')||lower.includes('express')||lower.includes('api')? 'be' : 'fe'
      return { label:s, type }
    })
    update(i,'tags',tags)
  }
  const add = () => setData((p:any)=>{const n=structuredClone(p);n.projects.push({id:Date.now(),title:'New Project',description:'Description here.',tags:[],link:'#',featured:false,visual:'dashboard'});return n})
  const remove = (i:number) => setData((p:any)=>{const n=structuredClone(p);n.projects.splice(i,1);return n})
  return (
    <div>
      <SectionTitle t="Projects" />
      {projects.map((p:any, i:number) => (
        <div key={p.id} className="a-card">
          <div className="a-card-row">
            <Field label="Title" value={p.title} onChange={(v:string)=>update(i,'title',v)} />
            <div style={{display:'flex',gap:'1rem',alignItems:'center',marginTop:'1.8rem'}}>
              <label className="a-toggle"><input type="checkbox" checked={p.featured} onChange={e=>update(i,'featured',e.target.checked)} /> Featured</label>
              <button onClick={()=>remove(i)} className="a-remove-btn">✕</button>
            </div>
          </div>
          <Field label="Description" value={p.description} onChange={(v:string)=>update(i,'description',v)} multiline />
          <div className="a-card-row">
            <Field label="Link (URL)" value={p.link} onChange={(v:string)=>update(i,'link',v)} />
            <div className="a-field">
              <label className="a-label">Visual style</label>
              <select className="a-input" value={p.visual} onChange={e=>update(i,'visual',e.target.value)}>
                <option value="featured">Featured (App UI)</option>
                <option value="dashboard">Dashboard (Circles)</option>
                <option value="terminal">Terminal</option>
              </select>
            </div>
          </div>
          <Field label="Tags (comma-separated)" value={p.tags.map((t:any)=>t.label).join(', ')} onChange={(v:string)=>updateTags(i,v)} hint="Frontend/Backend keywords auto-color" />
        </div>
      ))}
      <button onClick={add} className="a-add-btn">+ Add Project</button>
    </div>
  )
}

function ExpPanel({ data, setData }: any) {
  const items = data.experience
  const update = (i:number, key:string, val:string) => setData((p:any)=>{const n=structuredClone(p);n.experience[i][key]=val;return n})
  const add = () => setData((p:any)=>{const n=structuredClone(p);n.experience.push({date:'Year – Year',role:'Role Title',company:'Company · Location',desc:'Description.'});return n})
  const remove = (i:number) => setData((p:any)=>{const n=structuredClone(p);n.experience.splice(i,1);return n})
  return (
    <div>
      <SectionTitle t="Experience" />
      {items.map((item:any, i:number) => (
        <div key={i} className="a-card">
          <div className="a-card-row">
            <Field label="Date range" value={item.date} onChange={(v:string)=>update(i,'date',v)} />
            <button onClick={()=>remove(i)} className="a-remove-btn" style={{marginTop:'1.8rem'}}>✕ Remove</button>
          </div>
          <div className="a-card-row">
            <Field label="Role / Degree" value={item.role} onChange={(v:string)=>update(i,'role',v)} />
            <Field label="Company / University" value={item.company} onChange={(v:string)=>update(i,'company',v)} />
          </div>
          <Field label="Description" value={item.desc} onChange={(v:string)=>update(i,'desc',v)} multiline />
        </div>
      ))}
      <button onClick={add} className="a-add-btn">+ Add Entry</button>
    </div>
  )
}

function ContactPanel({ data, set, setData }: any) {
  const { contact } = data
  const updateSocial = (i:number, key:string, val:string) => setData((p:any)=>{const n=structuredClone(p);n.contact.social[i][key]=val;return n})
  const addSocial = () => setData((p:any)=>{const n=structuredClone(p);n.contact.social.push({label:'Platform',short:'PT',href:'#'});return n})
  const removeSocial = (i:number) => setData((p:any)=>{const n=structuredClone(p);n.contact.social.splice(i,1);return n})
  return (
    <div>
      <SectionTitle t="Contact" />
      <Field label="Email address" value={contact.email} onChange={(v:string)=>set(['contact','email'],v)} />
      <div className="a-divider" />
      <p className="a-sub-title">Social Links</p>
      {contact.social.map((s:any, i:number) => (
        <div key={i} className="a-card">
          <div className="a-card-row">
            <Field label="Platform name" value={s.label} onChange={(v:string)=>updateSocial(i,'label',v)} />
            <Field label="Short (2 letters)" value={s.short} onChange={(v:string)=>updateSocial(i,'short',v)} />
            <Field label="URL" value={s.href} onChange={(v:string)=>updateSocial(i,'href',v)} />
            <button onClick={()=>removeSocial(i)} className="a-remove-btn" style={{marginTop:'1.8rem'}}>✕</button>
          </div>
        </div>
      ))}
      <button onClick={addSocial} className="a-add-btn">+ Add Social Link</button>
    </div>
  )
}

function FooterPanel({ data, set }: any) {
  return (
    <div>
      <SectionTitle t="Footer" />
      <Field label="Your name" value={data.footer.name} onChange={(v:string)=>set(['footer','name'],v)} />
      <Field label="Year" value={data.footer.year} onChange={(v:string)=>set(['footer','year'],v)} />
    </div>
  )
}

/* ── Styles ─────────────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  shell: { minHeight:'100vh', background:'#080810', color:'#e8e6ff', fontFamily:"'Space Mono',monospace", display:'flex', flexDirection:'column' },
  loading: { display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#080810', color:'#6b6a88', fontFamily:'monospace', fontSize:'0.85rem' },
  header: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 2rem', borderBottom:'1px solid #1e1e35', background:'#0f0f1a', position:'sticky', top:0, zIndex:50 },
  headerLeft: { display:'flex', alignItems:'center', gap:'1rem' },
  adminBadge: { background:'#7c6fff', color:'#fff', fontSize:'0.6rem', letterSpacing:'0.12em', padding:'0.25rem 0.6rem', borderRadius:'4px', fontWeight:700 },
  headerTitle: { fontSize:'0.9rem', color:'#e8e6ff', fontWeight:700 },
  viewLink: { color:'#6b6a88', fontSize:'0.75rem', textDecoration:'none', letterSpacing:'0.05em', transition:'color 0.2s' },
  saveBtn: { background:'#7c6fff', color:'#fff', border:'none', padding:'0.6rem 1.5rem', borderRadius:'6px', fontSize:'0.8rem', fontFamily:"'Space Mono',monospace", cursor:'pointer', transition:'all 0.25s', letterSpacing:'0.03em' },
  saveBtnSaving: { opacity:0.7, cursor:'not-allowed' },
  saveBtnSaved: { background:'#43e8b0', color:'#080810' },
  saveBtnError: { background:'#ff6b6b' },
  body: { display:'flex', flex:1 },
  sidebar: { width:'180px', flexShrink:0, borderRight:'1px solid #1e1e35', padding:'1.5rem 0', background:'#0f0f1a' },
  main: { flex:1, padding:'2.5rem', overflowY:'auto', maxHeight:'calc(100vh - 60px)' },
}

const adminCSS = `
.admin-nav-btn { display:block; width:100%; text-align:left; padding:0.65rem 1.5rem; background:none; border:none; color:#6b6a88; font-family:'Space Mono',monospace; font-size:0.75rem; cursor:pointer; letter-spacing:0.05em; transition:all 0.2s; }
.admin-nav-btn:hover { color:#e8e6ff; background:rgba(124,111,255,0.06); }
.admin-nav-btn.active { color:#7c6fff; background:rgba(124,111,255,0.1); border-right:2px solid #7c6fff; }
.a-section-title { font-family:'Syne',sans-serif; font-size:1.5rem; font-weight:800; color:#e8e6ff; margin-bottom:2rem; letter-spacing:-0.02em; }
.a-sub-title { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.12em; color:#43e8b0; margin:0 0 1rem; }
.a-field { display:flex; flex-direction:column; gap:0.4rem; flex:1; min-width:200px; margin-bottom:1.25rem; }
.a-label { font-size:0.7rem; letter-spacing:0.08em; text-transform:uppercase; color:#6b6a88; }
.a-hint { color:#4a4a6a; margin-left:0.5rem; text-transform:none; letter-spacing:0; }
.a-input { background:#13131f; border:1px solid #1e1e35; color:#e8e6ff; padding:0.6rem 0.875rem; border-radius:6px; font-family:'Space Mono',monospace; font-size:0.8rem; outline:none; transition:border-color 0.2s; width:100%; }
.a-input:focus { border-color:#7c6fff; }
.a-textarea { resize:vertical; min-height:80px; }
.a-card { background:#0f0f1a; border:1px solid #1e1e35; border-radius:10px; padding:1.25rem; margin-bottom:1rem; }
.a-card-row { display:flex; gap:1rem; flex-wrap:wrap; align-items:flex-start; }
.a-divider { border:none; border-top:1px solid #1e1e35; margin:1.5rem 0; }
.a-toggle { display:flex; align-items:center; gap:0.5rem; font-size:0.75rem; color:#6b6a88; cursor:pointer; white-space:nowrap; }
.a-toggle input { accent-color:#7c6fff; }
.a-add-btn { background:transparent; border:1px dashed #1e1e35; color:#7c6fff; padding:0.6rem 1.5rem; border-radius:6px; font-family:'Space Mono',monospace; font-size:0.75rem; cursor:pointer; transition:all 0.2s; margin-top:0.5rem; }
.a-add-btn:hover { border-color:#7c6fff; background:rgba(124,111,255,0.06); }
.a-remove-btn { background:transparent; border:1px solid #1e1e35; color:#ff6b6b; padding:0.4rem 0.75rem; border-radius:5px; font-family:'Space Mono',monospace; font-size:0.72rem; cursor:pointer; white-space:nowrap; transition:all 0.2s; }
.a-remove-btn:hover { background:rgba(255,107,107,0.1); border-color:#ff6b6b; }
.a-tag-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:0.5rem; margin-bottom:1rem; }
.a-tag-row { display:flex; gap:0.4rem; }
.a-tag-row .a-input { flex:1; }
`
