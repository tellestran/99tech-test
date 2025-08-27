import { useEffect, useRef, useState } from "react";

type Option = string;

export const Dropdown = ({
    value,
    options,
    onChange,
    className = "",
    placeholder = "Select...",
    visibleItems = 4,
}: {
    value: Option | null;
    options: Option[];
    onChange: (v: Option) => void;
    className?: string;
    placeholder?: string;
    visibleItems?: number;
}) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const maxHeight = `${visibleItems * 40}px`;

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="
          flex w-full items-center justify-between
          rounded-md border border-white/10 bg-slate-800/70
          px-3 py-2 text-xs text-slate-200
          outline-none hover:bg-slate-800
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300
          shadow-sm
        "
            >
                <span className="truncate">{value ?? placeholder}</span>
                <svg
                    className={`ml-2 h-4 w-4 shrink-0 transition ${open ? "rotate-180 text-cyan-300" : "text-slate-400"
                        }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.118l3.71-2.89a.75.75 0 11.92 1.18l-4.17 3.25a.75.75 0 01-.92 0l-4.17-3.25a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {open && (
                <ul
                    className="
            absolute z-50 mt-1 w-full overflow-y-auto rounded-md
            border border-white/10 bg-slate-900/95 p-1 text-xs text-slate-200
            shadow-lg backdrop-blur
          "
                    style={{ maxHeight }}
                >
                    {options.map((opt) => (
                        <li
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className="
                cursor-pointer rounded px-3 py-2
                hover:bg-slate-800/80
              "
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}