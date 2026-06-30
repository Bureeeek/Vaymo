import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-16 md:py-20">
      <div className="section-container">

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-14">

          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <span className="font-anton text-xl tracking-widest text-foreground">VAYMO</span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              {t('footer.tagline')}
            </p>
            <a
              href="mailto:info@vaymo-agency.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              info@vaymo-agency.com
            </a>
          </div>

          {/* Col 2 — Menu */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/50 mb-5">
              {t('footer.menu')}
            </p>
            <nav className="flex flex-col gap-3">
              <a href="/#cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.cases')}
              </a>
              <a href="/#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.services')}
              </a>
              <a href="/#team" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.menuTeam')}
              </a>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/50 mb-5">
              {t('footer.legal')}
            </p>
            <nav className="flex flex-col gap-3">
              <Link to="/impressum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.impressum')}
              </Link>
              <Link to="/datenschutz" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.privacy')}
              </Link>
            </nav>
          </div>

          {/* Col 4 — Social */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/50 mb-5">
              {t('footer.social')}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-4 h-4 flex-shrink-0" />
                Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                LinkedIn
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.89a8.17 8.17 0 004.78 1.52V7a4.84 4.84 0 01-1.01-.31z" />
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vaymo. {t('footer.rights')}
          </p>
          <p className="text-xs text-muted-foreground">Creator Marketing Agency</p>
        </div>

      </div>
    </footer>
  );
}
