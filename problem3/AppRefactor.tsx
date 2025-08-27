import React, { useMemo } from "react";

type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; 
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string; 
}

interface PricesMap {
  [symbol: string]: number | undefined;
}

type Props = React.ComponentProps<"div"> & {
  rowClassName?: string; 
};

const PRIORITY: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (chain: Blockchain | string): number =>
  PRIORITY[chain as Blockchain] ?? -99;

declare function useWalletBalances(): WalletBalance[];
declare function usePrices(): PricesMap;

declare function WalletRow(props: {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
}): React.JSX.Element;

const WalletPage: React.FC<Props> = ({ rowClassName, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((b) => getPriority(b.blockchain) > -99 && b.amount > 0)
      .sort((a, b) => {
        const pa = getPriority(a.blockchain);
        const pb = getPriority(b.blockchain);
        if (pa > pb) return -1;
        if (pa < pb) return 1;
        return 0; 
      });
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = useMemo(
    () =>
      sortedBalances.map((b) => ({
        ...b,
        formatted: b.amount.toFixed(2), 
      })),
    [sortedBalances]
  );

  const rows = useMemo(
    () =>
      formattedBalances.map((b) => {
        const unitPrice = prices[b.currency] ?? 0; 
        const usdValue = unitPrice * b.amount;

        return (
          <WalletRow
            className={rowClassName}
            key={`${b.blockchain}-${b.currency}`} 
            amount={b.amount}
            usdValue={usdValue}
            formattedAmount={b.formatted}
          />
        );
      }),
    [formattedBalances, prices, rowClassName]
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;