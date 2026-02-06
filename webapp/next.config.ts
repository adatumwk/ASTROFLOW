import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    // Disable image optimization for static export
    images: {
        unoptimized: true,
    },
    // Security Headers (Applied via meta tags or server config in real deployment, 
    // but for static export these aren't generated in the same way, keeping for ref)

    // GitHub Pages Base Path (REPO NAME)
    basePath: process.env.NODE_ENV === 'production' ? '/ASTROFLOW' : '',
};

export default nextConfig;
