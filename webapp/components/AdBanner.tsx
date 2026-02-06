"use client";

import React from 'react';

interface AdBannerProps {
    className?: string;
    slotId?: string; // Google AdSense Data Slot ID
}

export default function AdBanner({ className, slotId }: AdBannerProps) {
    // Currently invisible (returns null). 
    // To enable, remove the return null and configure the AdSense script.

    // Example of future implementation:
    /*
    return (
        <div className={`w-full h-[90px] bg-white/5 flex items-center justify-center text-zinc-600 text-xs border border-white/5 rounded-xl overflow-hidden ${className}`}>
             <p>Рекламный блок (Google AdSense)</p>
             {/* <ins className="adsbygoogle" ... /> }
        </div>
    );
    */

    return null; // Hidden for production (Auto Ads will handle placement)

    /* Visual Placeholder (for reference)
    return (
        <div className={`w-full max-w-5xl mx-auto h-[100px] bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-zinc-600 space-y-2 overflow-hidden ${className}`}>
            <p className="text-xs font-mono uppercase tracking-widest">Реклама</p>
            <p className="text-[10px] opacity-50">{slotId || 'Google AdSense'}</p>
        </div>
    );
    */
}
