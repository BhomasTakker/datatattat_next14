import { blueSkyFetch } from "./index";
import { BlueskyVariant } from "./utils";
import * as feedModule from "./feed";
import * as searchModule from "./search";
import * as threadModule from "./thread";

jest.mock("./feed");
jest.mock("./search");
jest.mock("./thread");

describe("blueSkyFetch", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("fetches feed when variant is Feed", async () => {
		const mockItems = [{ id: 1 }];
		(feedModule.getFeed as jest.Mock).mockResolvedValue(mockItems);

		const result = await blueSkyFetch({
			variant: BlueskyVariant.Feed,
			feed: "test-feed",
		});

		expect(feedModule.getFeed).toHaveBeenCalledWith(
			expect.objectContaining({ feed: "test-feed" })
		);
		expect(result).toEqual({ items: mockItems });
	});

	it("fetches author feed when variant is AuthorFeed", async () => {
		const mockItems = [{ id: 2 }];
		(feedModule.getAuthorFeed as jest.Mock).mockResolvedValue(mockItems);

		const result = await blueSkyFetch({
			variant: BlueskyVariant.AuthorFeed,
			actor: "did:example:123",
		});

		expect(feedModule.getAuthorFeed).toHaveBeenCalledWith(
			expect.objectContaining({ actor: "did:example:123" })
		);
		expect(result).toEqual({ items: mockItems });
	});

	it("fetches post thread when variant is Thread", async () => {
		const mockItems = [{ id: 3 }];
		(threadModule.getPostThread as jest.Mock).mockResolvedValue(mockItems);

		const result = await blueSkyFetch({
			variant: BlueskyVariant.Thread,
			uri: "at://post-uri",
		});

		expect(threadModule.getPostThread).toHaveBeenCalledWith(
			expect.objectContaining({ uri: "at://post-uri" })
		);
		expect(result).toEqual({ items: mockItems });
	});

	it("searches posts when variant is Search", async () => {
		const mockItems = [{ id: 4 }];
		(searchModule.searchPosts as jest.Mock).mockResolvedValue(mockItems);

		const result = await blueSkyFetch({
			variant: BlueskyVariant.Search,
			cursor: "abc",
			limit: 10,
		});

		expect(searchModule.searchPosts).toHaveBeenCalledWith(
			expect.objectContaining({ cursor: "abc", limit: 10 })
		);
		expect(result).toEqual({ items: mockItems });
	});

	it("defaults to Feed variant if not provided", async () => {
		const mockItems = [{ id: 5 }];
		(feedModule.getFeed as jest.Mock).mockResolvedValue(mockItems);

		const result = await blueSkyFetch({ feed: "default-feed" });

		expect(feedModule.getFeed).toHaveBeenCalledWith(
			expect.objectContaining({ feed: "default-feed" })
		);
		expect(result).toEqual({ items: mockItems });
	});

	it("returns empty items for unknown variant", async () => {
		// @ts-expect-error: testing invalid variant
		const result = await blueSkyFetch({ variant: "UnknownVariant" });

		expect(result).toEqual({ items: [] });
	});
});
