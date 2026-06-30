import { createContext, useContext, useState, ReactNode } from "react";

type Language = "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    "nav.cases": "Cases",
    "nav.process": "Prozess",
    "nav.services": "Services",
    "nav.ethics": "Ethik",
    "nav.videos": "Videos",
    "nav.contact": "Kontakt",
    "nav.cta": "Kontaktiere uns",

    // Case Studies
    "cases.eyebrow": "Ausgewählte Arbeiten",
    "cases.title": "Kampagnen, die wir aktiviert haben.",
    "cases.subtitle": "Ein Blick auf Marken, mit denen wir zusammenarbeiten – von Travel bis Privacy. Wisch dich durch.",
    "cases.ubigi.title": "Travel-Creator für globale eSIM-Reichweite.",
    "cases.ubigi.desc": "Wir haben Reise-Creator aktiviert, die Ubigi authentisch im echten Reisealltag gezeigt haben – statt klassischer Werbung.",
    "cases.proton.title": "Privacy erklärt, ohne erhobenen Zeigefinger.",
    "cases.proton.desc": "Mit Tech- und Lifestyle-Creatorn haben wir Protons Mehrwert erzählerisch verpackt – verständlich, ehrlich, ohne Buzzwords.",
    "cases.next.title": "Deine Marke könnte die nächste sein.",
    "cases.next.desc": "Wenn du Creator-Marketing willst, das wirklich nach deiner Marke klingt – lass uns reden.",
    "cases.metric.creators": "Creator",
    "cases.metric.reach": "Reichweite",
    "cases.metric.engagement": "Engagement",

    // Hero
    "hero.headline": "Die richtigen Creator für deine Marke.",
    "hero.subheadline":
      "Wir finden passende Creator und setzen Kampagnen für dich um —",
    "hero.cta": "Kontaktiere uns",
    "hero.secondary": "Mehr erfahren",
    "hero.platforms": "Aktiv auf",
    "hero.rotate.1": "mit Creatorn weltweit",
    "hero.rotate.2": "schnell umgesetzt",
    "hero.rotate.3": "auf YouTube, Instagram, TikTok & UGC",
    "hero.rotate.4": "persönlich betreut",

    // Intro
    "intro.eyebrow": "Was uns wichtig ist",
    "intro.title": "Echtes Creator Marketing fühlt sich nicht wie Werbung an.",
    "intro.text": "Deshalb arbeiten wir nur mit Creatorn, die wirklich zu deiner Marke passen. So entsteht Content, dem Menschen gerne folgen.",

    // What We Do (Services)
    "services.eyebrow": "Was wir machen",
    "services.title": "Einfach, klar und ohne Umwege.",
    "services.subtitle": "Wir kümmern uns um alles, damit du dich auf deine Marke konzentrieren kannst.",
    "services.sourcing.title": "Creator finden",
    "services.sourcing.desc": "Wir suchen Creator, die wirklich zu dir passen. Keine Listen. Keine Massenanfragen.",
    "services.ugc.title": "Kampagne planen",
    "services.ugc.desc": "Wir planen die Kampagne mit dir. Klare Ziele, einfache Schritte.",
    "services.campaign.title": "Kommunikation übernehmen",
    "services.campaign.desc": "Wir reden mit den Creatorn. Du musst nichts hinterher schicken.",
    "services.analytics.title": "Prozess einfach halten",
    "services.analytics.desc": "Du bekommst klare Updates. Keine endlosen Mails, keine Verwirrung.",

    // Platforms
    "platforms.eyebrow": "Plattformen",
    "platforms.title": "Wir sind dort, wo deine Zielgruppe ist.",
    "platforms.youtube.desc": "Lange Videos für echte Aufmerksamkeit.",
    "platforms.instagram.desc": "Reels und Posts für tägliche Reichweite.",
    "platforms.tiktok.desc": "Schneller Content, der wirklich gesehen wird.",
    "platforms.ugc.desc": "Authentischer Content für deine eigenen Kanäle.",

    // Content Showcase
    "showcase.eyebrow": "Beispiele",
    "showcase.title": "So sieht echter Content aus.",
    "showcase.subtitle": "Ein kleiner Einblick, wie unsere Kampagnen aussehen können.",

    // Why Vaymo
    "why.eyebrow": "Warum Vaymo",
    "why.title": "Einfach, persönlich, schnell.",
    "why.point1.title": "Ausgewählte Creator",
    "why.point1.desc": "Wir arbeiten nur mit Creatorn, die wirklich passen.",
    "why.point2.title": "Schnelle Umsetzung",
    "why.point2.desc": "Wir verlieren keine Zeit mit langen Schleifen.",
    "why.point3.title": "Einfache Abläufe",
    "why.point3.desc": "Du weißt jederzeit, was gerade passiert.",
    "why.point4.title": "Persönlicher Kontakt",
    "why.point4.desc": "Du redest immer mit echten Menschen, nicht mit einem Tool.",

    // Final CTA
    "final.title": "Lass uns schauen, ob das zu deiner Marke passt.",
    "final.subtitle": "Schreib uns kurz, was du vorhast. Wir melden uns schnell.",
    "final.cta": "Kontaktiere uns",

    // Process
    "process.title": "Der Vaymo-Prozess",
    "process.subtitle": "So skalieren wir deine Marke.",
    "process.step1.title": "Strategie & Budget",
    "process.step1.desc": "Definition der Ziele und Budget-Planung für maximale Wirkung.",
    "process.step2.title": "Creator Sourcing",
    "process.step2.desc": "Wir filtern die Tech-Nische nach den perfekten Creatoren.",
    "process.step3.title": "Brand Approval",
    "process.step3.desc": "Du entscheidest, welche Creator zu deiner Marke passen.",
    "process.step4.title": "Full-Service Management",
    "process.step4.desc": "Wir regeln Briefings, Kommunikation & Logistik.",
    "process.step5.title": "Quality Check",
    "process.step5.desc": "Umfassende Review vor dem Go-Live für beste Qualität.",
    "process.step6.title": "Data & Payout",
    "process.step6.desc": "Glasklares Reporting & faire Abwicklung für alle.",

    // Roadmap Toggle
    "roadmap.forBrands": "Für Brands",
    "roadmap.forCreator": "Für Creator",

    // Roadmap Creator
    "roadmap.creator.matchmaking.title": "Matchmaking",
    "roadmap.creator.matchmaking.desc":
      "Wir connecten dich nur mit Brands, die wirklich zu deinem Kanal und deinen Werten passen.",
    "roadmap.creator.briefings.title": "Bulletproof Briefings",
    "roadmap.creator.briefings.desc": "Präzise Anforderungen, damit du sofort effizient produzieren kannst.",
    "roadmap.creator.feedback.title": "Express-Feedback",
    "roadmap.creator.feedback.desc": "Wir garantieren schnelle Freigaben, damit dein Content-Plan stabil bleibt.",
    "roadmap.creator.alignment.title": "Brand-Alignment",
    "roadmap.creator.alignment.desc":
      "Gemeinsam stellen wir einen perfekten Brand-Match deines Contents sicher, ohne deine Authentizität zu verwässern.",
    "roadmap.creator.payout.title": "Fast Payout",
    "roadmap.creator.payout.desc": "Wir sorgen für eine zügige und unkomplizierte Auszahlung deiner Gage.",

    // Roadmap Brands
    "roadmap.brand.strategy.title": "Strategie & Budget",
    "roadmap.brand.strategy.desc": "Definition der Ziele und Budget-Planung für maximale Wirkung.",
    "roadmap.brand.sourcing.title": "Creator Sourcing",
    "roadmap.brand.sourcing.desc": "Wir filtern nach den perfekten Creatoren für dein Brand.",
    "roadmap.brand.approval.title": "Brand Approval",
    "roadmap.brand.approval.desc": "Du entscheidest, welche Creator zu deiner Marke passen.",
    "roadmap.brand.management.title": "Full-Service Management",
    "roadmap.brand.management.desc": "Wir regeln Briefings, Kommunikation & Logistik.",
    "roadmap.brand.quality.title": "Quality Check",
    "roadmap.brand.quality.desc": "Umfassende Review vor dem Veröffentlichen für beste Qualität.",
    "roadmap.brand.payout.title": "Data & Payout",
    "roadmap.brand.payout.desc": "Glasklares Reporting & faire Abwicklung für alle.",

    // Roadmap CTA
    "roadmap.cta.text": "Berechne hier, wie viel Zeit du mit Vaymo sparst",
    "roadmap.cta.button": "Zum Effizienz-Rechner",

    // Vaymo Standard Section
    "standard.title": "Der Vaymo-Standard",
    "standard.subtitle": "Von Chaos zu Klarheit – so arbeiten wir.",
    "standard.chaosLabel": "Typische Agency-Anfrage",
    "standard.chaosFrom": "agency@website.com",
    "standard.noTimeline": "Keine Timeline",
    "standard.noSpecs": "Keine Specs",
    "standard.noAssets": "Keine Assets",
    "standard.activateButton": "Struktur aktivieren",
    "standard.resetButton": "Nochmal ansehen",
    "standard.briefingLabel": "Vaymo-Briefing",
    "standard.briefingFrom": "briefing@vaymo-agency.com",
    "standard.subject": "Betreff",
    "standard.clearTimeline": "Klare Timeline",
    "standard.detailedSpecs": "Detaillierte Specs",
    "standard.assetsReady": "Assets bereit",
    "standard.cta": "Wir hassen Chaos. Du auch?",
    "standard.ctaButton": "Schreib uns",

    // Ethics
    "ethics.title": "Ethical Marketing",
    "ethics.subtitle": "Transparenz und Fairness sind unsere Grundwerte.",
    "ethics.transparency.keyword": "Transparenz",
    "ethics.transparency.title": "Volle Transparenz",
    "ethics.transparency.desc":
      "Klare Kommunikation und ehrliche Metriken – keine versteckten Kosten. Wir legen alle Karten offen auf den Tisch.",
    "ethics.authentic.keyword": "Reichweite",
    "ethics.authentic.title": "Echte Reichweite",
    "ethics.authentic.desc":
      "Keine Fake-Follower. Nur authentische Creator mit echtem Engagement. Wir hassen Bots genauso wie du.",
    "ethics.fair.keyword": "Fairness",
    "ethics.fair.title": "Faire Behandlung",
    "ethics.fair.desc":
      "Respektvolle und faire Zusammenarbeit mit allen Creatoren. Langfristiger Erfolg braucht Vertrauen auf Augenhöhe.",



    // Contact
    "contact.title": "Lass uns sprechen",
    "contact.subtitle": "Bereit, deine Marke zu skalieren? Schreib uns!",
    "contact.name": "Name",
    "contact.company": "Unternehmen",
    "contact.email": "E-Mail",
    "contact.message": "Nachricht",
    "contact.submit": "Nachricht senden",
    "contact.success": "Vielen Dank! Wir melden uns in Kürze.",
    "contact.namePlaceholder": "Dein Name",
    "contact.companyPlaceholder": "Dein Unternehmen",
    "contact.emailPlaceholder": "deine@email.de",
    "contact.messagePlaceholder": "Erzähl uns von deinem Projekt...",

    // Footer
    "footer.impressum": "Impressum",
    "footer.privacy": "Datenschutz",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.tagline": "Creator Marketing Agency – wir verbinden Marken mit den richtigen Creatorn.",
    "footer.menu": "Menü",
    "footer.menuTeam": "Team",
    "footer.legal": "Rechtliches",
    "footer.social": "Social Media",

    // Stats
    "stats.title": "Zahlen, die für sich sprechen.",
    "stats.brands.label": "Marken",
    "stats.brands.desc": "Brands, mit denen wir erfolgreiche Kampagnen umgesetzt haben.",
    "stats.reach.label": "Reichweite",
    "stats.reach.desc": "Gesamtreichweite durch aktivierte Creator-Kampagnen.",
    "stats.creators.label": "Creator",
    "stats.creators.desc": "Geprüfte Creator in unserem aktiven Netzwerk.",
    "stats.goal.label": "Ziel",
    "stats.goal.desc": "Dein Erfolg ist unser einziges Ziel – kein Bullshit, keine leeren Versprechen.",

    // Testimonials
    "testimonials.brands.title": "Was Marken über uns sagen.",
    "testimonials.creators.title": "Was Creator über uns sagen.",

    // Cookie Banner
    "cookie.title": "Cookie-Einstellungen",
    "cookie.description": "Wir verwenden Cookies, um dein Erlebnis auf unserer Website zu verbessern.",
    "cookie.learnMore": "Mehr erfahren",
    "cookie.accept": "Akzeptieren",
    "cookie.decline": "Ablehnen",

    // Team
    "team.eyebrow": "Das Team",
    "team.title": "Menschen, die wirklich für deine Marke arbeiten.",
    "team.subtitle": "Kein anonymes Tool. Keine rotierende Agentur. Hinter Vaymo stecken echte Experten, die du kennst.",
    "team.max.name": "Max Weigel",
    "team.max.role": "Founder & CEO",
    "team.max.badge": "CEO",
    "team.max.bio": "Max hat Vaymo gegründet, weil er überzeugt ist: Creator-Marketing funktioniert nur, wenn es ehrlich und direkt ist. Er bringt jahrelange Erfahrung im Aufbau von Marken und Creator-Partnerschaften mit – und ist immer erster Ansprechpartner, wenn es ums Große Ganze geht.",
    "team.abubakr.name": "AbuBakr A.",
    "team.abubakr.role": "Partnership Lead · DACH / Europe / LatAm",
    "team.abubakr.badge": "Partnerships",
    "team.abubakr.bio": "AbuBakr verantwortet Creator-Partnerschaften in DACH, Europa und Latam. Er kennt die Märkte in- und auswendig, spricht die Sprache der Creator und sorgt dafür, dass jede Zusammenarbeit reibungslos läuft.",
    "team.ayoub.name": "Ayoub",
    "team.ayoub.role": "Campaign Manager · DACH / Europe / LatAm",
    "team.ayoub.badge": "Campaigns",
    "team.ayoub.bio": "Ayoub steuert die operative Seite jeder Kampagne – von Briefing bis Livegang. Er hält alle Fäden in der Hand, damit Timings stimmen, Content passt und du als Brand jederzeit weißt, was gerade passiert.",

    // Efficiency Calculator
    "calculator.badge": "Effizienz Rechner",
    "calculator.title": "Visualisiere dein Potenzial",
    "calculator.subtitle": "Wie viel Zeit verlierst du aktuell durch unstrukturierte Prozesse?",
    "calculator.input": "Deine Eingabe",
    "calculator.managementLabel": "Management & Kommunikation (Std./Woche)",
    "calculator.sourcingLabel": "Creator-Sourcing & Suche (Std./Woche)",
    "calculator.projectsLabel": "Aktive Projekte/Creator pro Monat",
    "calculator.theReality": "Die Realität",
    "calculator.hoursPerMonth": "Stunden pro Monat",
    "calculator.realitySubtext": "Zeit, die du mit Bürokratie statt Strategie verbringst.",
    "calculator.withVaymo": "Mit Vaymo",
    "calculator.timeSaved": "Zeitersparnis",
    "calculator.vaymoSubtext": "Wir übernehmen 85 % des Aufwands im Hintergrund.",
    "calculator.ctaText": "Struktur ist kein Luxus, sondern die Basis für Skalierung. Lass uns dein Management automatisieren.",
    "calculator.ctaButton": "Termin vereinbaren",
  },
  en: {
    // Navigation
    "nav.cases": "Cases",
    "nav.process": "Process",
    "nav.services": "Services",
    "nav.ethics": "Ethics",
    "nav.videos": "Videos",
    "nav.contact": "Contact",
    "nav.cta": "Contact Us",

    // Case Studies
    "cases.eyebrow": "Selected work",
    "cases.title": "Campaigns we've activated.",
    "cases.subtitle": "A look at brands we've worked with – from travel to privacy. Swipe through.",
    "cases.ubigi.title": "Travel creators for global eSIM reach.",
    "cases.ubigi.desc": "We activated travel creators who showed Ubigi naturally in real journeys – not as a classic ad.",
    "cases.proton.title": "Privacy, explained without the lecture.",
    "cases.proton.desc": "With tech and lifestyle creators we framed Proton's value in a way that felt honest and clear – no buzzwords.",
    "cases.next.title": "Your brand could be next.",
    "cases.next.desc": "If you want creator marketing that actually sounds like your brand – let's talk.",
    "cases.metric.creators": "Creators",
    "cases.metric.reach": "Reach",
    "cases.metric.engagement": "Engagement",

    // Hero
    "hero.headline": "The right creators for your brand.",
    "hero.subheadline":
      "We find the right creators and run your campaigns —",
    "hero.cta": "Contact Us",
    "hero.secondary": "Learn more",
    "hero.platforms": "Active on",
    "hero.rotate.1": "with creators worldwide",
    "hero.rotate.2": "delivered fast",
    "hero.rotate.3": "on YouTube, Instagram, TikTok & UGC",
    "hero.rotate.4": "with a personal touch",

    // Intro
    "intro.eyebrow": "What matters to us",
    "intro.title": "Real creator marketing should not feel like an ad.",
    "intro.text": "That's why we only work with creators who truly fit your brand. So you get content people actually enjoy.",

    // What We Do
    "services.eyebrow": "What we do",
    "services.title": "Simple, clear, no detours.",
    "services.subtitle": "We take care of everything, so you can focus on your brand.",
    "services.sourcing.title": "Find creators",
    "services.sourcing.desc": "We look for creators who truly fit you. No lists, no mass requests.",
    "services.ugc.title": "Plan the campaign",
    "services.ugc.desc": "We plan the campaign with you. Clear goals, easy steps.",
    "services.campaign.title": "Handle communication",
    "services.campaign.desc": "We talk to the creators. You don't have to chase anyone.",
    "services.analytics.title": "Keep things easy",
    "services.analytics.desc": "You get clear updates. No endless emails, no confusion.",

    // Platforms
    "platforms.eyebrow": "Platforms",
    "platforms.title": "We're where your audience already is.",
    "platforms.youtube.desc": "Longer videos for real attention.",
    "platforms.instagram.desc": "Reels and posts for daily reach.",
    "platforms.tiktok.desc": "Fast content that actually gets seen.",
    "platforms.ugc.desc": "Authentic content for your own channels.",

    // Content Showcase
    "showcase.eyebrow": "Examples",
    "showcase.title": "What real content can look like.",
    "showcase.subtitle": "A small look at how our campaigns can feel.",

    // Why Vaymo
    "why.eyebrow": "Why Vaymo",
    "why.title": "Simple, personal, fast.",
    "why.point1.title": "Selected creators",
    "why.point1.desc": "We only work with creators who really fit.",
    "why.point2.title": "Fast turnaround",
    "why.point2.desc": "We don't waste time on long loops.",
    "why.point3.title": "Easy process",
    "why.point3.desc": "You always know what's going on.",
    "why.point4.title": "Personal contact",
    "why.point4.desc": "You always talk to real people, not a tool.",

    // Final CTA
    "final.title": "Let's see if this fits your brand.",
    "final.subtitle": "Just tell us briefly what you have in mind. We'll get back fast.",
    "final.cta": "Contact Us",

    // Process
    "process.title": "The Vaymo Process",
    "process.subtitle": "How we scale your brand.",
    "process.step1.title": "Strategy & Budget",
    "process.step1.desc": "Define goals and plan budget for maximum impact.",
    "process.step2.title": "Creator Sourcing",
    "process.step2.desc": "We filter the tech niche for the perfect creators.",
    "process.step3.title": "Brand Approval",
    "process.step3.desc": "You decide which creators fit your brand.",
    "process.step4.title": "Full-Service Management",
    "process.step4.desc": "We handle briefings, communication & logistics.",
    "process.step5.title": "Quality Check",
    "process.step5.desc": "Comprehensive review before go-live for best quality.",
    "process.step6.title": "Data & Payout",
    "process.step6.desc": "Crystal-clear reporting & fair processing for everyone.",

    // Roadmap Toggle
    "roadmap.forBrands": "For Brands",
    "roadmap.forCreator": "For Creators",

    // Roadmap Creator
    "roadmap.creator.matchmaking.title": "Matchmaking",
    "roadmap.creator.matchmaking.desc": "We only connect you with brands that truly fit your channel and values.",
    "roadmap.creator.briefings.title": "Bulletproof Briefings",
    "roadmap.creator.briefings.desc": "Precise requirements so you can produce efficiently right away.",
    "roadmap.creator.feedback.title": "Express Feedback",
    "roadmap.creator.feedback.desc": "We guarantee fast approvals to keep your content schedule on track.",
    "roadmap.creator.alignment.title": "Brand Alignment",
    "roadmap.creator.alignment.desc":
      "Together we ensure your content perfectly matches the brand without diluting your authenticity.",
    "roadmap.creator.payout.title": "Fast Payout",
    "roadmap.creator.payout.desc": "We ensure quick and hassle-free payment of your fee.",

    // Roadmap Brands
    "roadmap.brand.strategy.title": "Strategy & Budget",
    "roadmap.brand.strategy.desc": "Define goals and plan budget for maximum impact.",
    "roadmap.brand.sourcing.title": "Creator Sourcing",
    "roadmap.brand.sourcing.desc": "We filter for the perfect creators for your brand.",
    "roadmap.brand.approval.title": "Brand Approval",
    "roadmap.brand.approval.desc": "You decide which creators fit your brand.",
    "roadmap.brand.management.title": "Full-Service Management",
    "roadmap.brand.management.desc": "We handle briefings, communication & logistics.",
    "roadmap.brand.quality.title": "Quality Check",
    "roadmap.brand.quality.desc": "In-depth quality review prior to every publication.",
    "roadmap.brand.payout.title": "Data & Payout",
    "roadmap.brand.payout.desc": "Crystal-clear reporting & fair processing for everyone.",

    // Roadmap CTA
    "roadmap.cta.text": "Calculate how much time you save with Vaymo",
    "roadmap.cta.button": "Open Efficiency Calculator",

    // Vaymo Standard Section
    "standard.title": "The Vaymo Standard",
    "standard.subtitle": "From chaos to clarity – this is how we work.",
    "standard.chaosLabel": "Typical Agency Request",
    "standard.chaosFrom": "agency@website.com",
    "standard.noTimeline": "No Timeline",
    "standard.noSpecs": "No Specs",
    "standard.noAssets": "No Assets",
    "standard.activateButton": "Activate Structure",
    "standard.resetButton": "Watch again",
    "standard.briefingLabel": "Vaymo Briefing",
    "standard.briefingFrom": "briefing@vaymo-agency.com",
    "standard.subject": "Subject",
    "standard.clearTimeline": "Clear Timeline",
    "standard.detailedSpecs": "Detailed Specs",
    "standard.assetsReady": "Assets Ready",
    "standard.cta": "We hate chaos. Do you?",
    "standard.ctaButton": "Get in touch",

    // Ethics
    "ethics.title": "Ethical Marketing",
    "ethics.subtitle": "Transparency and fairness are our core values.",
    "ethics.transparency.keyword": "Transparency",
    "ethics.transparency.title": "Full Transparency",
    "ethics.transparency.desc":
      "Clear communication and honest metrics – no hidden costs. We put all our cards on the table.",
    "ethics.authentic.keyword": "Reach",
    "ethics.authentic.title": "Real Reach",
    "ethics.authentic.desc":
      "No fake followers. Only authentic creators with real engagement. We hate bots as much as you do.",
    "ethics.fair.keyword": "Fairness",
    "ethics.fair.title": "Fair Treatment",
    "ethics.fair.desc":
      "Respectful and fair collaboration with all creators. Long-term success requires trust as equals.",



    // Contact
    "contact.title": "Let's Talk",
    "contact.subtitle": "Ready to scale your brand? Get in touch!",
    "contact.name": "Name",
    "contact.company": "Company",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Send Message",
    "contact.success": "Thank you! We'll be in touch shortly.",
    "contact.namePlaceholder": "Your name",
    "contact.companyPlaceholder": "Your company",
    "contact.emailPlaceholder": "your@email.com",
    "contact.messagePlaceholder": "Tell us about your project...",

    // Footer
    "footer.impressum": "Legal Notice",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "All rights reserved.",
    "footer.tagline": "Creator Marketing Agency – connecting brands with the right creators.",
    "footer.menu": "Menu",
    "footer.menuTeam": "Team",
    "footer.legal": "Legal",
    "footer.social": "Social Media",

    // Stats
    "stats.title": "Numbers that speak for themselves.",
    "stats.brands.label": "Brands",
    "stats.brands.desc": "Brands we've run successful campaigns for.",
    "stats.reach.label": "Reach",
    "stats.reach.desc": "Total reach generated through activated creator campaigns.",
    "stats.creators.label": "Creators",
    "stats.creators.desc": "Vetted creators in our active network.",
    "stats.goal.label": "Goal",
    "stats.goal.desc": "Your success is our only goal — no fluff, no empty promises.",

    // Testimonials
    "testimonials.brands.title": "What brands say about us.",
    "testimonials.creators.title": "What creators say about us.",

    // Cookie Banner
    "cookie.title": "Cookie Settings",
    "cookie.description": "We use cookies to enhance your experience on our website.",
    "cookie.learnMore": "Learn more",
    "cookie.accept": "Accept",
    "cookie.decline": "Decline",

    // Team
    "team.eyebrow": "The Team",
    "team.title": "People who genuinely work for your brand.",
    "team.subtitle": "No anonymous tool. No rotating agency. Behind Vaymo are real experts you actually know.",
    "team.max.name": "Max Weigel",
    "team.max.role": "Founder & CEO",
    "team.max.badge": "CEO",
    "team.max.bio": "Max founded Vaymo because he believes creator marketing only works when it's honest and direct. He brings years of experience in brand building and creator partnerships — and is always the first point of contact for the big picture.",
    "team.abubakr.name": "AbuBakr A.",
    "team.abubakr.role": "Partnership Lead · DACH / Europe / LatAm",
    "team.abubakr.badge": "Partnerships",
    "team.abubakr.bio": "AbuBakr handles creator partnerships across DACH, Europe, and LatAm. He knows the markets inside out, speaks the language of creators, and makes sure every collaboration runs smoothly.",
    "team.ayoub.name": "Ayoub",
    "team.ayoub.role": "Campaign Manager · DACH / Europe / LatAm",
    "team.ayoub.badge": "Campaigns",
    "team.ayoub.bio": "Ayoub manages the operational side of every campaign — from briefing to go-live. He keeps all the threads in hand so timelines hold, content fits, and you always know what's happening.",

    // Efficiency Calculator
    "calculator.badge": "Efficiency Calculator",
    "calculator.title": "Visualize Your Potential",
    "calculator.subtitle": "How much time are you currently losing due to unstructured processes?",
    "calculator.input": "Your Input",
    "calculator.managementLabel": "Management & Communication (hrs/week)",
    "calculator.sourcingLabel": "Creator Sourcing & Search (hrs/week)",
    "calculator.projectsLabel": "Active Projects/Creators per Month",
    "calculator.theReality": "The Reality",
    "calculator.hoursPerMonth": "Hours per month",
    "calculator.realitySubtext": "Time spent on bureaucracy instead of strategy.",
    "calculator.withVaymo": "With Vaymo",
    "calculator.timeSaved": "Time Saved",
    "calculator.vaymoSubtext": "We handle 85% of the workload behind the scenes.",
    "calculator.ctaText": "Structure isn't a luxury – it's the foundation for scaling. Let us automate your management.",
    "calculator.ctaButton": "Schedule a Call",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("de");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
