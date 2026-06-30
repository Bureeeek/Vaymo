
## Plan: Komplettes Vaymo Landing Page Redesign – warm, premium, ruhig

Ich gestalte die Landing Page komplett neu im Stil moderner High-End-Agentur-Seiten – warm, dunkel, elegant, leicht verständlich.

### 1. Design System (`src/index.css` + `tailwind.config.ts`)
**Neue Farbpalette (warm-dunkel statt blau-lila):**
- Background: `#0F1115` (deep charcoal)
- Surface: `#151922` (slightly lighter)
- Foreground: `#F5F3EE` (warm off-white)
- Muted: `#B8BDC7` (soft gray)
- **Accent: `#D6B36A`** (warm muted gold) – ein einziger Akzent

**Typography:**
- Headlines: **Plus Jakarta Sans** (statt Anton – ruhiger, premium)
- Body: **Inter**

**Animations:**
- Ruhige fade-in-up auf Scroll
- Soft hover, sanfter gold Glow hinter Hero-Headline
- Keine Partikel, keine bewegten Backgrounds

### 2. Hero
- Headline bleibt: "Bring deine Marke direkt in die Feeds deiner Zielgruppe."
- Typing-Animation langsamer & sanfter (90ms typing, 2800ms pause, 50ms delete)
- Subheadline: "Wir bringen deine Marke zu den richtigen Creatorn und kümmern uns um die Umsetzung."
- Primary CTA "Kontaktiere uns" (gold) + Secondary Link "Mehr erfahren"
- Soft gold glow hinter Headline

### 3. Neue Section: Intro/Value
"Creator Marketing funktioniert am besten, wenn es sich echt anfühlt. Deshalb arbeiten wir mit Creatorn, die wirklich zu deiner Marke passen."

### 4. What We Do (Refactor von Services)
4 einfache Cards: Creator finden · Kampagne planen · Kommunikation übernehmen · Prozess einfach halten

### 5. Platforms (NEU)
4 Plattform-Cards: YouTube · Instagram · TikTok · UGC mit Icons + kurzen Sätzen

### 6. Content Preview (NEU)
Grid mit vertikalen 9:16 Video-Mockup-Cards (Phone-Style mit Gradient-Frames), 4-6 Cards leicht versetzt

### 7. Why Vaymo (NEU)
4 Punkte: Ausgewählte Creator · Schnelle Umsetzung · Einfache Abläufe · Persönlicher Kontakt

### 8. Final CTA (NEU)
"Lass uns schauen, ob das zu deiner Marke passt." + großer gold Button

### 9. Footer + Header
Bleiben, leichte Farbanpassung

### 10. Index Page – neue Struktur
`Header → Hero → Intro → Services → Platforms → ContentShowcase → WhyVaymo → FinalCTA → Footer`
(Roadmap, VaymoStandard, Ethics werden entfernt – passen nicht zum neuen ruhigen Brief)

### 11. Übersetzungen
Neue Keys für alle Sections, DE + EN, einfache Sprache (7. Klasse).

### Betroffene Dateien
- `src/index.css`, `tailwind.config.ts`, `index.html`
- `src/components/Hero.tsx` (Anpassung)
- `src/components/Services.tsx` (Refactor)
- `src/components/Intro.tsx`, `Platforms.tsx`, `ContentShowcase.tsx`, `WhyVaymo.tsx`, `FinalCTA.tsx` (alle NEU)
- `src/pages/Index.tsx` (neue Struktur)
- `src/contexts/LanguageContext.tsx` (neue Keys)
