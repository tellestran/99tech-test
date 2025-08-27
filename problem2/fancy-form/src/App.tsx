import { ErrorBoundary } from "./components/ErrorBoundary";
import { ExchangeCard } from "./components/ExchangeCard";

export const App = () => {
  return (
    <ErrorBoundary>
      <div className="bg w-full min-h-screen px-[5%] py-[30px] bg-blue-950 flex items-center justify-center flex-col gap-8 md:gap-10">
        <div className="flex items-center justify-center">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Exchange Currency
          </span>
        </div>
        <ExchangeCard />
      </div>
    </ErrorBoundary>
  );
}

export default App