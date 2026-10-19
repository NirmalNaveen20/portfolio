"use client";

import {usePathname} from "next/navigation";
import type {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** The new homepage owns its navigation; existing content pages keep their layout. */
export default function SiteShell({children}: {children: ReactNode}) {
    const pathname = usePathname();
    if (pathname === "/") return <>{children}</>;

    return <>
        <div aria-hidden="true" className="fixed inset-0 -z-10 bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#3f3f46_1px,_transparent_1px)] bg-[length:30px_30px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"/>
        <Header/>
        <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
        <Footer/>
    </>;
}
