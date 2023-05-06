import Link from "next/link";
import {take} from "@/app/constants";

export default function Pagination(props: { page: number, total: number, path: string, query?: string }) {
    return (
        <div className="flex gap-4">
            {props.page > 1
                ? (
                    <Link
                        href={`${props.path}/${props.page - 1}${props.query ? `/?query=${props.query}` : ''}`}
                        className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block"
                    >Prev</Link>
                ) : null}
            {props.page * take < props.total
                ? (
                    <Link
                        href={`${props.path}/${props.page + 1}${props.query ? `/?query=${props.query}` : ''}`}
                        className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block"
                    >Next</Link>
                ) : null}
        </div>
    );
}
