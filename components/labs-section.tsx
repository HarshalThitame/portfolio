"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType, CSSProperties, PointerEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Box,
  Code2,
  Cpu,
  LayoutDashboard,
  MousePointer2,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Terminal,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { labs } from "@/lib/labs";
import type { Lab, LabId } from "@/lib/labs";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const labIcons: Record<LabId, ComponentType<{ className?: string }>> = {
  "ai-experiments": Bot,
  "ui-concepts": LayoutDashboard,
  "data-visualizations": BarChart3,
  "three-d-interactions": Box,
  "creative-coding": Sparkles,
};

type LabsExperienceProps = {
  variant?: "home" | "page";
};

export function LabsSection() {
  return <LabsExperience variant="home" />;
}

export function LabsPageExperience() {
  return <LabsExperience variant="page" />;
}

function LabsExperience({ variant = "home" }: LabsExperienceProps) {
  const [activeId, setActiveId] = useState<LabId>(labs[0].id);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [signal, setSignal] = useState(68);
  const [density, setDensity] = useState(54);
  const [perspective, setPerspective] = useState(66);
  const isPage = variant === "page";
  const categories = useMemo(() => Array.from(new Set(labs.map((lab) => lab.category))), []);

  const visibleLabs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return labs.filter((lab) => {
      const matchesCategory = category === "All" || lab.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [lab.title, lab.category, lab.description, lab.outcome, ...lab.stack, ...lab.signals]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  useEffect(() => {
    if (visibleLabs.some((lab) => lab.id === activeId)) return;
    setActiveId(visibleLabs[0]?.id ?? labs[0].id);
  }, [activeId, visibleLabs]);

  const activeLab = labs.find((lab) => lab.id === activeId) ?? labs[0];

  const selectLab = (id: LabId, source: string) => {
    setActiveId(id);
    trackEvent("labs_interaction", { lab: id, source });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    event.currentTarget.style.setProperty("--lab-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--lab-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--lab-tilt-x", `${(0.5 - y) * 5}deg`);
    event.currentTarget.style.setProperty("--lab-tilt-y", `${(x - 0.5) * 7}deg`);
  };

  return (
    <section
      id="labs"
      className={`labs-section ${isPage ? "labs-page-experience" : "labs-home-experience"} relative overflow-hidden bg-ink text-pearl`}
      aria-labelledby="labs-heading"
    >
      <div aria-hidden="true" className="labs-mesh absolute inset-0" />
      <div aria-hidden="true" className="labs-grid-layer absolute inset-0" />
      <div aria-hidden="true" className="labs-orb labs-orb-one" />
      <div aria-hidden="true" className="labs-orb labs-orb-two" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 xl:px-16">
        <div className="labs-hero-grid">
          <div>
            <motion.p
              className="labs-kicker"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, ease: premiumEase }}
            >
              Experiments & Labs
            </motion.p>
            <motion.h2
              id="labs-heading"
              className="mt-6 font-display text-5xl font-black leading-[0.92] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1, duration: 0.88, ease: premiumEase }}
            >
              Interactive technical
              <span className="headline-accent block">depth, not static claims.</span>
            </motion.h2>
          </div>

          <motion.div
            className="labs-hero-copy"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.16, duration: 0.78, ease: premiumEase }}
          >
            <p>
              A living studio for AI ideas, interface concepts, data stories,
              spatial interactions and creative coding systems. Each lab is
              built to show how I think through product behavior and technical
              execution.
            </p>
            <div className="labs-hero-actions">
              {isPage ? (
                <Link href="/#contact" className="labs-primary-link">
                  Start A Project
                  <ArrowUpRight className="size-4" />
                </Link>
              ) : (
                <Link href="/labs" className="labs-primary-link">
                  Open Labs
                  <ArrowUpRight className="size-4" />
                </Link>
              )}
              <Link href="/blog" className="labs-secondary-link">
                Read Build Notes
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="labs-command-center"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.12, duration: 0.84, ease: premiumEase }}
        >
          <aside className="labs-control-panel">
            <div className="labs-panel-heading">
              <span>
                <Terminal className="size-4" />
                Live Index
              </span>
              <strong>{visibleLabs.length} labs</strong>
            </div>

            {isPage ? (
              <>
                <label className="labs-search-shell">
                  <Search className="size-4" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search labs"
                    aria-label="Search labs"
                  />
                </label>
                <div className="labs-filter-row" aria-label="Lab categories">
                  {["All", ...categories].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={category === item ? "active" : ""}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            <div className="labs-list" role="list">
              {(isPage ? visibleLabs : labs).map((lab, index) => (
                <LabSelector
                  key={lab.id}
                  lab={lab}
                  index={index}
                  active={lab.id === activeId}
                  onClick={() => selectLab(lab.id, isPage ? "labs_page_selector" : "home_selector")}
                />
              ))}
            </div>
          </aside>

          <div
            className="lab-preview-panel"
            onPointerMove={handlePointerMove}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--lab-tilt-x", "0deg");
              event.currentTarget.style.setProperty("--lab-tilt-y", "0deg");
            }}
          >
            <div className="lab-preview-header">
              <span>{activeLab.category}</span>
              <div>
                {activeLab.stack.slice(0, 3).map((item) => (
                  <small key={item}>{item}</small>
                ))}
              </div>
            </div>

            <div className="lab-preview-main">
              <div>
                <h3>{activeLab.title}</h3>
                <p>{activeLab.description}</p>
              </div>
              <LabSandbox
                lab={activeLab}
                signal={signal}
                density={density}
                perspective={perspective}
                onSignalChange={setSignal}
                onDensityChange={setDensity}
                onPerspectiveChange={setPerspective}
              />
            </div>

            <div className="lab-architecture-grid">
              {activeLab.architecture.map((item) => (
                <article key={item.title}>
                  <span>{item.title}</span>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="lab-code-panel">
              <div>
                <Code2 className="size-4" />
                <span>Architecture Preview</span>
              </div>
              <pre>
                <code>{`createLab({
  input: "${activeLab.signals[0]}",
  renderer: "${activeLab.stack[0]} + ${activeLab.stack[1]}",
  interaction: "state + pointer + motion",
  outcome: "${activeLab.outcome}"
})`}</code>
              </pre>
            </div>
          </div>
        </motion.div>

        <div className="labs-card-grid">
          {labs.map((lab, index) => (
            <LabCard
              key={lab.id}
              lab={lab}
              index={index}
              active={lab.id === activeId}
              onClick={() => selectLab(lab.id, isPage ? "labs_page_card" : "home_card")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LabSelector({
  lab,
  index,
  active,
  onClick,
}: {
  lab: Lab;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = labIcons[lab.id];

  return (
    <motion.button
      type="button"
      role="listitem"
      className={`labs-selector ${active ? "active" : ""}`}
      onClick={onClick}
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: premiumEase }}
    >
      <Icon className="size-5" />
      <span>
        <strong>{lab.shortTitle}</strong>
        <small>{lab.category}</small>
      </span>
    </motion.button>
  );
}

function LabSandbox({
  lab,
  signal,
  density,
  perspective,
  onSignalChange,
  onDensityChange,
  onPerspectiveChange,
}: {
  lab: Lab;
  signal: number;
  density: number;
  perspective: number;
  onSignalChange: (value: number) => void;
  onDensityChange: (value: number) => void;
  onPerspectiveChange: (value: number) => void;
}) {
  return (
    <div className="lab-sandbox">
      <div className="lab-sandbox-top">
        <span>
          <Play className="size-4" />
          Live Preview
        </span>
        <small>{lab.metrics[0].label}: {lab.metrics[0].value}</small>
      </div>

      <div className="lab-preview-stage" aria-label={`${lab.title} interactive preview`}>
        {lab.id === "ai-experiments" ? <AiPreview signal={signal} /> : null}
        {lab.id === "ui-concepts" ? <UiPreview signal={signal} density={density} /> : null}
        {lab.id === "data-visualizations" ? <DataPreview signal={signal} density={density} /> : null}
        {lab.id === "three-d-interactions" ? <ThreeDPreview signal={signal} perspective={perspective} /> : null}
        {lab.id === "creative-coding" ? <CreativePreview density={density} signal={signal} /> : null}
      </div>

      <div className="lab-control-grid">
        <RangeControl
          label="Signal"
          value={signal}
          min={30}
          max={96}
          onChange={onSignalChange}
          icon={SlidersHorizontal}
        />
        <RangeControl
          label={lab.id === "three-d-interactions" ? "Perspective" : "Density"}
          value={lab.id === "three-d-interactions" ? perspective : density}
          min={28}
          max={92}
          onChange={lab.id === "three-d-interactions" ? onPerspectiveChange : onDensityChange}
          icon={MousePointer2}
        />
      </div>
    </div>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <label className="lab-range-control">
      <span>
        <Icon className="size-4" />
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={`${label} control`}
      />
      <strong>{value}</strong>
    </label>
  );
}

function AiPreview({ signal }: { signal: number }) {
  const [prompt, setPrompt] = useState("Build a multilingual dashboard for a dairy business");
  const confidence = Math.min(96, 50 + Math.round(prompt.length * 0.35) + Math.round(signal * 0.15));
  const tasks = [
    "Map manual workflow",
    "Design approval states",
    "Create AI summary layer",
    "Keep human review",
  ];

  return (
    <div className="ai-preview">
      <label>
        Business context
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={3}
          aria-label="AI experiment prompt"
        />
      </label>
      <div className="ai-output">
        <span>Recommended Flow</span>
        <strong>{confidence}% confidence</strong>
        <p>
          Start with workflow capture, then add assisted summaries and guarded
          automations where the user can approve every critical decision.
        </p>
      </div>
      <div className="ai-task-row">
        {tasks.map((task) => (
          <span key={task}>{task}</span>
        ))}
      </div>
    </div>
  );
}

function UiPreview({ signal, density }: { signal: number; density: number }) {
  const [mode, setMode] = useState("Dashboard");
  const rows = Math.max(3, Math.round(density / 18));

  return (
    <div className="ui-preview">
      <div className="ui-mode-row">
        {["Dashboard", "Command", "Mobile"].map((item) => (
          <button
            key={item}
            type="button"
            className={mode === item ? "active" : ""}
            onClick={() => setMode(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={`ui-concept-frame ui-mode-${mode.toLowerCase()}`}>
        <div className="ui-frame-sidebar" />
        <div className="ui-frame-content">
          <div className="ui-frame-header">
            <span>{mode}</span>
            <strong>{signal}%</strong>
          </div>
          <div className="ui-mini-chart">
            {Array.from({ length: 8 }, (_, index) => (
              <i
                key={index}
                style={{ "--height": `${24 + ((index * 13 + signal) % 58)}%` } as CSSProperties}
              />
            ))}
          </div>
          {Array.from({ length: rows }, (_, index) => (
            <div key={index} className="ui-data-row">
              <span />
              <i />
              <strong />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataPreview({ signal, density }: { signal: number; density: number }) {
  const points = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => {
        const value = 30 + ((index * 11 + signal + density) % 58);
        return { x: 10 + index * 10, y: 92 - value };
      }),
    [density, signal],
  );
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div className="data-preview">
      <div className="data-metric-row">
        <span>Collection Trend</span>
        <strong>+{Math.round(signal / 3)}%</strong>
      </div>
      <svg viewBox="0 0 100 100" role="img" aria-label="Interactive data visualization preview">
        <defs>
          <linearGradient id="lab-chart-line" x1="0" x2="1">
            <stop stopColor="#61f4ff" />
            <stop offset="1" stopColor="#ffb2c7" />
          </linearGradient>
        </defs>
        {[24, 46, 68, 90].map((line) => (
          <line key={line} x1="8" x2="92" y1={line} y2={line} />
        ))}
        <path d={path} />
        {points.map((point) => (
          <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="2.4" />
        ))}
      </svg>
      <div className="data-bars">
        {points.slice(0, 6).map((point, index) => (
          <span key={point.x} style={{ "--height": `${96 - point.y}%`, "--delay": `${index * 70}ms` } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

function ThreeDPreview({ signal, perspective }: { signal: number; perspective: number }) {
  const style = {
    "--scene-rotate": `${signal - 56}deg`,
    "--scene-depth": `${perspective * 0.08}rem`,
  } as CSSProperties;

  return (
    <div className="three-preview" style={style}>
      <div className="hologram-rings">
        <span />
        <span />
        <span />
      </div>
      <div className="hologram-core">
        <i className="face face-front" />
        <i className="face face-back" />
        <i className="face face-left" />
        <i className="face face-right" />
        <i className="face face-top" />
        <i className="face face-bottom" />
      </div>
      <div className="three-depth-label">
        <Cpu className="size-4" />
        GPU transforms
      </div>
    </div>
  );
}

function CreativePreview({ density, signal }: { density: number; signal: number }) {
  const nodeCount = Math.round(density / 2) + 16;
  const nodes = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, index) => ({
        id: index,
        left: (index * 17 + signal) % 100,
        top: (index * 29 + density) % 100,
        size: 4 + ((index + signal) % 9),
        delay: `${(index % 8) * 120}ms`,
      })),
    [density, nodeCount, signal],
  );

  return (
    <div className="creative-preview">
      <div className="creative-field">
        {nodes.map((node) => (
          <span
            key={node.id}
            style={
              {
                left: `${node.left}%`,
                top: `${node.top}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                "--delay": node.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="creative-orbit">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function LabCard({
  lab,
  index,
  active,
  onClick,
}: {
  lab: Lab;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = labIcons[lab.id];

  return (
    <motion.article
      className={`lab-card ${active ? "active" : ""}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05, duration: 0.72, ease: premiumEase }}
      whileHover={{ y: -6 }}
    >
      <button type="button" onClick={onClick}>
        <span className="lab-card-icon">
          <Icon className="size-5" />
        </span>
        <small>{lab.category}</small>
        <h3>{lab.title}</h3>
        <p>{lab.outcome}</p>
        <div className="lab-card-stack">
          {lab.stack.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <strong>
          Open sandbox
          <ArrowUpRight className="size-4" />
        </strong>
      </button>
    </motion.article>
  );
}
