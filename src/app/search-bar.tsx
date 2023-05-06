"use client"

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from "next/navigation";


const FormData = z.object({
    query: z.string().max(500),
});
type FormData = z.infer<typeof FormData>;


export default function SearchBar() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({resolver: zodResolver(FormData)});

    const onSubmit = (data: FormData) => {
        const params = new URLSearchParams(data);
        void router.push('/search/1/?' + params.toString());
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='flex'>
                    <input {...register("query")} className='text-black px-3 pt-2 pb-1 border border-black dark:border-white rounded-l' />
                    <button type="submit" className='px-3 pt-2 pb-1 border border-black dark:border-white border-l-0 rounded-r inline-block'>Search</button>
                </div>
                {errors.query?.message && <p>{errors.query.message}</p>}
            </div>
        </form>
    );
}
