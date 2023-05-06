import Link from "next/link";
import {Division} from "@/app/interface";
import {take} from "@/app/constants";

const url = "https://commonsvotes-api.parliament.uk/data/divisions.json/search";
const getQuery = (page: number, take: number) => `queryParameters.skip=${(page - 1) * take}&queryParameters.take=${take}`

export const revalidate = 3600;

export async function generateStaticParams() {
    const total = await getData<number>('https://commonsvotes-api.parliament.uk/data/divisions.json/searchTotalResults');
    const pages = [];
    const pageCount = Math.ceil(total / take);
    for (let i = 0; i < pageCount; i++) {
        pages.push({page: (i + 1).toString()})
    }

    return pages
}

async function getData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

export default async function Home({params}: { params: { page: string } }) {
    const page = +params.page;
    const divisions = await getData<Division[]>(`${url}?${getQuery(page, take)}`);
    const total = await getData<number>('https://commonsvotes-api.parliament.uk/data/divisions.json/searchTotalResults');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {divisions.map(division => (
                <section key={division.DivisionId} className="pb-4 mb-4 border-b border-black dark:border-white w-full">
                    <h2 className="font-bold text-xl">{division.Title}</h2>
                    <p>{new Date(division.Date).toDateString()}</p>
                    <p className="mb-6"><span>Aye: {division.AyeCount}</span> <span>No: {division.NoCount}</span></p>
                    <div className='flex mb-6'>
                        <div
                            className={`bg-green-400 h-6`}
                            style={{width: `${getPercentage(division.AyeCount, division.NoCount)}%`}}
                        />
                        <div className={`bg-red-400 h-6`}
                             style={{width: `${getPercentage(division.NoCount, division.AyeCount)}%`}}
                        />
                    </div>
                    <Link
                        href={`/division/${division.DivisionId}`}
                        className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block"
                    >View</Link>
                </section>
            ))}
            <p className="center mb-4">Page: {params.page}</p>
            <div className='flex gap-4'>
                {page > 1 ? <Link href={`/page/${+params.page - 1}`} className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block">Prev</Link> : null}
                {page * take < total ? <Link href={`/page/${+params.page + 1}`} className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block">Next</Link> : null}
            </div>
        </main>
    )
}
