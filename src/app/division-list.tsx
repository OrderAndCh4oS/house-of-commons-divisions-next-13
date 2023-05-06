import {Division} from "@/app/interface";
import DivisionItem from "@/app/division-item";

export default function DivisionList({divisions}: { divisions: Division[] }) {
    return (
        <>
            {divisions.map(division => <DivisionItem key={division.DivisionId} division={division}/>)}
        </>
    );
}
