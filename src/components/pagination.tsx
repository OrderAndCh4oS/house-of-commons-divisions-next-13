import Link from "next/link";
import {take} from "@/app/constants";
import Button from "@/components/button";

export default function Pagination(props: { page: number, total: number, path: string, query?: string }) {
    return (
        <div className="flex gap-4">
            {props.page > 1
                ? (
                    <Link
                        href={`${props.path}/${props.page - 1}${props.query ? `/?query=${props.query}` : ''}`}
                    >
                        <Button>Prev</Button>
                    </Link>
                ) : null}
            {props.page * take < props.total
                ? (
                    <Link
                        href={`${props.path}/${props.page + 1}${props.query ? `/?query=${props.query}` : ''}`}
                    >
                        <Button>Next</Button>
                    </Link>
                ) : null}
        </div>
    );
}
