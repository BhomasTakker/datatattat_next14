import { twitterOembed } from "./twitter";
import { TwitterOEmbedParams } from "@/types/data-structures/oembed";
import { createQueryParameters } from "../oembed-query-params";
import { OembedOptions } from "../oembed-options";

jest.mock("../oembed-query-params", () => ({
	createQueryParameters: jest.fn(() => "foo=bar&baz=qux"),
}));

describe("twitterOembed", () => {
	it("should have the correct script URL", () => {
		expect(twitterOembed.script).toBe(
			"https://platform.twitter.com/widgets.js"
		);
	});

	it("should generate the correct oEmbed URL with given params", () => {
		const params: TwitterOEmbedParams = {
			account: "testuser",
			tweetId: "1234567890",
			variant: OembedOptions.twitter,
		};
		const expectedUrl =
			"https://publish.twitter.com/oembed?url=" +
			encodeURIComponent("https://x.com/testuser/status/1234567890") +
			"&foo=bar&baz=qux";

		const result = twitterOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
	});

	it("should call createQueryParameters when generating the URL", () => {
		const params: TwitterOEmbedParams = {
			account: "anotheruser",
			tweetId: "0987654321",
			variant: OembedOptions.twitter,
		};
		twitterOembed.createUrl(params);
		expect(createQueryParameters).toHaveBeenCalled();
	});

	it("should encode the tweet URL correctly", () => {
		const params: TwitterOEmbedParams = {
			account: "user with spaces",
			tweetId: "tweet/with/slash",
			variant: OembedOptions.twitter,
		};
		const result = twitterOembed.createUrl(params);
		expect(result).toContain(
			encodeURIComponent(
				"https://x.com/user with spaces/status/tweet/with/slash"
			)
		);
	});
});
