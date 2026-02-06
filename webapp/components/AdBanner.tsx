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

    return (
        <div className={`hidden ${className}`} aria-hidden="true">
            {/* Placeholder for Ad Unit {slotId} */}
        </div>
    );
}
