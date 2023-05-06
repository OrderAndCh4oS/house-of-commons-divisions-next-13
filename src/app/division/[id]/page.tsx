import {Division} from "@/app/interface";
import Votes from "@/app/division/[id]/votes";
import {Suspense} from "react";

const url = (id: string) => `https://commonsvotes-api.parliament.uk/data/division/${id}.json`;

async function getData(id: string): Promise<Division> {
    const res = await fetch(url(id));
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

export default async function Divisions({params}: { params: { id: string } }) {
    const division = await getData(params.id);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <article key={division.DivisionId} className="pb-4 mb-4 border-b border-black dark:border-white w-full">
                <h1 className="font-bold text-xl">{division.Title}</h1>
                <p>{new Date(division.Date).toDateString()}</p>
                <p className="mb-6"><span>Aye: {division.AyeCount}</span> <span>No: {division.NoCount}</span></p>
                <div className='flex mb-6'>
                    <div
                        className={`bg-green-400 h-6`}
                        style={{width: `${getPercentage(division.AyeCount, division.NoCount)}%`}}
                    />
                    <div
                        className={`bg-red-400 h-6`}
                        style={{width: `${getPercentage(division.NoCount, division.AyeCount)}%`}}
                    />
                </div>
                <Votes division={division}/>
            </article>
        </main>
    )
}
