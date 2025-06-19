import "@testing-library/jest-dom";

jest.mock("cheerio", () => {
	return {
		__esModule: true,
		load: jest.fn((str) => ({
			text: jest.fn(() => str),
		})),
	};
});
