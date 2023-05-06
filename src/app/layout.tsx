import './globals.css'
import {Vollkorn} from 'next/font/google'
import {ReactNode} from "react";
import Link from "next/link";
import Footer from "@/app/footer";
import Head from "next/head";
import SearchBar from "@/app/search-bar";

const font = Vollkorn({subsets: ['latin', 'latin-ext']})

export const metadata = {
    title: 'House of Commons Divisions',
    description: 'House of Commons Divisions vote results. Created by Order & Chaos',
}

export default function RootLayout({
   children,
}: { children: ReactNode }) {
    return (
        <html lang="en">
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#39393D"/>
            <meta name="msapplication-TileColor" content="#39393d"/>
            <meta name="theme-color" content="#39393d"/>
        </Head>
        <body className={font.className}>
        <div className="px-16 pt-8 pb-32">
            <div className='flex mb-16'>
                <Link href='/'>
                    <h1>House of Commons Divisions</h1>
                </Link>
                <div className='ml-auto'>
                    <SearchBar/>
                </div>
            </div>
            {children}
            <Footer/>
        </div>
        </body>
        </html>
    )
}
