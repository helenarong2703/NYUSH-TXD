import { useState } from "react";
import glitches from "./data/glitches.json";
import protocolsData from "./data/protocols.json";
import { patternMeta, typeMeta, hardnessLabels, dimLabels, nyu, theme } from "./data/taxonomy";
import nyushLogo from "./assets/NYU_Shanghai_logo_square.png";

const { bg, card, border, borderLight, textPrimary: tp, textSecondary: ts, textTertiary: tt, subtle } = theme;

// ── Shared components ──

function NYULogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="4" fill={nyu} />
      <path d="M20 6c-.5 0-1 .3-1.2.7L17 10l-1 6c-.1.5.1 1 .5 1.3l3 2.2c.3.2.7.2 1 0l3-2.2c.4-.3.6-.8.5-1.3l-1-6-1.8-3.3c-.2-.4-.7-.7-1.2-.7z" fill="#fff" opacity=".9"/>
      <path d="M16.5 20v10.5c0 .8.5 1.5 1.2 1.8L20 33.5l2.3-1.2c.7-.3 1.2-1 1.2-1.8V20" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M14 22h12M14 25h12" stroke="#fff" strokeWidth=".7" opacity=".4"/>
    </svg>
  );
}

function TrustDelta({ delta }) {
  return <span style={{ color: delta > 0 ? "#059669" : "#dc2626", fontWeight: 700, fontSize: 13, fontFamily: "monospace" }}>{delta > 0 ? "+" : ""}{delta}</span>;
}

