import React from 'react';
import { getDailyHoroscopes, getGlobalEnergy } from '@/lib/db';
import StarsCanvas from '@/components/ui/StarBackground';
import MainContent from '@/components/MainContent';

export const revalidate = 3600;

export default async function Home() {
    const [horoscopes, energy] = await Promise.all([
        getDailyHoroscopes(),
        getGlobalEnergy()
    ]);

    return (
        <main className="min-h-screen bg-black text-white relative selection:bg-purple-500/30 overflow-hidden">
            <StarsCanvas />
            <MainContent initialHoroscopes={horoscopes} initialEnergy={energy} />
        </main>
    );
}
