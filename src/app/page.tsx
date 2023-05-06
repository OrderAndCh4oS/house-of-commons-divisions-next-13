import Link from "next/link";
import {Division} from "@/app/interface";
import {take} from "@/app/constants";
import DivisionItem from "@/app/division-item";
import Pagination from "@/app/pagination";

const url = "https://commonsvotes-api.parliament.uk/data/divisions.json/search";
const getQuery = (page: number, take: number) => `queryParameters.skip=${(page - 1) * take}&queryParameters.take=${take}`

export const revalidate = 3600;

async function getData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

export default async function Home() {
    const getDivisions = getData<Division[]>(`${url}?${getQuery(1, take)}`);
    const getTotal = getData<number>('https://commonsvotes-api.parliament.uk/data/divisions.json/searchTotalResults');
    const [divisions, total] = await Promise.all([getDivisions, getTotal]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {divisions.map(division => <DivisionItem key={division.DivisionId} division={division}/>)}
            <p className="center mb-4">Page: 1</p>
            <Pagination page={1} total={total} path={'/page'}/>
        </main>
    )
}
