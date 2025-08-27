export const Row = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex items-center justify-between border-t border-white/10 pt-2">
            <span className="text-slate-400">{label}</span>
            <span className="font-semibold text-slate-100">{value}</span>
        </div>
    );
}