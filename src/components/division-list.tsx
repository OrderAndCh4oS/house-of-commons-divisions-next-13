import {Division} from "@/app/interface";
import DivisionItem from "@/components/division-item";

export default function DivisionList({divisions}: { divisions: Division[] }) {
    return (
        <>
            {divisions.map(division => <DivisionItem key={division.DivisionId} division={division}/>)}
        </>
    );
}
