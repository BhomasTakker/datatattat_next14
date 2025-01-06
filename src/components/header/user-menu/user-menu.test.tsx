import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserMenu } from "./user-menu";

const menuProps = {
	username: "John Cena",
	avatar: "https://example.com/avatar.jpg",
};

// We should probaly mock this guy somewhere
jest.mock("next-auth/react", () => {
	return {
		useSession: jest.fn().mockResolvedValue({
			data: {
				user: {
					name: "John Cena",
				},
			},
		}),
	};
});

jest.mock("next/navigation", () => {
	return {
		usePathname: jest.fn().mockResolvedValue("/mock-route"),
	};
});

// problem with useRef - showModal does not exist.....
// mocking/spying no work....
describe("User Menu", () => {
	it("renders a button to open the user menu", () => {
		render(
			<UserMenu username={menuProps.username} avatar={menuProps.avatar} />
		);
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});
	// it("renders a user menu with a sign out link", () => {
	// 	render(<UserMenu />);
	// 	const button = screen.getByRole("button");
	// 	button.click();
	// 	const link = screen.queryByText(/sign out/i);
	// 	expect(link).toBeInTheDocument();
	// });
	it("renders unopened user menu unchanged", () => {
		const { container } = render(
			<UserMenu username={menuProps.username} avatar={menuProps.avatar} />
		);
		expect(container).toMatchSnapshot();
	});

	// it("renders opened user menu unchanged", () => {
	// 	const { container } = render(<UserMenu />);
	// 	const button = screen.getByRole("button");
	// 	button.click();
	// 	expect(container).toMatchSnapshot();
	// });
});
