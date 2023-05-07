import {HTMLAttributes} from "react";

export default function Button({children, ...rest}: HTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="relative inline-block px-4 py-2 font-medium group" {...rest}>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-woodsmoke dark:bg-swiss-coffee group-hover:-translate-x-0 group-hover:-translate-y-0 rounded"/>
            <span className="absolute inset-0 w-full h-full bg-swiss-coffee dark:bg-woodsmoke border-2 border-woodsmoke dark:border-swiss-coffee group-hover:bg-woodsmoke dark:group-hover:bg-swiss-coffee rounded"/>
            <span className="relative text-woodsmoke dark:text-swiss-coffee group-hover:text-swiss-coffee dark:group-hover:text-woodsmoke">{children}</span>
        </button>
    )
}
