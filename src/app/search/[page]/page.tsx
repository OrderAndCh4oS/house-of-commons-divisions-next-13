import {Division} from "@/app/interface";
import {apiUrl, take} from "@/app/constants";
import Pagination from "@/app/pagination";
import DivisionList from "@/app/division-list";

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

export default async function Search({params, searchParams}: {
    params: { page: string },
    searchParams: { query: string | undefined }
}) {
    const page = +params.page;
    const query = searchParams.query;
    const getDivisions = getData<Division[]>(`${apiUrl}/search?${getQuery(page, take, query)}`);
    const getTotal = getData<number>(`${apiUrl}/searchTotalResults?${getTotalQuery(query)}`);

    const [divisions, total] = await Promise.all([getDivisions, getTotal]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className='w-full flex mb-8'>
                <p>Query: {query}</p>
                <p className='ml-auto'>Total Results: {total}</p>
            </div>
            <DivisionList divisions={divisions}/>
            <p className="center mb-4">Page: {params.page}</p>
            <Pagination page={page} total={total} path={'/search'} query={query}/>
        </main>
    )
}
