import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { ClientHeader } from "./client-header";
import { getMainHeader, getSubHeaders } from "../../actions/header/get-header";

jest.mock("./navigation/navigation-menu", () => {
	return {
		NavigationMenu: ({ items }: { items: string[] }) => {
			const list = items.map((item, index) => (
				<li key={index}>
					<p>{item}</p>
				</li>
			));
			return <ul data-testid="nav">{list}</ul>;
		},
	};
});

jest.mock("./sub-headers", () => {
	return {
		SubHeaders: ({ headersArray }: { headersArray: string[] }) => {
			const menu = headersArray.map((item, index) => (
				<li key={index}>
					<p>{item}</p>
				</li>
			));
			return <ul data-testid="sub-headers">{menu}</ul>;
		},
	};
});

// second timne we mock this guy - find a good solution
jest.mock("next/navigation", () => {
	return {
		usePathname: jest.fn().mockResolvedValue("/mock-route"),
	};
});

// we can have a mocks folder but - can we call a shortcut finction to mock the module?
jest.mock("../../actions/header/get-header", () => {
	return {
		getSubHeaders: jest
			.fn()
			.mockResolvedValue(["header1", "header2", "header3"]),
		getMainHeader: jest.fn().mockResolvedValue({
			route: "/mock-route",
			nav: ["nav1", "nav2", "nav3"],
		}),
	};
});

describe("Client Header", () => {
	it("renders navigation menu", async () => {
		// render(<ClientHeader route={[]} />);
		render(await ClientHeader({ route: [] }));
		await waitFor(() => {
			const nav = screen.queryByTestId("nav");
			expect(nav).toBeInTheDocument();
		});
	});

	it("does not render navigation menu when no header returned", async () => {
		(getMainHeader as jest.Mock).mockResolvedValueOnce(undefined);
		render(await ClientHeader({ route: [] }));
		await waitFor(() => {
			const nav = screen.queryByTestId("nav");
			expect(nav).not.toBeInTheDocument();
		});
	});

	it("renders sub headers", async () => {
		render(
			await ClientHeader({
				route: ["defaults to home if no route provided..."],
			})
		);
		await waitFor(() => {
			const subHeaders = screen.queryByTestId("sub-headers");
			expect(subHeaders).toBeInTheDocument();
		});
	});

	it("does not render sub headers when empty array returned", async () => {
		(getSubHeaders as jest.Mock).mockResolvedValueOnce([]);
		render(await ClientHeader({}));
		await waitFor(() => {
			const nav = screen.queryByTestId("sub-headers");
			expect(nav).not.toBeInTheDocument();
		});
	});

	// This test is not correct. We aren't rendering subs
	it("renders navigation unchanged", async () => {
		const { container } = render(
			await ClientHeader({ route: ["test1", "test2"] })
		);
		await waitFor(() => {
			screen.queryByTestId("nav");
			screen.queryByTestId("sub-headers");
		});
		expect(container).toMatchSnapshot();
	});
});
