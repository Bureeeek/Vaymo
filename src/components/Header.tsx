import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#cases',   label: t('nav.cases')         },
    { href: '#services',label: t('nav.services')       },
    { href: '#team',    label: t('footer.menuTeam')    },
    { href: '/contact', label: t('nav.contact'), page: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, page?: boolean) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (page) {
      navigate(href);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') navigate('/');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? 'glass border-b border-white/8'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-[68px]">

          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="font-anton text-[15px] tracking-widest text-foreground hover:text-foreground/70
                       transition-colors duration-200 cursor-pointer select-none shrink-0"
          >
            VAYMO
          </a>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.page)}
                className="relative text-sm text-foreground/55 hover:text-foreground
                           transition-colors duration-200 cursor-pointer group"
              >
                {link.label}
                {/* underline slide-in on hover */}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground/40
                                 group-hover:w-full transition-[width] duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right: language toggle */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center rounded-full border border-white/12 overflow-hidden">
              <button
                onClick={() => setLanguage('de')}
                className={`px-3.5 py-1.5 text-[11px] font-medium tracking-wide transition-colors duration-200 ${
                  language === 'de'
                    ? 'bg-foreground text-background'
                    : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                DE
              </button>
              <div className="w-px h-4 bg-white/10" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-3.5 py-1.5 text-[11px] font-medium tracking-wide transition-colors duration-200 ${
                  language === 'en'
                    ? 'bg-foreground text-background'
                    : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile: lang + burger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center rounded-full border border-white/12 overflow-hidden">
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1 text-[11px] font-medium transition-colors ${
                  language === 'de' ? 'bg-foreground text-background' : 'text-foreground/50'
                }`}
              >
                DE
              </button>
              <div className="w-px h-3.5 bg-white/10" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-[11px] font-medium transition-colors ${
                  language === 'en' ? 'bg-foreground text-background' : 'text-foreground/50'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
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
            className="md:hidden border-t border-white/8 glass"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <div className="section-container py-6 flex flex-col gap-0">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.page)}
                  className="text-base text-foreground/60 hover:text-foreground transition-colors
                             py-3.5 border-b border-white/6 last:border-0 cursor-pointer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
