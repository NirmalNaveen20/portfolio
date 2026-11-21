import type {Metadata} from "next";
import "./globals.css";
import "./portfolio-theme.css";
import {Gabarito} from "next/font/google";
import React, {ReactNode} from "react";
import SiteShell from "@/components/SiteShell";
import {siteDescription, siteName, siteOpenGraph, siteOrigin, siteShareImage, siteTitle} from "@/lib/site";

const gabarito = Gabarito({
    variable: "--font-gabarito",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: siteName,
    description: siteDescription,
    icons: {
        icon: {url: '/icons/favicon-96x96.png', type: 'image/png', sizes: '96x96'},
        apple: {url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
    },
    metadataBase: new URL(siteOrigin),
    openGraph: siteOpenGraph,
    twitter: {
        card: 'summary_large_image',
        title: siteTitle,
        description: siteDescription,
        images: [siteShareImage],
    }
}

// This script initializes the theme based on user preference or saved settings
// And is used to avoid FOUC (Flash of Unstyled Content) on the initial load
const themeInitScript = `
(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.classList.add(theme);

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
