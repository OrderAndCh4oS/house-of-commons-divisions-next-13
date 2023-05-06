import Link from "next/link";
import {Division} from "@/app/interface";
import {take} from "@/app/constants";
import DivisionItem from "@/app/division-item";
import Pagination from "@/app/pagination";

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

export default async function Home({params}: { params: { page: string } }) {
    const page = +params.page;
    const divisions = await getData<Division[]>(`${url}?${getQuery(page, take)}`);
    const total = await getData<number>('https://commonsvotes-api.parliament.uk/data/divisions.json/searchTotalResults');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {divisions.map(division => <DivisionItem key={division.DivisionId} division={division}/>)}
            <p className="center mb-4">Page: {params.page}</p>
            <Pagination page={page} total={total} path={'/page'}/>
        </main>
    )
}
