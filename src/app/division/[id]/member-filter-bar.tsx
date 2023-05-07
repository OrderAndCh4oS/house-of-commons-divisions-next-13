import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';

const MemberFilter = z.object({
    filter: z.string().max(500),
});
export type MemberFilter = z.infer<typeof MemberFilter>;

export default function MemberFilterBar({onSubmit}: { onSubmit: (values: MemberFilter) => void }) {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<MemberFilter>({resolver: zodResolver(MemberFilter)});

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='flex'>
                    <input
                        {...register("filter")}
                        className='text-woodsmoke px-3 pt-2 pb-1 border border-woodsmoke dark:border-swiss-coffee rounded-l'
                    />
                    <button
                        type="submit"
                        className='px-3 pt-2 pb-1 border border-woodsmoke dark:border-swiss-coffee border-l-0 rounded-r inline-block'
                    >Filter
                    </button>
                </div>
                {errors.filter?.message && <p>{errors.filter.message}</p>}
            </div>
        </form>
    );
}
