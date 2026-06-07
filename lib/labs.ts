export type LabId =
  | "ai-experiments"
  | "ui-concepts"
  | "data-visualizations"
  | "three-d-interactions"
  | "creative-coding";

export type Lab = {
  id: LabId;
  category: string;
  title: string;
  shortTitle: string;
  description: string;
  outcome: string;
  stack: string[];
  signals: string[];
  architecture: Array<{
    title: string;
    detail: string;
  }>;
  metrics: Array<{
    label: string;
    value: string;
  }>;
};

export const labs: Lab[] = [
  {
    id: "ai-experiments",
    category: "AI Experiments",
    title: "AI Workflow Intelligence",
    shortTitle: "AI Studio",
    description:
      "A product-thinking sandbox for exploring AI assistants, prompt flows and operational automation without losing user control.",
    outcome: "Turns rough business context into useful product direction, next actions and interface decisions.",
    stack: ["React State", "Prompt UX", "Automation Logic", "OpenAI Ready"],
    signals: ["Prompt safety", "Human review", "Business workflow", "Fallback states"],
    architecture: [
      { title: "Input Layer", detail: "Capture intent, role, constraints and confidence before generating suggestions." },
      { title: "Reasoning Layer", detail: "Separate automation from decision making so users can inspect each recommendation." },
      { title: "Product Layer", detail: "Return actions, UI states and follow-up questions instead of raw AI output." },
    ],
    metrics: [
      { label: "Automation", value: "74%" },
      { label: "Review", value: "Human" },
      { label: "Latency Target", value: "<1.2s" },
    ],
  },
  {
    id: "ui-concepts",
    category: "UI Concepts",
    title: "Premium Interface Prototypes",
    shortTitle: "UI Lab",
    description:
      "Interactive interface studies for dashboards, command menus, product onboarding and dense business workflows.",
    outcome: "Proves that complex products can still feel elegant, readable and fast to operate.",
    stack: ["Framer Motion", "Design Systems", "Responsive UI", "Accessibility"],
    signals: ["Focus states", "Motion hierarchy", "Information density", "Mobile-first layout"],
    architecture: [
      { title: "Token System", detail: "Define spacing, surfaces, type and motion before building individual components." },
      { title: "Component Logic", detail: "Keep interface states predictable across empty, loading, success and error cases." },
      { title: "Interaction Layer", detail: "Add subtle transitions that improve comprehension instead of only decoration." },
    ],
    metrics: [
      { label: "States", value: "12" },
      { label: "Density", value: "Adaptive" },
      { label: "A11y", value: "Keyboard" },
    ],
  },
  {
    id: "data-visualizations",
    category: "Data Visualizations",
    title: "Operational Data Stories",
    shortTitle: "Data Lab",
    description:
      "Visual systems for reports, analytics and operational dashboards where business owners need clarity at a glance.",
    outcome: "Transforms raw records into explainable signals, trend lines and decisions.",
    stack: ["SVG", "Analytics UI", "Realtime Data", "PostgreSQL"],
    signals: ["Trend clarity", "Comparisons", "Anomaly states", "Decision support"],
    architecture: [
      { title: "Data Model", detail: "Normalize records into simple metrics before visualizing anything." },
      { title: "Chart Renderer", detail: "Use lightweight SVG and semantic labels for fast, accessible dashboards." },
      { title: "Insight Layer", detail: "Pair every chart with the business decision it supports." },
    ],
    metrics: [
      { label: "Refresh", value: "Live" },
      { label: "Views", value: "5+" },
      { label: "Payload", value: "Lean" },
    ],
  },
  {
    id: "three-d-interactions",
    category: "3D Interactions",
    title: "Spatial Product Interactions",
    shortTitle: "3D Lab",
    description:
      "Holographic product surfaces, depth-aware components and pointer-responsive 3D interactions for memorable interfaces.",
    outcome: "Adds cinematic depth while keeping the interaction lightweight, responsive and GPU-friendly.",
    stack: ["CSS 3D", "Pointer Events", "GPU Transforms", "Motion"],
    signals: ["Perspective", "Depth", "Parallax", "Reduced-motion fallback"],
    architecture: [
      { title: "Scene State", detail: "Track pointer and intensity as variables rather than re-rendering heavy objects." },
      { title: "Visual Layer", detail: "Compose planes, rings and shadows with CSS transforms for high frame rates." },
      { title: "Fallback Layer", detail: "Keep the core content usable when motion is reduced or unsupported." },
    ],
    metrics: [
      { label: "FPS Goal", value: "60" },
      { label: "Runtime", value: "CSS" },
      { label: "Weight", value: "0 deps" },
    ],
  },
  {
    id: "creative-coding",
    category: "Creative Coding Projects",
    title: "Generative Interface Systems",
    shortTitle: "Code Lab",
    description:
      "Small creative systems that explore particles, procedural layouts, ambient fields and responsive product moments.",
    outcome: "Shows the ability to build expressive interfaces from first principles, not only assemble templates.",
    stack: ["React", "Procedural UI", "Animation Loops", "Design Engineering"],
    signals: ["Generative rules", "Ambient motion", "Composition", "Interaction physics"],
    architecture: [
      { title: "Rule Engine", detail: "Generate visual systems from deterministic inputs so the output remains controlled." },
      { title: "Motion Budget", detail: "Limit animation work to transform and opacity for smooth rendering." },
      { title: "Product Fit", detail: "Use creative code only when it supports brand, memory or comprehension." },
    ],
    metrics: [
      { label: "Nodes", value: "48" },
      { label: "Rules", value: "6" },
      { label: "Motion", value: "Ambient" },
    ],
  },
];

export function getLabById(id: LabId) {
  return labs.find((lab) => lab.id === id) ?? labs[0];
}
