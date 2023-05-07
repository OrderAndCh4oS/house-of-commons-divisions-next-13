"use client"

import {Division, Member} from "@/app/interface";
import {useState} from "react";
import MemberFilterBar, {MemberFilter} from "@/app/division/[id]/member-filter-bar";

const memberFilter = (filter: string | null) => (member: Member) => (
    !filter ||
    member.MemberFrom.toLowerCase().includes(filter) ||
    member.Name.toLowerCase().includes(filter) ||
    member.Party.toLowerCase().includes(filter) ||
    member.SubParty?.toLowerCase().includes(filter)
)

const memberMap = (member: Member) => <Member key={member.MemberId} member={member}/>;

function Member({member}: { member: Member }) {
    return (
        <div className='pb-4 mb-4 border-b border-woodsmoke dark:border-swiss-coffee'>
            <h4 className='font-bold'>{member.Name}</h4>
            <div className='flex'>
                <div style={{backgroundColor: `#${member.PartyColour}`}} className='w-4 h-4 mt-1 mr-2'/>
                <div>
                    <p>
                        <span className='font-bold'>{member.Party}</span>
                        {member.SubParty ? `(${member.SubParty})` : null}
                    </p>
                    <p>{member.MemberFrom}</p>
                </div>
            </div>
        </div>
    );
}

export default function Votes({division: {Ayes, Noes}}: { division: Division }) {

    const [filter, setFilter] = useState<string | null>(null)

    const onSubmit = ({filter}: MemberFilter) => {
        setFilter(filter ?? null);
    }

    const lowerCaseFilter = filter?.toLowerCase() ?? null;

    return (
        <>
            <div className='mb-1 flex justify-end w-full'>
                <MemberFilterBar onSubmit={onSubmit}/>
            </div>
            <section>
                <h2 className="font-bold">Votes</h2>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <h3 className="mb-4 bold">Aye Votes</h3>
                        {Ayes.filter(memberFilter(lowerCaseFilter)).map(memberMap)}
                    </div>
                    <div className="w-1/2">
                        <h3 className="mb-4 bold">No Votes</h3>
                        {Noes.filter(memberFilter(lowerCaseFilter)).map(memberMap)}
                    </div>
                </div>
            </section>
        </>
    );
}
