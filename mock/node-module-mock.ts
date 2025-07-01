import "@testing-library/jest-dom";

jest.mock("cheerio", () => {
	return {
		__esModule: true,
		load: jest.fn((str) => ({
			text: jest.fn(() => str),
		})),
	};
});

// this is a fudge to mock the atproto api
// We were getting error regarding cannot import outside module etc
jest.mock("@atproto/api", () => {
	return {
		__esModule: true,
		AtpAgent: jest.fn().mockImplementation(() => ({
			app: {
				bsky: {
					feed: {
						getFeed: jest.fn().mockResolvedValue({
							data: {
								feed: [],
							},
						}),
						getAuthorFeed: jest.fn().mockResolvedValue({
							data: {
								feed: [],
							},
						}),
					},
				},
			},
			getAuthorFeed: jest.fn().mockResolvedValue({
				data: {
					feed: [],
				},
			}),
		})),
	};
});
