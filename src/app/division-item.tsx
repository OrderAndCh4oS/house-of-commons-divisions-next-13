import {Division} from "@/app/interface";
import Link from "next/link";
import Button from "@/app/button";

function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

export default function DivisionItem({division: {AyeCount, Date: DateStr, DivisionId, NoCount, Title}}: {
    division: Division
}) {
    return <section className="pb-4 mb-4 border-b border-woodsmoke dark:border-swiss-coffee w-full">
        <h2 className="font-bold text-xl">{Title}</h2>
        <p>{new Date(DateStr).toDateString()}</p>
        <p className="mb-6"><span>Aye: {AyeCount}</span> <span>No: {NoCount}</span></p>
        <div className="flex mb-6">
            <div
                className={`bg-woodsmoke dark:bg-swiss-coffee h-6 rounded-l`}
                style={{width: `${getPercentage(AyeCount, NoCount)}%`}}
            />
            <div className={`bg-swiss-coffee-600 dark:bg-woodsmoke-500 h-6 rounded-r`}
                 style={{width: `${getPercentage(NoCount, AyeCount)}%`}}
            />
        </div>
        <Link
            href={`/division/${DivisionId}`}
        >
            <Button>View</Button>
        </Link>
    </section>;
}
