import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: '#cases',    label: t('nav.cases')    },
    { href: '#services', label: t('nav.services') },
    { href: '#team',     label: t('footer.menuTeam')    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToContact = () => {
    navigate('/contact');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <div className="section-container">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo — plain Anton text */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="font-anton text-base tracking-widest text-foreground hover:text-foreground/80 transition-colors cursor-pointer select-none"
          >
            VAYMO
          </a>

          {/* Desktop nav — center */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {/* DE/EN toggle — minimal text buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('de')}
                className={`text-xs font-medium px-1 transition-colors ${
                  language === 'de' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                DE
              </button>
              <span className="text-muted-foreground/30 text-xs">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-medium px-1 transition-colors ${
                  language === 'en' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA — white pill */}
            <button
              onClick={goToContact}
              className="rounded-full bg-foreground text-background
                         px-5 h-9 text-xs font-medium
                         hover:bg-foreground/90 transition-colors"
            >
              {t('nav.cta')}
            </button>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('de')}
                className={`text-xs font-medium px-1 transition-colors ${
                  language === 'de' ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                DE
              </button>
              <span className="text-muted-foreground/30 text-xs">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-medium px-1 transition-colors ${
                  language === 'en' ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden glass border-t border-border/40"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="section-container py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors py-3 cursor-pointer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <button
                onClick={goToContact}
                className="mt-3 rounded-full bg-foreground text-background h-11 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                {t('nav.cta')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
