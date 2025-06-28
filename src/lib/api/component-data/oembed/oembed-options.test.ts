import { getOembedObject, OembedOptions } from "./oembed-options";
import { twitterOembed } from "./options/twitter";
import { blueskyOembed } from "./options/bluesky";

describe("getOembedObject", () => {
	it("returns twitterOembed for OembedOptions.twitter", () => {
		const result = getOembedObject(OembedOptions.twitter);
		expect(result).toBe(twitterOembed);
	});

	it("returns blueskyOembed for OembedOptions.bluesky", () => {
		const result = getOembedObject(OembedOptions.bluesky);
		expect(result).toBe(blueskyOembed);
	});

	it("returns null and logs error for unknown option", () => {
		const invalidOption = "invalid";
		const consoleSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		// @ts-expect-error purposely passing invalid enum value
		const result = getOembedObject(invalidOption);
		expect(result).toBeNull();
		expect(consoleSpy).toHaveBeenCalledWith(
			"Oembed option not found:",
			invalidOption
		);
		consoleSpy.mockRestore();
	});
});
