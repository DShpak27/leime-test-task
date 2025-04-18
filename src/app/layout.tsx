import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "House Of Memes",
    description: "A directory of popular memes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Navbar />
                    <main className="container mx-auto p-4">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
