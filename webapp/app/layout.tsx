import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: '%s | AstroFlow',
        default: 'AstroFlow - Daily Horoscope & Energy',
    },
    description: "Get your accurate and personal daily horoscope. Discover your energy of the day and align with the stars.",
    keywords: ["horoscope", "daily horoscope", "astrology", "zodiac", "energy", "astroflow", "gemini", "tarot"],
    authors: [{ name: "AstroFlow" }],
    creator: "AstroFlow",
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://astroflow.app',
        title: 'AstroFlow - Your Daily Cosmic Guide',
        description: 'Discover what the stars have in store for you today.',
        siteName: 'AstroFlow',
    },
    other: {
        "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:; connect-src 'self';",
    },

};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-white`}
            >
                {children}
            </body>
        </html>
    );
}
