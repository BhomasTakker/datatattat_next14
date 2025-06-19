import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
	useRouter: jest.fn(),
}));
