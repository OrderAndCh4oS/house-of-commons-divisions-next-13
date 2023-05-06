import {Division} from "@/app/interface";
import {apiUrl, take} from "@/app/constants";
import Pagination from "@/app/pagination";
import DivisionList from "@/app/division-list";

const getQuery = (page: number, take: number) => `queryParameters.skip=${(page - 1) * take}&queryParameters.take=${take}`

async function getData<T>(url: string, tags: string[]): Promise<T> {
    const res = await fetch(url, {next: {revalidate: 3600, tags}});
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

export default async function Home() {
    const getDivisions = getData<Division[]>(`${apiUrl}/search?${getQuery(1, take)}`, ['divisions']);
    const getTotal = getData<number>(`${apiUrl}/searchTotalResults`, ['total']);
    const [divisions, total] = await Promise.all([getDivisions, getTotal]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <DivisionList divisions={divisions}/>
            <p className="center mb-4">Page: 1</p>
            <Pagination page={1} total={total} path={'/page'}/>
        </main>
    )
}
