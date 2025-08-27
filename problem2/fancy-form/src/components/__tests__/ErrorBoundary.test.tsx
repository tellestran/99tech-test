import { render, screen } from "@testing-library/react";
import React from "react";
import { ErrorBoundary } from "../ErrorBoundary";

const ProblemChild: React.FC = () => {
    throw new Error("Boom!");
};

describe("ErrorBoundary", () => {
    let consoleErrorSpy: jest.SpyInstance;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
    });
    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it("renders children normally when there is no error", () => {
        render(
            <ErrorBoundary>
                <div>Safe child</div>
            </ErrorBoundary>
        );
        expect(screen.getByText("Safe child")).toBeInTheDocument();
    });

    it("catches error and renders default fallback when no custom fallback provided", () => {
        render(
            <ErrorBoundary>
                <ProblemChild />
            </ErrorBoundary>
        );

        expect(
            screen.getByText(/Something went wrong\. Please try again later\./i)
        ).toBeInTheDocument();

        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it("renders custom fallback when provided", () => {
        render(
            <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom Fallback</div>}>
                <ProblemChild />
            </ErrorBoundary>
        );

        expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
        expect(screen.getByText("Custom Fallback")).toBeInTheDocument();
    });
});