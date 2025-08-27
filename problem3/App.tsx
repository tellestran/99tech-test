interface WalletBalance {
  currency: string;
  amount: number;
  /**
   * Issue here: missing field `blockchain` in type `WalletBalance`.
   */
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {
  /**
   * Issue here: BoxProps has not been imported .
   */
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  /**
   * Issue here: children is declared but not being used .
   */

  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    /**
     * Issue here: need to use specific type for `blockchain`.
     */

    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    //import useMemo
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          /**
           * Issue here: lhsPriority not exist`.
           */

          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        /**
         * Issue here: lhs and rhs using type WalletBalance, but WalletBalance has no property `blockchain`.
         */

        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        /**
         * Issue here: Missing case equal comparision
         */
      });
  }, [balances, prices]);
  /**
   * Issue here: prices not affected to deps of useMemo .
   */

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  /**
   * Issue here: `formattedBalances` not used.
   */

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      /**
       * Issue here: use sortedBalances but typing of item is FormattedWalletBalance => not work
       */
      const usdValue = prices[balance.currency] * balance.amount;
      /**
       * Issue here: balance.currency maybe undefined
       */

      return (
        <WalletRow //WalletRow not imported
          className={classes.row} // where to get classes ?
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
          /**
           * Issue here: formatted not exist in sortBalances
           */
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
