function getPercentage(a: number, b: number): string {
    return (a / (a + b) * 100).toPrecision(3);
}

export default function PercentageBar({a, b}: { a: number, b: number }) {
    return <div className="flex mb-6">
        <div
            className={`bg-woodsmoke dark:bg-swiss-coffee h-6 rounded-l`}
            style={{width: `${getPercentage(a, b)}%`}}
        />
        <div className={`bg-swiss-coffee-600 dark:bg-woodsmoke-500 h-6 rounded-r`}
             style={{width: `${getPercentage(b, a)}%`}}
        />
    </div>;
}
