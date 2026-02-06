"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Flame, Globe, Sparkles } from 'lucide-react';

interface EnergyProps {
    data: {
        title: string;
        description: string;
        planet: string;
        element: string;
        color: string;
        intensity: number;
    }
}

export default function EnergyWidget({ data }: EnergyProps) {
    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mb-16 relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-purple-500/10 blur-xl opacity-50 rounded-3xl" />

            <div className="relative glass-card border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">



                {/* Text Content */}
                <div className="flex-1 text-center md:text-left space-y-3">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-purple-300 uppercase tracking-widest">
                            {data.title}
                        </h2>
                    </div>
                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl font-light">
                        {data.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <Globe className="w-3 h-3" /> {data.planet}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <Flame className="w-3 h-3" /> {data.element}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
