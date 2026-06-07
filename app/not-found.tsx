import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-state bg-ink text-pearl">
      <div className="error-state-panel">
        <span>404</span>
        <h1>This page does not exist.</h1>
        <p>Use the main portfolio navigation to continue exploring the work.</p>
        <div>
          <Link href="/">Go Home</Link>
          <Link href="/labs">Open Labs</Link>
        </div>
      </div>
    </main>
  );
}
