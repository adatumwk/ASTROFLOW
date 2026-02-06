"use client";

import React from 'react';
import { Star, Heart, Briefcase, Moon, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ZODIAC_NAMES: Record<string, Record<number, string>> = {
    ru: { 1: 'Лев', 2: 'Дева', 3: 'Овен', 4: 'Скорпион', 5: 'Телец', 6: 'Весы', 7: 'Близнецы', 8: 'Рак', 9: 'Козерог', 10: 'Водолей', 11: 'Рыбы', 12: 'Стрелец' },
    en: { 1: 'Leo', 2: 'Virgo', 3: 'Aries', 4: 'Scorpio', 5: 'Taurus', 6: 'Libra', 7: 'Gemini', 8: 'Cancer', 9: 'Capricorn', 10: 'Aquarius', 11: 'Pisces', 12: 'Sagittarius' },
    de: { 1: 'Löwe', 2: 'Jungfrau', 3: 'Widder', 4: 'Skorpion', 5: 'Stier', 6: 'Waage', 7: 'Zwillinge', 8: 'Krebs', 9: 'Steinbock', 10: 'Wassermann', 11: 'Fische', 12: 'Schütze' },
    fr: { 1: 'Lion', 2: 'Vierge', 3: 'Bélier', 4: 'Scorpion', 5: 'Taureau', 6: 'Balance', 7: 'Gémeaux', 8: 'Cancer', 9: 'Capricorne', 10: 'Verseau', 11: 'Poissons', 12: 'Sagittaire' },
    es: { 1: 'Leo', 2: 'Virgo', 3: 'Aries', 4: 'Escorpio', 5: 'Tauro', 6: 'Libra', 7: 'Géminis', 8: 'Cáncer', 9: 'Capricornio', 10: 'Acuario', 11: 'Piscis', 12: 'Sagitario' },
};

const SIGNS_DATA: Record<number, { emoji: string; color: string }> = {
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



const LABELS: Record<string, { love: string; business: string; color: string; numbers: string; mood: string }> = {
    en: { love: 'Love', business: 'Business', color: 'Color', numbers: 'Numbers', mood: 'Mood' },
    ru: { love: 'Любовь', business: 'Бизнес', color: 'Цвет', numbers: 'Числа', mood: 'Настроение' },
    de: { love: 'Liebe', business: 'Gewerbe', color: 'Farbe', numbers: 'Zahlen', mood: 'Stimmung' },
    fr: { love: 'Amour', business: 'Affaires', color: 'Couleur', numbers: 'Nombres', mood: 'Humeur' },
    es: { love: 'Amor', business: 'Negocios', color: 'Color', numbers: 'Números', mood: 'Ánimo' },
};

const CTA_BUTTON: Record<string, string> = {
    en: "Get personal forecast for free",
    ru: "Получить персональный прогноз бесплатно",
    de: "Persönliche Prognose kostenlos erhalten",
    fr: "Obtenir des prévisions personnelles gratuitement",
    es: "Obtener pronóstico personal gratis"
};

interface HoroscopeProps {
    data: any;
    lang?: string;
}

const RatingStars = ({ rating, colorClass }: { rating: number, colorClass: string }) => {
    return (
        <div className="flex space-x-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className={`w-3 h-3 ${s <= rating ? `fill-current ${colorClass}` : 'text-zinc-800'}`}
                />
            ))}
        </div>
    );
}

export default function HoroscopeCard({ data, lang = 'en' }: HoroscopeProps) {
    const signsNames = ZODIAC_NAMES[lang] || ZODIAC_NAMES['en'];
    const signData = SIGNS_DATA[data.sign_id] || { emoji: '⭐', color: 'text-gray-400' };
    const signName = signsNames[data.sign_id] || 'Sign';
    const labels = LABELS[lang] || LABELS['en'];
    const ctaText = CTA_BUTTON[lang] || CTA_BUTTON['en'];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass-card relative overflow-hidden group p-5 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`text-4xl drop-shadow-lg ${signData.color}`}>{signData.emoji}</div>
                        <div>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide">{signName}</h2>
                            <span className="text-[10px] text-zinc-500 font-mono tracking-widest">{new Date(data.date).toLocaleDateString(lang)}</span>
                        </div>
                    </div>
                </div>

                {/* General Text (Full) */}
                <motion.div layout className="mb-4">
                    <p className="text-sm text-zinc-300 leading-relaxed font-light border-l-2 border-purple-500/20 pl-4">
                        {data.general_text}
                    </p>
                </motion.div>

                {/* Always Expanded Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-1 gap-3 mb-4">


                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-start gap-2 h-full">
                            <div className="flex items-center gap-1.5 text-pink-300 text-xs font-bold uppercase tracking-wider mb-2">
                                <Heart className="w-3.5 h-3.5" /> {labels.love}
                            </div>
                            <div className="w-full h-px bg-white/5" />
                            <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                                {data.love_text?.trim()}
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-start gap-2 h-full">
                            <div className="flex items-center gap-1.5 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                                <Briefcase className="w-3.5 h-3.5" /> {labels.business}
                            </div>
                            <div className="w-full h-px bg-white/5" />
                            <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                                {data.business_text?.trim()}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-4 flex items-center justify-between text-xs">
                        {data.lucky_color && (
                            <div className="flex flex-col items-center gap-1 flex-1 border-r border-white/10 last:border-0">
                                <span className="text-zinc-500 uppercase text-[10px] tracking-widest">{labels.color}</span>
                                <span className="font-bold text-white">{data.lucky_color}</span>
                            </div>
                        )}
                        {data.lucky_numbers && (
                            <div className="flex flex-col items-center gap-1 flex-1 border-r border-white/10 last:border-0">
                                <span className="text-zinc-500 uppercase text-[10px] tracking-widest">{labels.numbers}</span>
                                <span className="font-bold text-white tracking-widest">{data.lucky_numbers.join(', ')}</span>
                            </div>
                        )}
                        {data.mood_word && (
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <span className="text-zinc-500 uppercase text-[10px] tracking-widest">{labels.mood}</span>
                                <span className="font-bold text-purple-300">{data.mood_word}</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center gap-2 mb-6">
                        <Moon className="w-3 h-3 text-indigo-400" />
                        <p className="text-xs text-indigo-200/70 italic flex-1">{data.lunar_text}</p>
                        <Sparkles className="w-3 h-3 text-yellow-500/50 animate-pulse" />
                    </div>

                    {/* Telegram CTA Button */}
                    <a
                        href="https://t.me/AstrologyScienceBot"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl text-center shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        {ctaText}
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
}
