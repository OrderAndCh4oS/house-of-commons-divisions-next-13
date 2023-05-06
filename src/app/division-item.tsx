import {Division} from "@/app/interface";
import Link from "next/link";

function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

export default function DivisionItem({division: {AyeCount, Date: DateStr, DivisionId, NoCount, Title}}: {
    division: Division
}) {
    return <section className="pb-4 mb-4 border-b border-black dark:border-white w-full">
        <h2 className="font-bold text-xl">{Title}</h2>
        <p>{new Date(DateStr).toDateString()}</p>
        <p className="mb-6"><span>Aye: {AyeCount}</span> <span>No: {NoCount}</span></p>
        <div className="flex mb-6">
            <div
                className={`bg-green-400 h-6`}
                style={{width: `${getPercentage(AyeCount, NoCount)}%`}}
            />
            <div className={`bg-red-400 h-6`}
                 style={{width: `${getPercentage(NoCount, AyeCount)}%`}}
            />
        </div>
        <Link
            href={`/division/${DivisionId}`}
            className="px-3 pt-2 pb-1 border border-black dark:border-white rounded inline-block"
        >View</Link>
    </section>;
}
