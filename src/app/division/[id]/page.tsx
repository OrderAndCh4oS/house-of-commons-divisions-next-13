import {Division, Member} from "@/app/interface";

const url = (id: string) => `https://commonsvotes-api.parliament.uk/data/division/${id}.json`;

async function getData(id: string): Promise<Division> {
    const res = await fetch(url(id));
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

function Member({member}: { member: Member }) {
    return (
        <div className='pb-4 mb-4 border-b border-black dark:border-white'>
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

export default async function Divisions({params}: { params: { id: string } }) {
    const data = await getData(params.id);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <article key={data.DivisionId} className="pb-4 mb-4 border-b border-black dark:border-white w-full">
                <h1 className="font-bold text-xl">{data.Title}</h1>
                <p>{new Date(data.Date).toDateString()}</p>
                <p className="mb-6"><span>Aye: {data.AyeCount}</span> <span>No: {data.NoCount}</span></p>
                <div className='flex mb-6'>
                    <div className={`bg-green-400 h-6`}
                         style={{width: `${getPercentage(data.AyeCount, data.NoCount)}%`}}></div>
                    <div className={`bg-red-400 h-6`}
                         style={{width: `${getPercentage(data.NoCount, data.AyeCount)}%`}}></div>
                </div>
                <section>
                    <h2 className="font-bold">Votes</h2>
                    <div className='flex gap-4'>
                        <div className='w-1/2'>
                            <h3 className='mb-4 bold'>Aye Votes</h3>
                            {data.Ayes.map(member => <Member key={member.MemberId} member={member}/>)}
                        </div>
                        <div className='w-1/2'>
                            <h3 className='mb-4 bold'>No Votes</h3>
                            {data.Noes.map(member => <Member key={member.MemberId} member={member}/>)}
                        </div>
                    </div>
                </section>
            </article>
        </main>
    )
}
