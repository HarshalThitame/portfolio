"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SectionSkeleton } from "@/components/skeletons";

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
  aliases = [],
  label,
  children,
}: {
  sectionId: string;
  aliases?: string[];
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -18% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

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
  return (
    <>
      <DeferredSection sectionId="about" label="Loading about section">
        <AboutSection />
      </DeferredSection>
      <DeferredSection sectionId="featured-projects" label="Loading projects section">
        <ProjectsSection />
      </DeferredSection>
      <DeferredSection sectionId="services" label="Loading services section">
        <ServicesSection />
      </DeferredSection>
      <DeferredSection sectionId="client-acquisition" label="Loading client acquisition section">
        <ClientAcquisitionSection />
      </DeferredSection>
      <DeferredSection sectionId="consultation" label="Loading consultation section">
        <ConversionSection />
      </DeferredSection>
      <DeferredSection sectionId="personal-brand" label="Loading personal brand section">
        <PersonalBrandSection />
      </DeferredSection>
      <DeferredSection sectionId="labs" label="Loading labs section">
        <LabsSection />
      </DeferredSection>
      <DeferredSection sectionId="contact" aliases={["contact-form"]} label="Loading contact section">
        <ContactSection />
      </DeferredSection>
    </>
  );
}
