import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      // Small delay before showing banner
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl shadow-black/20">
              {/* Close button */}
              <button
                onClick={handleDecline}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 pr-8 md:pr-0">
                  <h3 className="text-lg font-semibold mb-1">
                    {t('cookie.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('cookie.description')}{' '}
                    <a href="/datenschutz" className="text-primary hover:underline">
                      {t('cookie.learnMore')}
                    </a>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleDecline}
                    className="flex-1 md:flex-none"
                  >
                    {t('cookie.decline')}
                  </Button>
                  <Button
                    onClick={handleAccept}
                    className="flex-1 md:flex-none"
                  >
                    {t('cookie.accept')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}