import {Division} from "@/app/interface";
import {apiUrl, take} from "@/app/constants";
import Pagination from "@/components/pagination";
import DivisionList from "@/components/division-list";

const getQuery = (page: number, take: number) => `queryParameters.skip=${(page - 1) * take}&queryParameters.take=${take}`

export async function generateStaticParams() {
    const total = await getData<number>('https://commonsvotes-api.parliament.uk/data/divisions.json/searchTotalResults', ['total']);
    const pages = [];
    const pageCount = Math.ceil(total / take);
    for (let i = 0; i < pageCount; i++) {
        pages.push({page: (i + 1).toString()})
    }

    return pages
}

async function getData<T>(url: string, tags: string[]): Promise<T> {
    const res = await fetch(url, {next: {revalidate: 3600, tags}});
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

export default async function Home({params}: { params: { page: string } }) {
    const page = +params.page;
    const divisions = await getData<Division[]>(`${apiUrl}/search?${getQuery(page, take)}`, ['divisions']);
    const total = await getData<number>(`${apiUrl}/searchTotalResults`, ['total']);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <DivisionList divisions={divisions}/>
            <p className="center mb-4">Page: {params.page}</p>
            <Pagination page={page} total={total} path={'/page'}/>
        </main>
    )
}
