import Link from "next/link";
import {Division} from "@/app/interface";
import {take} from "@/app/constants";

const url = "https://commonsvotes-api.parliament.uk/data/divisions.json";

const getQuery = (page: number, take: number, query: string | undefined) => {
    const params = new URLSearchParams({
        'queryParameters.page': `${page}`,
        'queryParameters.take': `${take}`
    })
    if (query) params.set('queryParameters.searchTerm', query);

    return params.toString();
}

const getTotalQuery = (query: string | undefined) => {
    const params = new URLSearchParams()
    if (query) params.set('queryParameters.searchTerm', query);

    return params.toString();
}

async function getData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

export default async function Search({params, searchParams}: {
    params: { page: string },
    searchParams: { query: string | undefined }
}) {
    const page = +params.page;
    const query = searchParams.query;
    const divisions = await getData<Division[]>(`${url}/search?${getQuery(page, take, query)}`);
    const total = await getData<number>(`${url}/searchTotalResults?${getTotalQuery(query)}`);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className='w-full flex mb-8'>
                <p>Query: {query}</p>
                <p className='ml-auto'>Total Results: {total}</p>
            </div>
            {divisions.map(division => (
                <section
                    key={division.DivisionId}
                    className="pb-4 mb-4 border-b border-black dark:border-white w-full"
                >
                    <h2 className="font-bold text-xl">{division.Title}</h2>
                    <p>{new Date(division.Date).toDateString()}</p>
                    <p className="mb-6">
                        <span>Aye: {division.AyeCount}</span>
                        {' '}
                        <span>No: {division.NoCount}</span>
                    </p>
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
                {page > 1 ? (
                    <Link
                        href={`/search/${+params.page - 1}?query=${query}`}
                        className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block"
                    >Prev</Link>
                ) : null}
                {page * take < total ? (
                    <Link
                        href={`/search/${+params.page + 1}?query=${query}`}
                        className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block"
                    >Next</Link>
                ) : null}
            </div>
        </main>
    )
}
