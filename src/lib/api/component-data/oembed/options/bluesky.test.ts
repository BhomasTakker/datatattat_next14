import { blueskyOembed } from "./bluesky";
import { createQueryParameters } from "../oembed-query-params";
import { BlueskyOEmbedParams } from "@/types/data-structures/oembed";
import { OembedOptions } from "../oembed-options";

jest.mock("../oembed-query-params");

describe("blueskyOembed", () => {
	const mockQueryParams = "foo=bar&baz=qux";
	beforeEach(() => {
		(createQueryParameters as jest.Mock).mockReturnValue(mockQueryParams);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should have the correct script URL", () => {
		expect(blueskyOembed.script).toBe("https://embed.bsky.app/static/embed.js");
	});

	it("should generate the correct oEmbed URL", () => {
		const params: BlueskyOEmbedParams = {
			account: "alice.bsky.social",
			postId: "3j6q2l7x",
			variant: OembedOptions.bluesky,
		};
		const expectedUrl =
			"https://embed.bsky.app/oembed?url=" +
			encodeURIComponent(
				"https://bsky.app/profile/alice.bsky.social/post/3j6q2l7x"
			) +
			`&${mockQueryParams}`;

		const result = blueskyOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
		expect(createQueryParameters).toHaveBeenCalled();
	});

	it("should encode special characters in account and postId", () => {
		const params: BlueskyOEmbedParams = {
			account: "bob+bsky@social",
			postId: "id/with?special&chars",
			variant: OembedOptions.bluesky,
		};
		const expectedProfileUrl =
			"https://bsky.app/profile/bob+bsky@social/post/id/with?special&chars";
		const expectedUrl =
			"https://embed.bsky.app/oembed?url=" +
			encodeURIComponent(expectedProfileUrl) +
			`&${mockQueryParams}`;

		const result = blueskyOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
	});
});
