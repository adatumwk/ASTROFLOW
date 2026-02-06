"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HoroscopeCard from './HoroscopeCard';

const ZODIAC_ICONS: Record<number, { emoji: string; color: string }> = {
    1: { emoji: '♌', color: 'text-orange-500' },
    2: { emoji: '♍', color: 'text-emerald-500' },
    3: { emoji: '♈', color: 'text-red-500' },
    4: { emoji: '♏', color: 'text-red-700' },
    5: { emoji: '♉', color: 'text-green-600' },
    6: { emoji: '♎', color: 'text-indigo-400' },
    7: { emoji: '♊', color: 'text-yellow-400' },
    8: { emoji: '♋', color: 'text-pink-400' },
    9: { emoji: '♑', color: 'text-stone-400' },
    10: { emoji: '♒', color: 'text-cyan-400' },
    11: { emoji: '♓', color: 'text-cyan-600' },
    12: { emoji: '♐', color: 'text-purple-500' }
};

const ZODIAC_NAMES: Record<string, Record<number, string>> = {
    ru: { 1: 'Лев', 2: 'Дева', 3: 'Овен', 4: 'Скорпион', 5: 'Телец', 6: 'Весы', 7: 'Близнецы', 8: 'Рак', 9: 'Козерог', 10: 'Водолей', 11: 'Рыбы', 12: 'Стрелец' },
    en: { 1: 'Leo', 2: 'Virgo', 3: 'Aries', 4: 'Scorpio', 5: 'Taurus', 6: 'Libra', 7: 'Gemini', 8: 'Cancer', 9: 'Capricorn', 10: 'Aquarius', 11: 'Pisces', 12: 'Sagittarius' },
    de: { 1: 'Löwe', 2: 'Jungfrau', 3: 'Widder', 4: 'Skorpion', 5: 'Stier', 6: 'Waage', 7: 'Zwillinge', 8: 'Krebs', 9: 'Steinbock', 10: 'Wassermann', 11: 'Fische', 12: 'Schütze' },
    fr: { 1: 'Lion', 2: 'Vierge', 3: 'Bélier', 4: 'Scorpion', 5: 'Taureau', 6: 'Balance', 7: 'Gémeaux', 8: 'Cancer', 9: 'Capricorne', 10: 'Verseau', 11: 'Poissons', 12: 'Sagittaire' },
    es: { 1: 'Leo', 2: 'Virgo', 3: 'Aries', 4: 'Escorpio', 5: 'Tauro', 6: 'Libra', 7: 'Géminis', 8: 'Cáncer', 9: 'Capricornio', 10: 'Acuario', 11: 'Piscis', 12: 'Sagitario' },
};

const PROMPT_TEXT: Record<string, string> = {
    en: "Select your zodiac sign above ✨",
    ru: "Выберите ваш знак зодиака выше ✨",
    de: "Wählen Sie oben Ihr Sternzeichen ✨",
    fr: "Sélectionnez votre signe du zodiaque ci-dessus ✨",
    es: "Selecciona tu signo del zodiaco arriba ✨"
};

const SWIPE_HINT: Record<string, string> = {
    en: "← Swipe to explore →",
    ru: "← Листайте →",
    de: "← Wischen →",
    fr: "← Balayez →",
    es: "← Desliza →"
};

export default function HoroscopeDashboard({ horoscopes, lang = 'en' }: { horoscopes: any[]; lang?: string }) {
    const [selectedSignId, setSelectedSignId] = useState<number | null>(null);

    const activeHoroscope = selectedSignId
        ? horoscopes.find(h => h.sign_id === selectedSignId)
        : null;

    const names = ZODIAC_NAMES[lang] || ZODIAC_NAMES['en'];
    const prompt = PROMPT_TEXT[lang] || PROMPT_TEXT['en'];
    const swipeHint = SWIPE_HINT[lang] || SWIPE_HINT['en'];

    // Ordered IDs for menu display (Aries first usually, but kept consistent with previous list if needed)
    // Previous list was random. Let's use standard order: Aries(3), Taurus(5), Gemini(7), Cancer(8), Leo(1), Virgo(2), Libra(6), Scorpio(4), Sagittarius(12), Capricorn(9), Aquarius(10), Pisces(11)
    const orderedIds = [3, 5, 7, 8, 1, 2, 6, 4, 12, 9, 10, 11];

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 md:space-y-12">
            {/* Swipe Hint (Mobile Only) */}
            <div className="md:hidden text-center -mb-4 animate-pulse">
                <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">{swipeHint}</p>
            </div>

            {/* Navigation Menu - Responsive: Horizontal Scroll (Mobile) / 6x2 Grid (Desktop) */}
            <motion.div
                className="
                    flex overflow-x-auto snap-x py-4 px-2 space-x-3 
                    md:grid md:grid-cols-6 md:gap-4 md:space-x-0 md:overflow-visible md:p-6
                    bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-sm
                    scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]
                "
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {orderedIds.map((id) => {
                    const icon = ZODIAC_ICONS[id];
                    const name = names[id];
                    return (
                        <button
                            key={id}
                            onClick={() => setSelectedSignId(id)}
                            aria-label={`Select ${name} horoscope`}
                            className={`
                                flex-shrink-0 snap-center
                                relative group w-20 h-20 md:w-auto md:h-auto p-2 md:p-4 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center
                                ${selectedSignId === id
                                    ? 'bg-white/10 scale-105 ring-1 ring-white/20 shadow-lg shadow-purple-500/10'
                                    : 'hover:bg-white/5 hover:scale-105'
                                }
                            `}
                        >
                            <div className={`text-3xl md:text-4xl mb-1 filter drop-shadow-md ${icon.color}`}>
                                {icon.emoji}
                            </div>

                            <div className={`
                                text-[10px] uppercase font-bold tracking-widest transition-colors
                                ${selectedSignId === id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}
                            `}>
                                {name}
                            </div>

                            {selectedSignId === id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 border border-white/10 rounded-2xl -z-10 bg-gradient-to-b from-white/5 to-transparent"
                                />
                            )}
                        </button>
                    );
                })}
            </motion.div>

            {/* Content Area */}
            <div className="min-h-[500px] flex items-start justify-center">
                <AnimatePresence mode="wait">
                    {activeHoroscope ? (
                        <motion.div
                            key={activeHoroscope.sign_id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="w-full max-w-md"
                        >
                            <HoroscopeCard data={activeHoroscope} lang={lang} />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-zinc-500 mt-2"
                        >
                            <p className="text-xl font-light">{prompt}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
