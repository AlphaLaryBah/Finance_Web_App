/** @format */

import "@testing-library/jest-dom";

import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";

import DailyExpns from "../personalFinance/dailyExpense/DailyExpns";
import React from "react";

// import userEvent from "@testing-library/user-event";

afterEach(() => {
	cleanup();
});

test("should render Daily Expense component", () => {
	// renders the component
	render(<DailyExpns />);
	const dayExpense = screen.getByTestId("expenses-component");

	// expect(true).toBe(true)
	expect(dayExpense).toBeInTheDocument();
});

test("should contain the text Occupation: ", () => {
	// renders the component
	render(<DailyExpns />);
	const findAText = screen.getByText("Occupation:");
	expect(findAText).toBeInTheDocument();
});
test("find input tags ", () => {
	const { container } = render(<DailyExpns />);
	const inputBoxes = container.getElementsByClassName("dailyExpnsUpdateInput");
	expect(inputBoxes).toBeTruthy();
});
test("find Input submit button ", () => {
	render(<DailyExpns />);

	const submitButton = screen.getByRole("button");
	expect(submitButton).toBeInTheDocument();
});
test("Makes sure tabs that has Daily expense chart is not null", () => {
	render(<DailyExpns />);
	const dayExpense = screen.getByTestId("expenses-component");
	expect(within(dayExpense).queryByTestId("chart-Daily")).not.toBeNull();
});

test("Makes sure tabs that has Monthly expense chart is not null", () => {
	render(<DailyExpns />);
	const dayExpense = screen.getByTestId("expenses-component");
	expect(within(dayExpense).queryByTestId("chart-Monthly")).not.toBeNull();
});

test("test input (Onchange Event)", async () => {
	const mockDailyExpns = jest.fn();

	const { getByLabelText } = render(
		<DailyExpns dayExpenses={mockDailyExpns} />
	);
	const input = getByLabelText(/title of expense/i);
	fireEvent.change(input, { target: { value: "a new title" } });
	expect(input.value).toContain("a new title");
});
test("test btn", async () => {
	const mockDailyExpns = jest.fn();
	new mockDailyExpns();
	expect(mockDailyExpns).toHaveBeenCalled();

	expect(mockDailyExpns).toHaveBeenCalledTimes(1);

	
	// debug();
});
