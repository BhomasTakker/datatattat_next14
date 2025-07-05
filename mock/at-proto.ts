jest.mock("@atproto/api", () => {
	return {
		AtpAgent: jest.fn().mockImplementation(({ service }) => ({
			app: {
				bsky: {
					feed: {
						getFeed: jest.fn(),
						getPostThread: jest.fn(),
						searchPosts: jest.fn(),
					},
				},
			},
			getAuthorFeed: jest.fn(),
			login: jest.fn(),
		})),
	};
});
