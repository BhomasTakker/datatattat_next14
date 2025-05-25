import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ClientSideComponent } from "./client-side-component-render";

const mockComponent = ({ component, dataObject }: any) => (
	<div>
		<span>MockComponent</span>
		<span>{component?.name}</span>
		<span>{dataObject?.data?.foo}</span>
	</div>
);

const baseComponent = {
	_with: { id: 1 },
	name: "TestComponent",
};

describe("ClientSideComponent", () => {
	it("renders loading initially", () => {
		const getData = jest.fn(() => new Promise(() => {}));
		render(
			<ClientSideComponent
				// @ts-expect-error mock data
				getData={getData}
				Component={mockComponent}
				component={baseComponent as any}
			/>
		);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("renders component with data after successful fetch", async () => {
		const getData = jest.fn().mockResolvedValue({ foo: "bar" });
		render(
			<ClientSideComponent
				getData={getData}
				Component={mockComponent}
				component={baseComponent as any}
			/>
		);
		await waitFor(() =>
			expect(screen.getByText("MockComponent")).toBeInTheDocument()
		);
		expect(screen.getByText("TestComponent")).toBeInTheDocument();
		expect(screen.getByText("bar")).toBeInTheDocument();
	});

	it("renders error message if getData throws", async () => {
		const getData = jest.fn().mockRejectedValue(new Error("Fetch error"));
		render(
			<ClientSideComponent
				getData={getData}
				Component={mockComponent}
				component={baseComponent as any}
			/>
		);
		await waitFor(() =>
			expect(screen.getByText("Error loading data")).toBeInTheDocument()
		);
	});

	it("calls getData with correct queryObject", async () => {
		const getData = jest.fn().mockResolvedValue({ foo: "bar" });
		render(
			<ClientSideComponent
				getData={getData}
				Component={mockComponent}
				component={baseComponent as any}
			/>
		);
		await waitFor(() => expect(getData).toHaveBeenCalledWith({ id: 1 }));
	});
});
