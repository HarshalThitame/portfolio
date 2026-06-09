"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SectionSkeleton } from "@/components/skeletons";

const emptyAliases: string[] = [];

const AboutSection = dynamic(
  () => import("@/components/about-section").then((module) => module.AboutSection),
  { ssr: false, loading: () => <SectionSkeleton label="Loading about section" /> },
);
const ProjectsSection = dynamic(
  () => import("@/components/projects-section").then((module) => module.ProjectsSection),
  { ssr: false, loading: () => <SectionSkeleton label="Loading projects section" /> },
);
const ServicesSection = dynamic(
  () => import("@/components/services-section").then((module) => module.ServicesSection),
  { ssr: false, loading: () => <SectionSkeleton label="Loading services section" /> },
);
const ClientAcquisitionSection = dynamic(
  () => import("@/components/client-acquisition-section").then((module) => module.ClientAcquisitionSection),
  { ssr: false, loading: () => <SectionSkeleton label="Loading client acquisition section" /> },
);
const ConversionSection = dynamic(
  () => import("@/components/conversion-section").then((module) => module.ConversionSection),
  { ssr: false, loading: () => <SectionSkeleton label="Loading conversion section" /> },
);
const PersonalBrandSection = dynamic(
  () => import("@/components/personal-brand-section").then((module) => module.PersonalBrandSection),
  { ssr: false, loading: () => <SectionSkeleton label="Loading personal brand section" /> },
);
const LabsSection = dynamic(
  () => import("@/components/labs-section").then((module) => module.LabsSection),
  { ssr: false, loading: () => <SectionSkeleton label="Loading labs section" /> },
);
const ContactSection = dynamic(
  () => import("@/components/contact-section").then((module) => module.ContactSection),
  { ssr: false, loading: () => <SectionSkeleton label="Loading contact section" /> },
);

function DeferredSection({
  sectionId,
  aliases = emptyAliases,
  label,
  forceRender = false,
  children,
}: {
  sectionId: string;
  aliases?: string[];
  label: string;
  forceRender?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (forceRender) {
      setShouldRender(true);
      return;
    }

    if (shouldRender) return;

    const node = ref.current;
    if (!node) return;

    let rendered = false;

    const renderSection = (activeObserver?: IntersectionObserver) => {
      if (rendered) return;
      rendered = true;
      setShouldRender(true);
      activeObserver?.disconnect();
    };

    const sectionTargets = [sectionId, ...aliases].map((id) => `#${id}`);
    if (sectionTargets.includes(window.location.hash)) {
      renderSection();
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => node.scrollIntoView({ block: "start" }));
      });
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      renderSection();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        renderSection(observer);
      },
      { rootMargin: "240px 0px -18% 0px" },
    );

    observer.observe(node);

    return () => {
      observer?.disconnect();
    };
  }, [aliases, forceRender, sectionId, shouldRender]);

  return (
    <div
      ref={ref}
      id={shouldRender ? undefined : sectionId}
      className="deferred-section-shell"
      data-section={sectionId}
    >
      {!shouldRender
        ? aliases.map((alias) => <span key={alias} id={alias} className="deferred-anchor" />)
        : null}
      {shouldRender ? children : <SectionSkeleton label={label} />}
    </div>
  );
}

export function DeferredHomeSections() {
  const sections = useMemo(() => [
    { sectionId: "about", label: "Loading about section", children: <AboutSection /> },
    { sectionId: "featured-projects", label: "Loading projects section", children: <ProjectsSection /> },
    { sectionId: "services", label: "Loading services section", children: <ServicesSection /> },
    { sectionId: "client-acquisition", label: "Loading client acquisition section", children: <ClientAcquisitionSection /> },
    { sectionId: "consultation", label: "Loading consultation section", children: <ConversionSection /> },
    { sectionId: "personal-brand", label: "Loading personal brand section", children: <PersonalBrandSection /> },
    { sectionId: "labs", label: "Loading labs section", children: <LabsSection /> },
    { sectionId: "contact", aliases: ["contact-form"], label: "Loading contact section", children: <ContactSection /> },
  ], []);
  const [forcedIndex, setForcedIndex] = useState(-1);

  useEffect(() => {
    const updateHashTarget = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setForcedIndex(-1);
        return;
      }

      const nextIndex = sections.findIndex((section) => section.sectionId === hash || section.aliases?.includes(hash));
      setForcedIndex(nextIndex);

      if (nextIndex >= 0) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }));
        });
      }
    };

    updateHashTarget();
    window.addEventListener("hashchange", updateHashTarget);
    return () => window.removeEventListener("hashchange", updateHashTarget);
  }, [sections]);

  return (
    <>
      {sections.map((section, index) => (
        <DeferredSection
          key={section.sectionId}
          sectionId={section.sectionId}
          aliases={section.aliases}
          label={section.label}
          forceRender={forcedIndex >= index}
        >
          {section.children}
        </DeferredSection>
      ))}
    </>
  );
}
