import {Division} from "@/app/interface";
import Link from "next/link";
import Button from "@/components/button";
import PercentageBar from "@/components/percentage-bar";

export default function DivisionItem({division: {AyeCount, Date: DateStr, DivisionId, NoCount, Title}}: {
    division: Division
}) {
    return <section className="pb-4 mb-4 border-b border-woodsmoke dark:border-swiss-coffee w-full">
        <h2 className="font-bold text-xl">{Title}</h2>
        <p>{new Date(DateStr).toDateString()}</p>
        <p className="mb-6"><span>Aye: {AyeCount}</span> <span>No: {NoCount}</span></p>
        <PercentageBar a={AyeCount} b={NoCount}/>
        <Link
            href={`/division/${DivisionId}`}
        >
            <Button>View</Button>
        </Link>
    </section>;
}
