export const SwapIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            {...props}
        >
            <path
                d="M21 7a4 4 0 0 0-4-4H7M7 3l-4 4 4 4"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 17a4 4 0 0 0 4 4h10M17 21l4-4-4-4"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};