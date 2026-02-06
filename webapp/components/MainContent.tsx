"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HoroscopeDashboard from '@/components/HoroscopeDashboard';
import EnergyWidget from '@/components/EnergyWidget';
import AdBanner from '@/components/AdBanner';
import LanguageSelector from '@/components/LanguageSelector';

const TEXTS = {
    en: { title: "ASTRO FLOW", subtitle: "Your Personal Cosmic Navigator", footer: "© 2025 Adson™. All rights reserved" },
    ru: { title: "ASTRO FLOW", subtitle: "Ваш персональный космический навигатор", footer: "© 2025 Adson™. All rights reserved" },
    de: { title: "ASTRO FLOW", subtitle: "Ihr persönlicher kosmischer Navigator", footer: "© 2025 Adson™. All rights reserved" },
    fr: { title: "ASTRO FLOW", subtitle: "Votre Navigateur Cosmique Personnel", footer: "© 2025 Adson™. All rights reserved" },
    es: { title: "ASTRO FLOW", subtitle: "Su Navegador Cósmico Personal", footer: "© 2025 Adson™. All rights reserved" },
};

const TODAY_LABELS: Record<string, string> = {
    en: "Today",
    ru: "Сегодня",
    de: "Heute",
    fr: "Aujourd'hui",
    es: "Hoy"
};

const SEO_TEXTS: Record<string, { title: string; desc: string }> = {
    en: {
        title: "AstroFlow - Daily Horoscope & Energy",
        desc: "Get your accurate and personal daily horoscope. Discover your energy of the day and align with the stars."
    },
    ru: {
        title: "AstroFlow - Ваш точный гороскоп",
        desc: "Точный гороскоп на сегодня. Узнайте свою судьбу и энергию дня."
    },
    de: {
        title: "AstroFlow - Ihr tägliches Horoskop",
        desc: "Sicheres und persönliches Tageshoroskop. Entdecken Sie Ihre Tagesenergie."
    },
    fr: {
        title: "AstroFlow - Horoscope Quotidien",
        desc: "Votre horoscope quotidien précis et personnel. Découvrez votre énergie du jour."
    },
    es: {
        title: "AstroFlow - Horóscopo Diario",
        desc: "Tu horóscopo diario preciso y personal. Descubre tu energía del día."
    }
};

interface MainContentProps {
    initialHoroscopes: Record<string, any[]>;
    initialEnergy: Record<string, any>;
}

export default function MainContent({ initialHoroscopes, initialEnergy }: MainContentProps) {
    const [lang, setLang] = useState('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Try to detect user language from browser
        const browserLang = navigator.language.split('-')[0];
        if (['ru', 'de', 'fr', 'es'].includes(browserLang)) {
            setLang(browserLang);
        }
    }, []);

    // Update Page Title & Description on Language Change (SEO)
    useEffect(() => {
        const seo = SEO_TEXTS[lang as keyof typeof SEO_TEXTS] || SEO_TEXTS['en'];
        document.title = seo.title;

        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', seo.desc);
    }, [lang]);

    const horoscopes = initialHoroscopes[lang] || initialHoroscopes['en'] || [];
    const energy = initialEnergy[lang] || initialEnergy['en'];
    const t = TEXTS[lang as keyof typeof TEXTS] || TEXTS['en'];

    const todayLabel = TODAY_LABELS[lang] || TODAY_LABELS['en'];
    // Capitalize first letter of the month/date if needed (some locales like ru might need it, though standard format is usually fine)
    const formattedDate = new Date().toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });

    if (!mounted) return null; // Prevent hydration mismatch

    return (
        <div className="relative z-10 p-6 md:p-12 w-full max-w-7xl mx-auto">
            <header className="mb-12 text-center space-y-6 flex flex-col items-center">
                <LanguageSelector currentLang={lang} onChange={setLang} />

                <div className="space-y-4">
                    <div className="inline-block relative">
                        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white text-transparent bg-clip-text tracking-tighter cursor-default">
                            {t.title}
                        </h1>
                        <div className="absolute -inset-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-15 blur-3xl rounded-full -z-10" />
                    </div>
                    <p className="text-zinc-400 text-sm md:text-base font-light tracking-widest uppercase">
                        {t.subtitle}
                    </p>
                    <div className="pt-2 animate-fade-in">
                        <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-zinc-500 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                            {todayLabel} <span className="text-zinc-700 mx-2">|</span> {formattedDate}
                        </span>
                    </div>
                </div>
            </header>

            {/* Ad Placeholder Top */}
            <AdBanner className="mb-8" slotId="top-banner" />

            {/* Energy Widget */}
            <EnergyWidget data={energy} />

            {/* Horoscope Dashboard */}
            <HoroscopeDashboard horoscopes={horoscopes} lang={lang} />

            {/* Ad Placeholder Bottom */}
            <AdBanner className="mt-16" slotId="bottom-banner" />

            <footer className="mt-20 text-center border-t border-white/5 pt-8">
                <p className="text-zinc-700 text-xs tracking-wider opacity-50">
                    {t.footer}
                </p>
            </footer>
        </div>
    );
}
