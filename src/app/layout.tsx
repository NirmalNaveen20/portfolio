import type {Metadata} from "next";
import "./globals.css";
import {Gabarito} from "next/font/google";
import React, {ReactNode} from "react";
import SiteShell from "@/components/SiteShell";

const gabarito = Gabarito({
    variable: "--font-gabarito",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: 'Nirmal Chandrasiri',
    description: 'Passionate about cloud automation, observability, and systems engineering with a focus on streamlining developer workflows using DevOps methodologies.',
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/icons/favicon.ico',
    },
    metadataBase: new URL('https://www.nirmalchandrasiri.com'),
    openGraph: {
        title: 'Nirmal Chandrasiri',
        description: 'Passionate about cloud automation, observability, and systems engineering with a focus on streamlining developer workflows using DevOps methodologies.',
        url: 'https://www.nirmalchandrasiri.com',
        siteName: 'Nirmal Chandrasiri',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Nirmal Chandrasiri'
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nirmal Chandrasiri',
        description: 'Passionate about cloud automation, observability, and systems engineering with a focus on streamlining developer workflows using DevOps methodologies.',
        images: ['/og-image.png']
    }
}

// This script initializes the theme based on user preference or saved settings
// And is used to avoid FOUC (Flash of Unstyled Content) on the initial load
const themeInitScript = `
(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();`

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en" className={`${gabarito.className} ${gabarito.variable}`} suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{__html: themeInitScript}}/>
        </head>
        <body
            className={`antialiased flex flex-col min-h-screen transition-colors ${gabarito.className} ${gabarito.variable}`}
        >
        <SiteShell>{children}</SiteShell>
        </body>
        </html>
    )
}
