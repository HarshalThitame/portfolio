import { siteConfig } from "@/lib/site-config";

const resumeText = `${siteConfig.name}
${siteConfig.role}

Specialization:
Modern web applications, business platforms, AI integrations, responsive user interfaces and performance-focused product engineering.

Core Stack:
Next.js, React, TypeScript, Tailwind CSS, Node.js, Supabase, PostgreSQL, Vercel, OpenAI integrations.

Featured Work:
Flux3D - Industrial 3D printing business platform.
Majhi Dairy - Dairy management platform with milk collection tracking, farmer management, reports and Marathi/English workflows.

Contact:
Email: ${siteConfig.email}
LinkedIn: ${siteConfig.links.linkedin}
GitHub: ${siteConfig.links.github}
Portfolio: ${siteConfig.url}
`;

export function GET() {
  return new Response(resumeText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Harshal-Resume.txt"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