function Bdg({ bgC, color, children, small }) {
  return <span style={{ background: bgC, color, fontSize: small ? 10 : 11, fontWeight: 600, padding: small ? "2px 8px" : "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{children}</span>;
}

function PBdg({ pattern, small }) {
  const m = patternMeta[pattern];
  return m ? <Bdg bgC={m.color + "12"} color={m.color} small={small}>{m.code} {m.label}</Bdg> : null;
}

function TBdg({ type, small }) {
  const m = typeMeta[type];
  return <Bdg bgC={m.color + "12"} color={m.color} small={small}>{m.icon} {m.label}</Bdg>;
}

// ── Nav ──

function Nav({ page, setPage }) {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,250,250,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${border}`, padding: "0 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 90 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={nyushLogo} alt="NYU Shanghai" style={{ height: 56, borderRadius: 4 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: ts, fontSize: 15, fontWeight: 400 }}>IMBX-SHU 100:</span>
            <span style={{ color: tp, fontWeight: 700, fontSize: 15 }}>Trust Experience Design</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[{ k: "home", l: <svg width="16" height="16" viewBox="0 0 16 16" fill={nyu}><path d="M8 1L1 7h2v7h4v-4h2v4h4V7h2L8 1z"/></svg> }, { k: "glitches", l: "Glitches" }, { k: "taxonomy", l: "Taxonomy" }, { k: "watch", l: "Protocol Watch" }, { k: "projects", l: "Projects" }, { k: "about", l: "About" }].map(i => (
            <button key={i.k} onClick={() => setPage(i.k)} style={{ background: page === i.k ? "#eee" : "transparent", color: page === i.k ? tp : ts, border: "none", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 500 }}>{i.l}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Home ──

function Home({ setPage }) {
  const top = [...glitches].sort((a, b) => a.delta - b.delta).slice(0, 4);
  return (
    <div>
      <section style={{ padding: "120px 24px 30px", textAlign: "center" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h1 style={{ color: tp, fontSize: 56, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 12px" }}>
            <span style={{ color: nyu }}>Trust Experience Design</span>
          </h1>
          <h2 style={{ color: tp, fontSize: 32, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.02em", margin: "0 0 24px" }}>Protocolizing Trust for Autonomous Futures</h2>
          <p style={{ color: ts, fontSize: 18, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>A living field guide to trust experience glitches, protocol observations, and design interventions for trustworthy human-AI relations in the agentic era. From the TXD course at NYU Shanghai Interactive Media and Business.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => setPage("glitches")} style={{ background: nyu, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 10, cursor: "pointer", fontSize: 16, fontWeight: 600 }}>Browse {glitches.length} Glitches</button>
            <button onClick={() => setPage("taxonomy")} style={{ background: "transparent", color: tp, border: `1px solid ${border}`, padding: "14px 28px", borderRadius: 10, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>Taxonomy</button>
            <button onClick={() => setPage("about")} style={{ background: "transparent", color: tp, border: `1px solid ${border}`, padding: "14px 28px", borderRadius: 10, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>About</button>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 20px" }}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {Object.entries(typeMeta).map(([k, v]) => { const c = glitches.filter(g => g.type === k).length; return (
            <div key={k} style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{v.icon}</span><span style={{ color: tp, fontSize: 13, fontWeight: 700 }}>{c}</span><span style={{ color: ts, fontSize: 12 }}>{v.label}</span>
            </div>
          ); })}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>📊</span><span style={{ color: tp, fontSize: 13, fontWeight: 700 }}>{Object.keys(patternMeta).length}</span><span style={{ color: ts, fontSize: 12 }}>patterns</span>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 24px 50px" }}>
        <h2 style={{ color: tp, fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Highest-severity glitches</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {top.map(g => (
            <div key={g.id} onClick={() => setPage("glitches")} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#ccc"} onMouseLeave={e => e.currentTarget.style.borderColor = border}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}><TrustDelta delta={g.delta} /><TBdg type={g.type} small /><PBdg pattern={g.pattern} small /></div>
              <h3 style={{ color: tp, fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>{g.title}</h3>
              <p style={{ color: tt, fontSize: 11 }}>{g.system} · {g.source} · {g.date}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[{ k: "glitches", icon: "⚡", title: "Glitches", n: glitches.length + " documented", color: "#dc2626" }, { k: "watch", icon: "👁", title: "Protocol Watch", n: "Observations", color: nyu }, { k: "projects", icon: "🔧", title: "Design Projects", n: "Coming soon", color: "#ea580c" }].map(s => (
            <div key={s.k} onClick={() => setPage(s.k)} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 24, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
              <h3 style={{ color: tp, fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{s.title}</h3>
              <span style={{ color: s.color, fontSize: 12, fontWeight: 600 }}>{s.n} →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Glitch Detail ──

function GlitchDetail({ g, onBack }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 24px 80px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: ts, cursor: "pointer", fontSize: 13, padding: 0, marginBottom: 18 }}>← Back</button>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}><TrustDelta delta={g.delta} /><TBdg type={g.type} /><PBdg pattern={g.pattern} /><Bdg bgC={subtle} color={ts}>{hardnessLabels[g.hardness]}</Bdg><Bdg bgC={subtle} color={ts}>{dimLabels[g.dimension]}</Bdg></div>
      <h1 style={{ color: tp, fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 10 }}>{g.title}</h1>
      <p style={{ color: tt, fontSize: 13, marginBottom: 24 }}>{g.system} · {g.source} · {g.date}</p>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 18, textAlign: "center" }}><p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>Before</p><p style={{ color: tp, fontSize: 26, fontWeight: 800 }}>{g.trustBefore}<span style={{ color: "#ccc", fontSize: 13 }}>/10</span></p></div>
        <div style={{ flex: 0.4, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: g.delta > 0 ? "#059669" : "#dc2626", fontSize: 22, fontWeight: 800 }}>→ {g.delta > 0 ? "+" : ""}{g.delta}</span></div>
        <div style={{ flex: 1, background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 18, textAlign: "center" }}><p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>After</p><p style={{ color: tp, fontSize: 26, fontWeight: 800 }}>{g.trustAfter}<span style={{ color: "#ccc", fontSize: 13 }}>/10</span></p></div>
      </div>
      {g.quote && <div style={{ borderLeft: `3px solid ${nyu}`, paddingLeft: 18, marginBottom: 24 }}><p style={{ color: "#444", fontSize: 14, fontStyle: "italic", lineHeight: 1.6 }}>"{g.quote}"</p></div>}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 22, marginBottom: 24 }}>
        <h3 style={{ color: tp, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>What Happened</h3>
        <p style={{ color: "#444", fontSize: 13, lineHeight: 1.7 }}>{g.summary}</p>
      </div>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 22 }}>
        <h3 style={{ color: tp, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Analysis Framework</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {["What was the system signaling?", "What did users expect?", "Where did misalignment occur?", "What trust issue does this reveal?", "What protocol(s) govern this system?", "What intervention might redesign this glitch?"].map((q, i) => (
            <div key={i} style={{ background: subtle, borderRadius: 8, padding: 14 }}><p style={{ color: nyu, fontSize: 11, fontWeight: 600, marginBottom: 2 }}>{q}</p><p style={{ color: tt, fontSize: 11, fontStyle: "italic" }}>Full analysis →</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Glitches ──

function Glitches() {
  const [typeF, setTypeF] = useState("all");
  const [patternF, setPatternF] = useState("all");
  const [sourceF, setSourceF] = useState("all");
  const [sel, setSel] = useState(null);
  let f = glitches;
  if (typeF !== "all") f = f.filter(g => g.type === typeF);
  if (patternF !== "all") f = f.filter(g => g.pattern === patternF);
  if (sourceF !== "all") f = f.filter(g => g.source === sourceF);
  f = [...f].sort((a, b) => a.delta - b.delta);
  const sources = [...new Set(glitches.map(g => g.source))].sort();
  if (sel) return <GlitchDetail g={sel} onBack={() => setSel(null)} />;
  const btn = (active, color) => ({ background: active ? (color ? color + "10" : "#111") : card, color: active ? (color || tp) : ts, border: `1px solid ${active ? (color ? color + "33" : "#111") : border}`, padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: 600 });
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      <p style={{ color: "#dc2626", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Trust Experience Glitches</p>
      <h1 style={{ color: tp, fontSize: 30, fontWeight: 800, marginBottom: 4 }}>Glitch Archive</h1>
      <p style={{ color: ts, fontSize: 13, lineHeight: 1.5, marginBottom: 20, maxWidth: 540 }}>Documented misalignments between what systems signal and what humans experience.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        <div><p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Entity Type</p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <button onClick={() => setTypeF("all")} style={btn(typeF === "all", null)}>All</button>
            {Object.entries(typeMeta).map(([k, v]) => <button key={k} onClick={() => setTypeF(k)} style={btn(typeF === k, v.color)}>{v.icon} {v.label} ({glitches.filter(g => g.type === k).length})</button>)}
          </div>
        </div>
        <div><p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Behavioral Pattern</p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <button onClick={() => setPatternF("all")} style={btn(patternF === "all", null)}>All</button>
            {Object.entries(patternMeta).map(([k, v]) => { const c = glitches.filter(g => g.pattern === k).length; return c > 0 ? <button key={k} onClick={() => setPatternF(k)} style={btn(patternF === k, v.color)}>{v.code} {v.label} ({c})</button> : null; })}
          </div>
        </div>
        <div><p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Contributor</p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <button onClick={() => setSourceF("all")} style={btn(sourceF === "all", null)}>All</button>
            {sources.map(s => <button key={s} onClick={() => setSourceF(s)} style={btn(sourceF === s, nyu)}>{s}</button>)}
          </div>
        </div>
      </div>
      <p style={{ color: tt, fontSize: 11, marginBottom: 12 }}>{f.length} glitch{f.length !== 1 ? "es" : ""} · sorted by severity</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {f.map(g => (
          <div key={g.id} onClick={() => setSel(g)} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 18, cursor: "pointer", display: "grid", gridTemplateColumns: "56px 1fr", gap: 16, transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#ccc"} onMouseLeave={e => e.currentTarget.style.borderColor = border}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><span style={{ color: g.delta > 0 ? "#059669" : "#dc2626", fontSize: 22, fontWeight: 800, fontFamily: "monospace" }}>{g.delta > 0 ? "+" : ""}{g.delta}</span><span style={{ color: tt, fontSize: 9 }}>trust Δ</span></div>
            <div>
              <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}><TBdg type={g.type} small /><PBdg pattern={g.pattern} small /><span style={{ color: tt, fontSize: 10 }}>{g.system}</span></div>
              <h3 style={{ color: tp, fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{g.title}</h3>
              <p style={{ color: ts, fontSize: 12, lineHeight: 1.5 }}>{g.summary.slice(0, 140)}...</p>
              <p style={{ color: tt, fontSize: 10, marginTop: 6 }}>{g.source} · {g.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Taxonomy ──

function Taxonomy() {
  const pc = {}, tc = {};
  glitches.forEach(g => { pc[g.pattern] = (pc[g.pattern] || 0) + 1; tc[g.type] = (tc[g.type] || 0) + 1; });
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      <p style={{ color: nyu, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Taxonomy</p>
      <h1 style={{ color: tp, fontSize: 30, fontWeight: 800, marginBottom: 4 }}>Two-Axis Classification</h1>
      <p style={{ color: ts, fontSize: 13, lineHeight: 1.5, marginBottom: 28, maxWidth: 580 }}>Glitches are classified by <strong style={{ color: tp }}>entity type</strong> and <strong style={{ color: tp }}>behavioral pattern</strong>. Dense cells show where tensions concentrate.</p>
      <h2 style={{ color: tp, fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Axis 1: Entity Type</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
        {Object.entries(typeMeta).map(([k, v]) => (
          <div key={k} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{v.icon}</div>
            <h3 style={{ color: v.color, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{v.label} Glitch</h3>
            {v.desc && <p style={{ color: ts, fontSize: 12, lineHeight: 1.5, marginBottom: 6 }}>{v.desc}</p>}
            <span style={{ color: tt, fontSize: 11 }}>{tc[k] || 0} documented</span>
          </div>
        ))}
      </div>
      <h2 style={{ color: tp, fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Axis 2: Behavioral Pattern</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 32 }}>
        {Object.entries(patternMeta).map(([k, v]) => (
          <div key={k} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: v.color + "10", color: v.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{v.code}</div>
            <div><h3 style={{ color: tp, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{v.label}</h3><p style={{ color: ts, fontSize: 11, lineHeight: 1.5, marginBottom: 6 }}>{v.desc}</p><span style={{ color: tt, fontSize: 10 }}>{pc[k] || 0} case{(pc[k] || 0) !== 1 ? "s" : ""}</span></div>
          </div>
        ))}
      </div>
      <h2 style={{ color: tp, fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Cross-Axis Matrix</h2>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 20, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead><tr><th style={{ color: tt, textAlign: "left", padding: "6px 10px", borderBottom: `1px solid ${border}` }}></th>
            {Object.entries(typeMeta).map(([k, v]) => <th key={k} style={{ color: v.color, textAlign: "center", padding: "6px 10px", borderBottom: `1px solid ${border}`, fontWeight: 700 }}>{v.icon} {v.label}</th>)}
            <th style={{ color: ts, textAlign: "center", padding: "6px 10px", borderBottom: `1px solid ${border}`, fontWeight: 700 }}>Total</th>
          </tr></thead>
          <tbody>
            {Object.entries(patternMeta).map(([pk, pv]) => { const row = Object.keys(typeMeta).map(tk => glitches.filter(g => g.type === tk && g.pattern === pk).length); const total = row.reduce((a, b) => a + b, 0); return total > 0 ? (
              <tr key={pk}><td style={{ color: pv.color, padding: "6px 10px", borderBottom: `1px solid ${borderLight}`, fontWeight: 600, whiteSpace: "nowrap" }}>{pv.code} {pv.label}</td>
                {row.map((c, i) => <td key={i} style={{ textAlign: "center", padding: "6px 10px", borderBottom: `1px solid ${borderLight}` }}>{c > 0 ? <span style={{ background: c >= 3 ? pv.color + "18" : subtle, color: c >= 3 ? pv.color : tp, fontWeight: 700, padding: "2px 10px", borderRadius: 6 }}>{c}</span> : <span style={{ color: "#ddd" }}>—</span>}</td>)}
                <td style={{ textAlign: "center", padding: "6px 10px", borderBottom: `1px solid ${borderLight}`, color: ts, fontWeight: 700 }}>{total}</td>
              </tr>) : null; })}
            <tr><td style={{ color: ts, padding: "6px 10px", fontWeight: 700 }}>Total</td>
              {Object.keys(typeMeta).map(tk => <td key={tk} style={{ textAlign: "center", padding: "6px 10px", color: ts, fontWeight: 700 }}>{glitches.filter(g => g.type === tk).length}</td>)}
              <td style={{ textAlign: "center", padding: "6px 10px", color: tp, fontWeight: 800 }}>{glitches.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Protocol Watch ──

function Watch() {
  const hasExamplesOnly = protocolsData.every(p => p.isExample);
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      <p style={{ color: nyu, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Protocol Watch</p>
      <h1 style={{ color: tp, fontSize: 30, fontWeight: 800, marginBottom: 4 }}>Seeing the invisible.</h1>
      <p style={{ color: ts, fontSize: 13, lineHeight: 1.5, marginBottom: 28, maxWidth: 540 }}>Bicorder-framework observations of protocols in the wild — where they hold and where they drift.</p>
      {hasExamplesOnly && <p style={{ color: tt, fontSize: 11, fontStyle: "italic", marginBottom: 20 }}>Note: These are example entries illustrating the framework format. Student submissions will replace these as Protocol Watch assignments are completed.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {protocolsData.map(p => (
          <div key={p.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div><h3 style={{ color: tp, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{p.title}</h3><p style={{ color: nyu, fontSize: 12 }}>📍 {p.location}</p></div>
              <Bdg bgC={subtle} color={ts}>{p.who}</Bdg>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[{ l: "Enforcement Signals", v: p.signals }, { l: "Who Benefits", v: p.benefits }, { l: "Who Skips", v: p.skips }].map((item, i) => (
                <div key={i} style={{ background: subtle, borderRadius: 8, padding: 12 }}><p style={{ color: tt, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{item.l}</p><p style={{ color: "#444", fontSize: 11, lineHeight: 1.4 }}>{item.v}</p></div>
              ))}
            </div>
            <div style={{ background: "#fffbeb", borderRadius: 8, padding: 12, borderLeft: "3px solid #f59e0b" }}>
              <p style={{ color: "#b45309", fontSize: 10, fontWeight: 700, marginBottom: 2 }}>⚠ DRIFT</p>
              <p style={{ color: "#78350f", fontSize: 11, lineHeight: 1.5 }}>{p.drift}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Projects ──

function Projects() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      <p style={{ color: "#ea580c", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>TXD Design Projects</p>
      <h1 style={{ color: tp, fontSize: 30, fontWeight: 800, marginBottom: 4 }}>Designing trust.</h1>
      <p style={{ color: ts, fontSize: 13, lineHeight: 1.5, marginBottom: 28, maxWidth: 540 }}>Student-designed trust protocols for near-future autonomous systems. Evidence, primitives, and rituals — prototyped and stress-tested.</p>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 40, textAlign: "center" }}>
        <p style={{ fontSize: 32, marginBottom: 12 }}>🔧</p>
        <p style={{ color: tp, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Projects coming soon</p>
        <p style={{ color: ts, fontSize: 13, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>Final project proposals are in development. This section will feature student prototypes of trust protocols for near-future autonomous systems, organized by intervention layer: trust evidence, trust primitives, and trust rituals.</p>
      </div>
    </div>
  );
}

// ── About ──

function About() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>
      <p style={{ color: nyu, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>About</p>
      <h1 style={{ color: tp, fontSize: 30, fontWeight: 800, marginBottom: 20 }}>Trust Experience Design</h1>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 32, marginBottom: 24 }}>
        <p style={{ color: "#333", fontSize: 15, lineHeight: 1.8 }}>
          Trust Experience Design (TXD) explores how trust can be intentionally designed in an era of autonomous AI agents and distributed intelligence. Bridging social theory, design research, and emerging technologies such as blockchains, cryptography, and decentralized identity systems, the course examines how trust operates across physical, mathematical, institutional, and social layers—from everyday rituals and governance mechanisms to cryptographic and algorithmic proofs. Through case studies, speculative scenarios, and hands-on prototyping, students learn to identify design gaps, create new trust protocols, and imagine human–AI systems where trust is both verifiable and felt.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 24 }}>
          <p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Faculty Instructor</p>
          <a href="https://shanghai.nyu.edu/academics/faculty/directory/helena-rong" target="_blank" rel="noopener noreferrer" style={{ color: nyu, fontSize: 15, fontWeight: 700, marginBottom: 4, display: "block", textDecoration: "none" }}>Helena Rong →</a>
          <p style={{ color: ts, fontSize: 13, lineHeight: 1.5 }}>Assistant Professor of Interactive Media and Business, NYU Shanghai</p>
        </div>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 24 }}>
          <p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Course Code</p>
          <p style={{ color: tp, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>IMB-SHUX 100</p>
          <p style={{ color: ts, fontSize: 13, lineHeight: 1.5 }}>Spring 2026 · NYU Shanghai</p>
        </div>
      </div>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 24, marginBottom: 24 }}>
        <p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Acknowledgments</p>
        <p style={{ color: ts, fontSize: 13, lineHeight: 1.6 }}>The development of this course was supported by the <strong style={{ color: tp }}>2025 Summer of Protocols Curriculum Development Program</strong>.</p>
      </div>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 24 }}>
        <p style={{ color: tt, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Related</p>
        <a href="https://tx.design" target="_blank" rel="noopener noreferrer" style={{ color: nyu, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>tx.design — TXD Manifesto →</a>
      </div>
    </div>
  );
}

// ── App ──

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "glitches" && <Glitches />}
      {page === "taxonomy" && <Taxonomy />}
      {page === "watch" && <Watch />}
      {page === "projects" && <Projects />}
      {page === "about" && <About />}
    </div>
  );
}