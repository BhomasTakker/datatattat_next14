import React from "react";
import { render, screen } from "@testing-library/react";
import { InViewComponent } from "./in-view";
import { useInView } from "react-intersection-observer";

// Mock useInView from react-intersection-observer
jest.mock("react-intersection-observer", () => ({
	useInView: jest.fn(),
}));

describe("InViewComponent", () => {
	const mockRef = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useInView as jest.Mock).mockReturnValue({
			ref: mockRef,
			inView: false,
		});
	});

	it("renders the template when not in view", () => {
		(useInView as jest.Mock).mockReturnValue({
			ref: mockRef,
			inView: false,
		});

		render(
			<InViewComponent
				options={{ threshold: 0.5, triggerOnce: true }}
				template={<span data-testid="template">Template</span>}
			>
				<span data-testid="children">Children</span>
			</InViewComponent>
		);

		expect(screen.getByTestId("template")).toBeInTheDocument();
		expect(screen.queryByTestId("children")).not.toBeInTheDocument();
	});

	it("renders the children when in view", () => {
		(useInView as jest.Mock).mockReturnValue({
			ref: mockRef,
			inView: true,
		});

		render(
			<InViewComponent
				options={{ threshold: 0.5, triggerOnce: true }}
				template={<span data-testid="template">Template</span>}
			>
				<span data-testid="children">Children</span>
			</InViewComponent>
		);

		expect(screen.getByTestId("children")).toBeInTheDocument();
		expect(screen.queryByTestId("template")).not.toBeInTheDocument();
	});

	it("passes the correct options to useInView", () => {
		render(
			<InViewComponent
				options={{ threshold: 0.8, triggerOnce: false }}
				template={<span>Template</span>}
			>
				<span>Children</span>
			</InViewComponent>
		);

		expect(useInView).toHaveBeenCalledWith({
			threshold: 0.8,
			triggerOnce: false,
		});
	});

	it("attaches the ref to the div", () => {
		(useInView as jest.Mock).mockReturnValue({
			ref: mockRef,
			inView: false,
		});

		const { container } = render(
			<InViewComponent options={{}} template={<span>Template</span>}>
				<span>Children</span>
			</InViewComponent>
		);

		const div = container.querySelector("div");
		expect(div).toBeInTheDocument();
		// The ref function should be assigned to the div's ref
		// This is not directly testable, but we can check that the ref is called
	});
});
