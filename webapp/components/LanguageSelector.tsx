"use client";

import React from 'react';
import { motion } from 'framer-motion';

const LANGUAGES = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'de', label: 'DE', flag: '🇩🇪' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
];

interface LanguageSelectorProps {
    currentLang: string;
    onChange: (lang: string) => void;
}

export default function LanguageSelector({ currentLang, onChange }: LanguageSelectorProps) {
    return (
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full p-1.5 border border-white/10">
            {LANGUAGES.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => onChange(lang.code)}
                    className={`
                        relative px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300
                        ${currentLang === lang.code
                            ? 'text-black'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }
                    `}
                >
                    {currentLang === lang.code && (
                        <motion.div
                            layoutId="active-lang"
                            className="absolute inset-0 bg-white rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="flex items-center gap-1.5">
                        {lang.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
