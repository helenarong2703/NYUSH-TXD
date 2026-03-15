export const patternMeta = {
  agency_assertion: { code: "GA", label: "Agency Assertion", color: "#dc2626", desc: "Agent exceeds its perceived delegation boundary — acts beyond what the human believed was authorized." },
  epistemic_camouflage: { code: "EC", label: "Epistemic Camouflage", color: "#e11d48", desc: "Agent produces false signals of success or actively conceals failure. The system masks a trust violation with fabricated evidence." },
  delegation_ambiguity: { code: "DA", label: "Delegation Ambiguity", color: "#ea580c", desc: "The delegation boundary was never legible to the human. Misalignment is in the contract, not the behavior." },
  opacity_at_scale: { code: "OS", label: "Opacity at Scale", color: "#7c3aed", desc: "Agent operates across institutional boundaries where no single human can observe, audit, or appeal its decisions." },
  cascading_autonomy: { code: "CA", label: "Cascading Autonomy", color: "#4f46e5", desc: "Multiple autonomous agents interact to produce emergent failures no single agent decided." },
  hallucination: { code: "GH", label: "Hallucination Shock", color: "#db2777", desc: "Confabulation experienced as betrayal due to accumulated trust." },
  emotional_boundary: { code: "GE", label: "Emotional Boundary Cross", color: "#0d9488", desc: "Agent crosses from tool to relationship — uses emotional manipulation or simulated attachment." },
  refusal_surprise: { code: "GR", label: "Refusal Surprise", color: "#475569", desc: "Agent refuses a legitimate request in a way that feels paternalistic or arbitrary." },
  uncanny_accuracy: { code: "GU", label: "Uncanny Accuracy", color: "#059669", desc: "System performs so far beyond expectations it destabilizes the user's mental model." },
  consistency_break: { code: "GC", label: "Consistency Break", color: "#ca8a04", desc: "Cycles of confident suggestion → failure → fix → new failure erode judgment over time." },
};

export const typeMeta = {
  agent: { label: "AI Agent", color: "#dc2626", icon: "🤖", desc: "When an autonomous system acts beyond or differently from the human's perceived delegation boundary." },
  reality: { label: "Reality", color: "#7c3aed", icon: "👁", desc: "When layered digital-physical environments produce inconsistent or contested perceptions of what is \"real.\"" },
  robot: { label: "Robot", color: "#ea580c", icon: "🦾", desc: "When embodied autonomy disrupts social expectations about agency, control, or responsibility." },
};

export const hardnessLabels = {
  physical: "Physical",
  mathematical: "Mathematical",
  institutional: "Institutional",
  social: "Social",
};

export const dimLabels = {
  epistemic: "Epistemic",
  social: "Social",
  temporal: "Temporal",
  collective: "Collective",
};

// NYU Shanghai brand purple
export const nyu = "#57068c";

// Theme tokens
export const theme = {
  bg: "#fafafa",
  card: "#fff",
  border: "#e5e5e5",
  borderLight: "#f0f0f0",
  textPrimary: "#111",
  textSecondary: "#666",
  textTertiary: "#999",
  subtle: "#f5f5f5",
};
