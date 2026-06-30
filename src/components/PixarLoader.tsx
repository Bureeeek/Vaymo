import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function PixarLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('vaymo_loader_seen') !== '1';
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      sessionStorage.setItem('vaymo_loader_seen', '1');
      setVisible(false);
    }, 1500);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Wordmark */}
          <div className="flex font-anton uppercase tracking-[0.2em] text-foreground text-5xl sm:text-6xl leading-none mb-5">
            {['V', 'A', 'Y', 'M', 'O'].map((c, i) => (
              <motion.span
                key={c + i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>

          {/* Progress line */}
          <div className="relative h-px w-40 bg-border overflow-hidden rounded-full">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.3, ease: [0.6, 0, 0.4, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
