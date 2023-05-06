import Link from "next/link";
import {Division} from "@/app/interface";
import {take} from "@/app/constants";
import SearchBar from "@/app/search-bar";

const url = "https://commonsvotes-api.parliament.uk/data/divisions.json/search";
const query = `queryParameters.take=${take}`

async function getData(): Promise<Division[]> {
    const res = await fetch(`${url}?${query}`);
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

export default async function Home({}: {}) {
    const divisions = await getData();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {divisions.map(division => (
                <section key={division.DivisionId} className="pb-4 mb-4 border-b border-black dark:border-white w-full">
                    <h2 className="font-bold text-xl">{division.Title}</h2>
                    <p>{new Date(division.Date).toDateString()}</p>
                    <p className="mb-6"><span>Aye: {division.AyeCount}</span> <span>No: {division.NoCount}</span></p>
                    <div className='flex mb-6'>
                        <div className={`bg-green-400 h-6`}
                             style={{width: `${getPercentage(division.AyeCount, division.NoCount)}%`}}></div>
                        <div className={`bg-red-400 h-6`}
                             style={{width: `${getPercentage(division.NoCount, division.AyeCount)}%`}}></div>
                    </div>
                    <Link href={`/division/${division.DivisionId}`}
                          className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block">View</Link>
                </section>
            ))}
            <p className="center mb-4">Page: 1</p>
            <div className='flex gap-4'>
                <Link href="/page/2" className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block">Next</Link>
            </div>
        </main>
    )
}
