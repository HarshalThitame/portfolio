"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Linkedin, Share2, Twitter } from "lucide-react";

export function ReadingProgress() {
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollTop / max));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const scheduleUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div className="article-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="article-share" aria-label="Share article">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="size-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
      >
        <Twitter className="size-4" />
      </a>
      <button type="button" onClick={copyLink} aria-label="Copy article link">
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <span>
        <Share2 className="size-4" />
        Share
      </span>
    </div>
  );
}
