import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const videos = [
  { src: '/videos/ruben.mp4', creator: 'Ruben', flag: '🇫🇷' },
  { src: '/videos/philippe.mp4', creator: 'Philippe', flag: '🇩🇪' },
  { src: '/videos/oliver.mov', creator: 'Oliver', flag: '🇩🇪' },
  { src: '/videos/hermann.mp4', creator: 'Hermann', flag: '🇩🇪' },
];

const SPRING = { type: 'spring' as const, damping: 26, stiffness: 200, mass: 0.8 };

export function ContentShowcase() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mutedMap, setMutedMap] = useState<Record<number, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<number, boolean>>({});
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Pre-check each video by trying to load metadata
    videos.forEach((v, i) => {
      const video = document.createElement('video');
      video.src = v.src;
      video.preload = 'metadata';
      video.onerror = () => setErrorMap(prev => ({ ...prev, [i]: true }));
    });
  }, []);

  const togglePlay = (i: number) => {
    const video = refs.current[i];
    if (!video) return;

    if (activeIndex === i) {
      video.pause();
      setActiveIndex(null);
      return;
    }

    if (activeIndex !== null) {
      const prev = refs.current[activeIndex];
      if (prev) prev.pause();
    }
    video.muted = mutedMap[i] ?? false;
    video.play().catch(() => {});
    setActiveIndex(i);
  };

  const toggleMute = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    const video = refs.current[i];
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMutedMap((prev) => ({ ...prev, [i]: next }));
  };

  return (
    <section id="videos" className="pt-20 md:pt-24 pb-12 md:pb-16 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
            {t('showcase.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('showcase.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto items-center">
          {videos.map((v, i) => {
            const isActive = activeIndex === i;
            const isDimmed = activeIndex !== null && !isActive;
            const isMuted = mutedMap[i] ?? false;

            const hasError = errorMap[i];

            return (
              <motion.div
                key={v.src}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden border bg-card group cursor-pointer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                animate={{
                  scale: isActive ? 1.05 : isDimmed ? 0.96 : 1,
                  opacity: isDimmed ? 0.55 : 1,
                }}
                transition={{
                  scale: SPRING,
                  opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  default: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{
                  borderColor: isActive
                    ? 'hsl(var(--accent-blue) / 0.55)'
                    : 'hsl(var(--border) / 0.6)',
                  boxShadow: isActive
                    ? '0 18px 50px -18px hsl(var(--accent-blue) / 0.45), 0 0 0 1px hsl(var(--accent-blue) / 0.25)'
                    : 'none',
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                  zIndex: isActive ? 5 : 1,
                }}
                onClick={() => togglePlay(i)}
              >
                {hasError ? (
                  <div className="absolute inset-0 bg-secondary flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl">{v.flag}</div>
                    <span className="text-xs text-muted-foreground">{v.creator}</span>
                  </div>
                ) : (
                  <video
                    ref={(el) => (refs.current[i] = el)}
                    src={v.src}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onError={() => setErrorMap(prev => ({ ...prev, [i]: true }))}
                  />
                )}

                {/* Flag */}
                <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-background/55 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-lg z-10">
                  <span>{v.flag}</span>
                </div>

                {/* Mute (only when active) */}
                {isActive && (
                  <button
                    onClick={(e) => toggleMute(e, i)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/55 backdrop-blur-md border border-foreground/10 hover:bg-background/75 flex items-center justify-center z-10 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-foreground/90" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-foreground/90" />
                    )}
                  </button>
                )}

                {/* Play / Pause overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                    isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  <div className="absolute inset-0 bg-background/25" />
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/55 backdrop-blur-md border border-foreground/15 flex items-center justify-center">
                    {isActive ? (
                      <Pause className="w-5 h-5 text-foreground fill-foreground" />
                    ) : (
                      <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
                    )}
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-background/85 via-background/35 to-transparent pointer-events-none">
                  <div className="text-xs md:text-sm font-medium text-foreground">
                    {v.creator}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
