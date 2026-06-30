import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Instagram, Camera, type LucideIcon } from 'lucide-react';

const TikTokIcon: LucideIcon = (({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.2a8.16 8.16 0 0 0 4.77 1.52V6.27a4.85 4.85 0 0 1-1.84-.42z" />
  </svg>
)) as unknown as LucideIcon;

type Platform = {
  key: string;
  name: string;
  icon: LucideIcon;
  tags: string[];
  desc: string;
  format: string;
  audience: string;
  goal: string;
};

const platforms: Platform[] = [
  {
    key: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    tags: ['Trust', 'Long-form', 'Search'],
    desc: 'Für längere Erklärungen, Vertrauen und Produkte, die mehr Kontext brauchen.',
    format: 'Integration · Review · Tutorial',
    audience: '8-25 Min · suchend',
    goal: 'Vertrauen aufbauen',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    tags: ['Community', 'Reels', 'Story'],
    desc: 'Für Reels, Storys und Creator, die nah an ihrer Community sind.',
    format: 'Reel · Story · Carousel',
    audience: '15-60 Sek · scrollend',
    goal: 'Community aktivieren',
  },
  {
    key: 'tiktok',
    name: 'TikTok',
    icon: TikTokIcon,
    tags: ['Reach', 'Trends', 'Native'],
    desc: 'Für schnelle Aufmerksamkeit, Trends und natürliche Produktmomente.',
    format: 'Native Post · Hook-First',
    audience: '7-30 Sek · entdeckend',
    goal: 'Reichweite & Buzz',
  },
  {
    key: 'ugc',
    name: 'UGC',
    icon: Camera,
    tags: ['Ad Creative', 'Owned', 'Performance'],
    desc: 'Für Content, den du auf deinen eigenen Kanälen, Ads oder Landingpages nutzen kannst.',
    format: 'Vertical · Hook + CTA',
    audience: 'Paid Social · Web',
    goal: 'Performance & Conversion',
  },
];

export function Platforms() {
  const [active, setActive] = useState(0);
  const current = platforms[active];

  return (
    <section className="pt-12 md:pt-16 pb-20 md:pb-24">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 leading-[1.1]">
            Content dort, wo deine Zielgruppe wirklich schaut
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Wir planen nicht nach Plattform-Checkliste. Wir schauen, wo dein Produkt natürlich reinpasst — ob YouTube, Instagram, TikTok oder UGC.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            const isActive = i === active;
            return (
              <button
                key={p.key}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full border transition-colors duration-200 ${
                  isActive
                    ? 'border-foreground/30 bg-foreground/8 text-foreground'
                    : 'border-foreground/10 text-foreground/50 hover:border-foreground/20 hover:text-foreground/80'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isActive ? 'bg-foreground/10' : 'bg-foreground/[0.04] group-hover:bg-foreground/[0.07]'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium">{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-6 md:gap-10 items-start"
            >
              {/* Left: copy */}
              <div>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-2">
                  {current.tags.join(' · ')}
                </p>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  {current.name}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Right: details */}
              <div className="space-y-2">
                {[
                  { label: 'Format',   v: current.format },
                  { label: 'Audience', v: current.audience },
                  { label: 'Ziel',     v: current.goal },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-border"
                  >
                    <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">{row.label}</span>
                    <span className="text-sm text-foreground/80 text-right">{row.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
