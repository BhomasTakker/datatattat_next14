import { spotifyOembed } from "./spotify";
import { SpotifyOEmbedParams } from "@/types/data-structures/oembed";
import { createQueryParameters } from "../oembed-query-params";
import { OembedOptions } from "../oembed-options";

jest.mock("../oembed-query-params");

describe("spotifyOembed", () => {
	const mockQueryParams = "foo=bar&baz=qux";

	beforeEach(() => {
		(createQueryParameters as jest.Mock).mockReturnValue(mockQueryParams);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should have an empty script URL", () => {
		expect(spotifyOembed.script).toBe("");
	});

	it("should generate the correct oEmbed URL for a track", () => {
		const params: SpotifyOEmbedParams = {
			asset: "track",
			contentId: "4uLU6hMCjMI75M1A2tKUQC",
			variant: OembedOptions.spotify,
		};
		const expectedUrl =
			"https://open.spotify.com/oembed?url=" +
			encodeURIComponent(
				"https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC"
			) +
			`&${mockQueryParams}`;

		const result = spotifyOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
		expect(createQueryParameters).toHaveBeenCalled();
	});

	it("should generate the correct oEmbed URL for an album", () => {
		const params: SpotifyOEmbedParams = {
			asset: "album",
			contentId: "1DFixLWuPkv3KT3TnV35m3",
			variant: OembedOptions.spotify,
		};
		const expectedUrl =
			"https://open.spotify.com/oembed?url=" +
			encodeURIComponent(
				"https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3"
			) +
			`&${mockQueryParams}`;

		const result = spotifyOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
	});

	it("should generate the correct oEmbed URL for a playlist", () => {
		const params: SpotifyOEmbedParams = {
			asset: "playlist",
			contentId: "37i9dQZF1DXcBWIGoYBM5M",
			variant: OembedOptions.spotify,
		};
		const expectedUrl =
			"https://open.spotify.com/oembed?url=" +
			encodeURIComponent(
				"https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
			) +
			`&${mockQueryParams}`;

		const result = spotifyOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
	});

	it("should encode special characters in asset and contentId", () => {
		const params: SpotifyOEmbedParams = {
			asset: "track+special",
			contentId: "content/id?with&special=chars",
			variant: OembedOptions.spotify,
		};
		const expectedSpotifyUrl =
			"https://open.spotify.com/track+special/content/id?with&special=chars";
		const expectedUrl =
			"https://open.spotify.com/oembed?url=" +
			encodeURIComponent(expectedSpotifyUrl) +
			`&${mockQueryParams}`;

		const result = spotifyOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
	});

	it("should call createQueryParameters when generating the URL", () => {
		const params: SpotifyOEmbedParams = {
			asset: "artist",
			contentId: "0OdUWJ0sBjDrqHygGUXeCF",
			variant: OembedOptions.spotify,
		};

		spotifyOembed.createUrl(params);
		expect(createQueryParameters).toHaveBeenCalled();
	});

	it("should handle empty asset and contentId", () => {
		const params: SpotifyOEmbedParams = {
			asset: "",
			contentId: "",
			variant: OembedOptions.spotify,
		};
		const expectedUrl =
			"https://open.spotify.com/oembed?url=" +
			encodeURIComponent("https://open.spotify.com//") +
			`&${mockQueryParams}`;

		const result = spotifyOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
	});
});
