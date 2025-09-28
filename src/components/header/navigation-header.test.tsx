import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { NavigationHeader } from "./navigation-header";
import { getServerSession } from "next-auth";

jest.mock("./user-menu/user-menu", () => {
	return {
		UserMenu: () => {
			return <div>User Menu</div>;
		},
	};
});

jest.mock("next-auth", () => {
	return {
		getServerSession: jest.fn().mockResolvedValue({
			user: {
				user_id: "user_id",
			},
		}),
	};
});

jest.mock("../../app/api/auth/[...nextauth]/options", () => {
	return {
		options: {},
	};
});
// copilot did this!
jest.mock("../../lib/mongo/actions/user/user", () => {
	return {
		getUserById: jest.fn().mockResolvedValue({
			role: "role",
			username: "username",
			avatar: "avatar",
		}),
	};
});

describe("Navigation Header Test Suite", () => {
	it("renders a nav element", async () => {
		render(await NavigationHeader());
		await waitFor(() => {
			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();
		});
	});

	it("renders a logo", async () => {
		render(await NavigationHeader());
		await waitFor(() => {
			const logo = screen.getByLabelText("Home");
			expect(logo).toBeInTheDocument();
		});
	});

	it("renders Site Name", async () => {
		render(await NavigationHeader());
		await waitFor(() => {
			const datatattat = screen.getByText("DATATATTAT");
			expect(datatattat).toBeInTheDocument();
		});
	});

	it("renders User Menu when signed in", async () => {
		render(await NavigationHeader());
		await waitFor(() => {
			const userMenu = screen.getByText("User Menu");
			expect(userMenu).toBeInTheDocument();
		});
	});

	it("renders Sign In Button when not signed in", async () => {
		(getServerSession as jest.Mock).mockResolvedValueOnce(false);
		render(await NavigationHeader());
		await waitFor(() => {
			const signInButton = screen.getByTestId("sign-in");
			expect(signInButton).toBeInTheDocument();
		});
	});

	it("renders signed in navigation header unchanged", async () => {
		const { container } = render(await NavigationHeader());
		expect(container).toMatchSnapshot();
	});

	it("renders signed out navigation header unchanged", async () => {
		(getServerSession as jest.Mock).mockResolvedValueOnce(false);
		const { container } = render(await NavigationHeader());

		expect(container).toMatchSnapshot();
	});
});
