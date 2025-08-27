import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import type { Currency, CurrencyData } from "../typing";
import { SwapIcon } from "./ArrowRightIcon";
import { Panel } from "./Panel";

export const ExchangeCard = () => {
    const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
    const [toCurrency, setToCurrency] = useState<Currency | null>(null);

    const [pricesMap, setPricesMap] = useState<Map<string, number>>(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await api.get<CurrencyData>("prices.json");
                if (cancelled) return;

                const map = new Map<string, number>();
                for (let i = res.data.length - 1; i >= 0; i--) {
                    const { currency, price } = res.data[i] || {};
                    if (!map.has(currency) && Number.isFinite(price) && price > 0) {
                        map.set(currency, price);
                    }
                }
                setPricesMap(map);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                if (!cancelled) setError("Failed to fetch prices");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const currencyOptions: Currency[] = useMemo(
        () => Array.from(pricesMap.keys()).sort() as Currency[],
        [pricesMap]
    );

    const rate = useMemo(() => {
        if (!fromCurrency || !toCurrency) return undefined;
        if (fromCurrency === toCurrency) return 1;

        const fromP = pricesMap.get(fromCurrency);
        const toP = pricesMap.get(toCurrency);
        if (!fromP || !toP) return undefined;

        return Number((toP / fromP).toFixed(6));
    }, [fromCurrency, toCurrency, pricesMap]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    if (loading) return <div>Loading exchange rates...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative mx-auto w-full max-w-4xl rounded-2xl border border-white/5 bg-slate-900/60 shadow-2xl backdrop-blur font-oxanium">
            <div className="grid grid-cols-1 divide-y divide-white/5 md:grid-cols-2 md:divide-x md:divide-y-0">
                <Panel
                    side="from"
                    data={[]} 
                    currencyData={currencyOptions}
                    currency={fromCurrency}
                    onCurrencyChange={(v) => setFromCurrency(v as Currency)}
                    displayValue={1}
                    subtitle={
                        fromCurrency && toCurrency && rate !== undefined
                            ? `1 ${fromCurrency} equals`
                            : "Select currencies"
                    }
                />

                <Panel
                    side="to"
                    data={[]} 
                    currencyData={currencyOptions}
                    currency={toCurrency}
                    onCurrencyChange={(v) => setToCurrency(v as Currency)}
                    displayValue={rate !== undefined ? Number(rate.toFixed(3)) : 0}
                    subtitle={
                        fromCurrency && toCurrency && rate !== undefined
                            ? `${rate} ${toCurrency}`
                            : `-- ${toCurrency ?? "Select currency"}`
                    }
                />
            </div>

            <button
                onClick={handleSwap}
                className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-slate-800 p-2 text-slate-100 shadow md:flex hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                aria-label="Swap currencies"
                title="Swap"
            >
                <SwapIcon className="h-5 w-5" />
            </button>
        </div>
    );
};