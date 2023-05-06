import {Division} from "@/app/interface";
import Link from "next/link";

function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

export default function DivisionItem(props: { division: Division }) {
    return <section className="pb-4 mb-4 border-b border-black dark:border-white w-full">
        <h2 className="font-bold text-xl">{props.division.Title}</h2>
        <p>{new Date(props.division.Date).toDateString()}</p>
        <p className="mb-6"><span>Aye: {props.division.AyeCount}</span> <span>No: {props.division.NoCount}</span></p>
        <div className="flex mb-6">
            <div
                className={`bg-green-400 h-6`}
                style={{width: `${getPercentage(props.division.AyeCount, props.division.NoCount)}%`}}
            />
            <div className={`bg-red-400 h-6`}
                 style={{width: `${getPercentage(props.division.NoCount, props.division.AyeCount)}%`}}
            />
        </div>
        <Link
            href={`/division/${props.division.DivisionId}`}
            className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block"
        >View</Link>
    </section>;
}
