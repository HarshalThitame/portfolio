export function SectionSkeleton({ label = "Loading section" }: { label?: string }) {
  return (
    <section className="section-skeleton" aria-label={label} aria-busy="true">
      <div className="section-skeleton-inner">
        <div className="skeleton-title" />
      </div>
    </section>
  );
}

export function RouteSkeleton({ label = "Loading experience" }: { label?: string }) {
  return (
    <main className="route-skeleton bg-ink text-pearl" aria-label={label} aria-busy="true">
      <div className="route-skeleton-mesh" aria-hidden="true" />
      <div className="route-skeleton-inner">
        <div className="skeleton-pill" />
        <div className="skeleton-title skeleton-title-large">
          <span />
          <span />
          <span />
        </div>
        <div className="skeleton-grid skeleton-grid-large">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </main>
  );
}
