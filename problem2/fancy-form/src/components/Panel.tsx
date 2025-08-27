import { useEffect, useMemo, useRef, useState } from 'react';
import type { CurrencyData } from '../typing';
import { getTokenIconUrl } from '../utils/getTokenIconUrl';
import { Row } from './Row';

export const Panel = (props: {
  data: CurrencyData;
  side: 'from' | 'to';
  currencyData: string[];
  currency: string | null;
  onCurrencyChange: (v: string) => void;
  displayValue: number;
  subtitle?: string;
  exchangeRateLabel?: string;
  rateValue?: number;
}) => {
  const {
    currencyData,
    currency,
    onCurrencyChange,
    displayValue,
    subtitle,
    exchangeRateLabel,
    rateValue,
    side,
  } = props;

  const [imgError, setImgError] = useState(false);
  const OptionIcon = ({ symbol }: { symbol: string }) => {
    const [err, setErr] = useState(false);
    const src = useMemo(() => getTokenIconUrl(symbol), [symbol]);

    if (err) {
      return (
        <div className="h-5 w-5 rounded-sm bg-gradient-to-br from-red-500 to-blue-600" />
      );
    }
    return (
      <img
        src={src}
        alt={`${symbol} icon`}
        className="h-5 w-5 rounded-[4px] bg-white/5 object-contain p-0.5 ring-1 ring-white/10"
        onError={() => setErr(true)}
      />
    );
  };

  const [open, setOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const handleSelect = (val: string) => {
    setImgError(false);
    onCurrencyChange(val);
    setOpen(false);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          {currency && !imgError ? (
            <OptionIcon symbol={currency} />
          ) : (
            <div className="h-7 w-7 rounded-sm bg-gradient-to-br from-red-500 to-blue-600" />
          )}

          <span className="truncate text-sm font-semibold tracking-wide text-slate-100">
            {currency ?? 'Select currency'}
          </span>
        </div>

        <div ref={ddRef} className="relative w-full sm:ml-auto sm:w-56">
          <button
            type="button"
            aria-label={`${side} currency dropdown`}
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-md border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-slate-200 shadow-sm outline-none hover:bg-slate-800 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300"
          >
            <span className="truncate">{currency ?? 'Select currency'}</span>
            <svg
              className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
            </svg>
          </button>

          {open && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur">
              <ul className="max-h-44 overflow-y-auto py-1">
                {currencyData.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => handleSelect(c)}
                      className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition ${c === currency ? 'bg-slate-800/70 text-slate-100' : 'text-slate-200 hover:bg-slate-800/60'} `}
                    >
                      <OptionIcon symbol={c} />
                      <span className="truncate">{c}</span>
                    </button>
                  </li>
                ))}
                {currencyData.length === 0 && (
                  <li className="px-3 py-2.5 text-sm text-slate-400">
                    No options
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mb-1">
        <div className="text-3xl font-semibold text-slate-100">
          {Number.isFinite(displayValue)
            ? displayValue.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              })
            : '--'}
        </div>
      </div>

      {subtitle && (
        <div className="mb-4 text-sm text-slate-400">{subtitle}</div>
      )}

      <div className="space-y-2 text-xs text-slate-300/80">
        {rateValue !== undefined && (
          <Row
            label={exchangeRateLabel ?? 'Rate'}
            value={`${rateValue.toFixed(6)}`}
          />
        )}
      </div>
    </div>
  );
};
