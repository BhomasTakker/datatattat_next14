import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CompleteSignup } from "./complete-signup";
import { TermsAndConditions } from "./terms-and-conditions";

// Mock styles import
jest.mock("./compete-signup.module.scss", () => ({
	form: "form",
	header: "header",
	field: "field",
	inputContainer: "inputContainer",
	label: "label",
	input: "input",
	warn: "warn",
	showWarning: "showWarning",
	termsSection: "termsSection",
	termsContent: "termsContent",
	checkboxRow: "checkboxRow",
}));

// Mock Button component
jest.mock("../../../components/ui/button", () => ({
	Button: (props: any) => <button {...props} />,
}));

// Mock next/navigation
const refreshMock = jest.fn();
jest.mock("next/navigation", () => ({
	useRouter: () => ({ refresh: refreshMock }),
}));

// Mock regex patterns
jest.mock("../../../utils/regex", () => ({
	patterns: {
		username: {
			regex: /^[a-zA-Z0-9_]{3,16}$/,
			message: "Invalid username",
		},
	},
}));

// Mock async actions
const checkIsUsernameValidMock = jest.fn();
const confirmUsernameMock = jest.fn();
jest.mock("../../../actions/signup/check-username", () => ({
	isUsernameValid: (...args: any[]) => checkIsUsernameValidMock(...args),
}));
jest.mock("../../../actions/signup/confirm-username", () => ({
	confirmUsername: (...args: any[]) => confirmUsernameMock(...args),
}));

describe("CompleteSignup", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the form with initial username", () => {
		render(<CompleteSignup username="testuser" />);

		expect(screen.queryByText("Terms and Conditions")).toBeInTheDocument();
		expect(screen.queryByTestId("terms-continue-button")).toBeInTheDocument();
		expect(screen.queryByText("Complete Profile")).not.toBeInTheDocument();
	});

	it("blocks continue until terms are agreed", () => {
		render(<TermsAndConditions onContinue={jest.fn()} />);

		const continueButton = screen.getByTestId("terms-continue-button");
		const checkbox = screen.getByTestId("terms-agree-checkbox");

		expect(continueButton).toBeDisabled();

		fireEvent.click(checkbox);

		expect(continueButton).not.toBeDisabled();
	});

	it("shows complete profile form after agreeing to terms", async () => {
		checkIsUsernameValidMock.mockResolvedValue(true);
		render(<CompleteSignup username="testuser" />);

		const checkbox = screen.getByTestId("terms-agree-checkbox");
		fireEvent.click(checkbox);
		fireEvent.click(screen.getByTestId("terms-continue-button"));

		await waitFor(() => {
			expect(screen.queryByText("Complete Profile")).toBeInTheDocument();
		});
		expect(screen.queryByTestId(/username-input/)).toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: /submit/i }),
		).toBeInTheDocument();
		expect(screen.queryByDisplayValue("testuser")).toBeInTheDocument();
	});

	// needs react-hook-form for the error message to render
	it.skip("shows required error when username is empty and form is submitted", async () => {
		waitFor(() => {
			render(<CompleteSignup username="" />);
		});
		fireEvent.change(screen.getByTestId(/username-input/), {
			target: { value: "" },
		});
		fireEvent.click(screen.getByRole("button", { name: /submit/i }));
		expect(screen.queryByText("Username is required!")).toBeInTheDocument();
	});

	it("shows pattern error when username is invalid", async () => {
		checkIsUsernameValidMock.mockResolvedValue(false);
		render(<CompleteSignup username="inv@lid" />);

		const checkbox = screen.getByTestId("terms-agree-checkbox");
		fireEvent.click(checkbox);
		fireEvent.click(screen.getByTestId("terms-continue-button"));

		fireEvent.change(screen.getByTestId(/username-input/), {
			target: { value: "inv@lid" },
		});
		fireEvent.click(screen.getByRole("button", { name: /submit/i }));
		expect(await screen.findByText(/Username invalid/)).toBeInTheDocument();
	});

	it("disables submit button if username is not valid", async () => {
		checkIsUsernameValidMock.mockResolvedValue(false);
		render(<CompleteSignup username="baduser" />);

		const checkbox = screen.getByTestId("terms-agree-checkbox");
		fireEvent.click(checkbox);
		fireEvent.click(screen.getByTestId("terms-continue-button"));

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
		});
		expect(screen.getByText(/Username invalid/)).toBeInTheDocument();
	});

	it("enables submit button if username is valid", async () => {
		checkIsUsernameValidMock.mockResolvedValue(true);
		render(<CompleteSignup username="gooduser" />);

		const checkbox = screen.getByTestId("terms-agree-checkbox");
		fireEvent.click(checkbox);
		fireEvent.click(screen.getByTestId("terms-continue-button"));

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: /submit/i }),
			).not.toBeDisabled();
		});
	});

	//
	it("calls confirmUsername and refresh on valid submit", async () => {
		checkIsUsernameValidMock.mockResolvedValue(true);
		confirmUsernameMock.mockResolvedValue({ status: "ok" });
		render(<CompleteSignup username="gooduser" />);

		const checkbox = screen.getByTestId("terms-agree-checkbox");
		fireEvent.click(checkbox);
		fireEvent.click(screen.getByTestId("terms-continue-button"));

		const input = await screen.findByTestId(/username-input/);
		const submitButton = screen.getByRole("button", { name: /submit/i });

		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
		});

		fireEvent.change(input, { target: { value: "gooduser" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(confirmUsernameMock).toHaveBeenCalledWith("gooduser");
			expect(refreshMock).toHaveBeenCalled();
		});
	});

	it.skip("shows username invalid warning if username is not valid after typing", async () => {
		checkIsUsernameValidMock.mockResolvedValueOnce(false);
		render(<CompleteSignup username="baduser" />);
		const input = screen.getByTestId(/username-input/);
		fireEvent.change(input, { target: { value: "baduser" } });
		await waitFor(() => {
			expect(screen.getByText(/Username invalid/)).toHaveClass(
				"warn showWarning",
			);
		});
	});
});
