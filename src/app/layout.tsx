import './globals.css'
import {Vollkorn} from 'next/font/google'
import {ReactNode} from "react";
import Link from "next/link";

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
        <body className={font.className}>
        <div className="px-16 pt-8 pb-32">
            <div className='mb-16'>
                <Link href='/'>
                    <h1>House of Commons Divisions</h1>
                </Link>
            </div>
            {children}
        </div>

        </body>
        </html>
    )
}
