import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import api from "../../api/api";
import { ExchangeCard } from "../ExchangeCard";

jest.mock("../../api/api", () => ({
    __esModule: true,
    default: { get: jest.fn() },
}));

type PriceRec = { currency: string; price: number; date?: string };

const pricesOK: PriceRec[] = [
    { currency: "USD", price: 1.0, date: "2023-08-29T07:10:30.000Z" },
    { currency: "EUR", price: 0.9, date: "2023-08-29T07:10:30.000Z" },

    { currency: "JPY", price: 150, date: "2023-08-29T07:10:40.000Z" },

    { currency: "USD", price: 1.1, date: "2023-08-29T07:10:52.000Z" },
    { currency: "EUR", price: 0.88, date: "2023-08-29T07:10:52.000Z" },
];

describe("ExchangeCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("shows loading then renders placeholders and dropdowns from API data", async () => {
        (api.get as jest.Mock).mockResolvedValueOnce({ data: pricesOK });

        render(<ExchangeCard />);

        expect(
            screen.getByText(/Loading exchange rates/i)
        ).toBeInTheDocument();

        await waitFor(() =>
            expect(
                screen.queryByText(/Loading exchange rates/i)
            ).not.toBeInTheDocument()
        );

        const selects = screen.getAllByRole("combobox");
        expect(selects.length).toBe(2);

        expect(screen.getByText(/Select currencies/i)).toBeInTheDocument();
        expect(screen.getByText(/-- Select currency/i)).toBeInTheDocument();
    });

    it("shows error UI when API fails", async () => {
        (api.get as jest.Mock).mockRejectedValueOnce(new Error("boom"));

        render(<ExchangeCard />);

        await waitFor(() =>
            expect(
                screen.getByText(/Error: Failed to fetch prices/i)
            ).toBeInTheDocument()
        );
    });

    it("computes correct rate when selecting FROM and TO", async () => {
        (api.get as jest.Mock).mockResolvedValueOnce({ data: pricesOK });

        const user = userEvent.setup();
        render(<ExchangeCard />);

        await waitFor(() =>
            expect(
                screen.queryByText(/Loading exchange rates/i)
            ).not.toBeInTheDocument()
        );

        const selects = screen.getAllByRole("combobox");
        await user.selectOptions(selects[0], "USD");
        await user.selectOptions(selects[1], "EUR");

        const expectedRateNum = Number((0.88 / 1.1).toFixed(6));
        expect(
            screen.getByText(new RegExp(`^${expectedRateNum}\\s+EUR$`, "i"))
        ).toBeInTheDocument();
    });

    it("swap button swaps selected currencies and updates rate text", async () => {
        (api.get as jest.Mock).mockResolvedValueOnce({ data: pricesOK });

        const user = userEvent.setup();
        render(<ExchangeCard />);

        await waitFor(() =>
            expect(
                screen.queryByText(/Loading exchange rates/i)
            ).not.toBeInTheDocument()
        );

        const selects = screen.getAllByRole("combobox");
        await user.selectOptions(selects[0], "USD");
        await user.selectOptions(selects[1], "EUR");

        expect(screen.getByText(/1 USD equals/i)).toBeInTheDocument();

        const swapBtn = screen.getByRole("button", { name: /swap currencies/i });
        await user.click(swapBtn);

        expect(screen.getByText(/1 EUR equals/i)).toBeInTheDocument();

        const swappedNum = Number((1.1 / 0.88).toFixed(6)); 
        expect(
            screen.getByText(new RegExp(`^${swappedNum}\\s+USD$`, "i"))
        ).toBeInTheDocument()
    });

    it("keeps right panel placeholder until both currencies are selected", async () => {
        (api.get as jest.Mock).mockResolvedValueOnce({ data: pricesOK });

        const user = userEvent.setup();
        render(<ExchangeCard />);

        await waitFor(() =>
            expect(
                screen.queryByText(/Loading exchange rates/i)
            ).not.toBeInTheDocument()
        );

        const [fromSelect] = screen.getAllByRole("combobox");
        await user.selectOptions(fromSelect, "JPY");

        expect(screen.getByText(/-- Select currency/i)).toBeInTheDocument();
    });
});