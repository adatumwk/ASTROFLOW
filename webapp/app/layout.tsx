import type { Metadata } from "next";
import Script from "next/script";
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
    metadataBase: new URL('https://astroflow.online'),
    title: {
        template: '%s | AstroFlow',
        default: 'AstroFlow - Daily Horoscope & Energy',
    },
    description: "Get your accurate and personal daily horoscope. Discover your energy of the day and align with the stars.",
    keywords: ["horoscope", "daily horoscope", "astrology", "zodiac", "energy", "astroflow", "gemini", "tarot"],
    authors: [{ name: "AstroFlow" }],
    creator: "AstroFlow",
    publisher: "AstroFlow",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: '/',
    },
    manifest: '/manifest.json', // PWA Manifest
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://astroflow.online',
        title: 'AstroFlow - Your Daily Cosmic Guide',
        description: 'Discover what the stars have in store for you today.',
        siteName: 'AstroFlow',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'AstroFlow Cosmic Guide',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AstroFlow - Your Daily Cosmic Guide',
        description: 'Discover what the stars have in store for you today.',
        images: ['/og-image.png'],
    },
    icons: {
        icon: '/icon.png',
        apple: '/icon.png',
    },
    other: {
        "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagmanager.com https://mc.yandex.ru; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https: https://www.google-analytics.com https://mc.yandex.ru; font-src 'self' data:; connect-src 'self' https: https://www.google-analytics.com https://analytics.google.com https://mc.yandex.ru; frame-src 'self' https:;",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AstroFlow',
        url: 'https://astroflow.online',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://astroflow.online/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    };

    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-white`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Script
                    id="adsbygoogle-init"
                    strategy="afterInteractive"
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1806076570283556"
                    crossOrigin="anonymous"
                />
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-BBYD35VZH9"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-BBYD35VZH9');
                    `}
                </Script>
                <Script id="yandex-metrika" strategy="afterInteractive">
                    {`
                    (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106687500', 'ym');

                    ym(106687500, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
                    `}
                </Script>
                <noscript><div><img src="https://mc.yandex.ru/watch/106687500" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>
                {children}
            </body>
        </html>
    );
}
