const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#04050a"/>
  <circle cx="20" cy="18" r="18" fill="#61f4ff" opacity=".22"/>
  <circle cx="48" cy="46" r="20" fill="#ffb2c7" opacity=".18"/>
  <path d="M19 45V18h7v10h12V18h7v27h-7V34H26v11h-7Z" fill="#f8fbff"/>
</svg>`;

export function GET() {
  return new Response(icon, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
