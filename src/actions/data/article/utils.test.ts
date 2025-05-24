import { validateArticleData } from "./utils";
import { Avatar } from "@/types/data-structures/collection/base";

describe("validateArticleData", () => {
	const mockAvatar: Avatar = {
		id: "1",
		url: "avatar.png",
	} as unknown as Avatar;

	it("returns true when both title and avatar are present", () => {
		expect(
			validateArticleData({ title: "Test Title", avatar: mockAvatar })
		).toBe(true);
	});

	it("returns false when title is missing", () => {
		expect(validateArticleData({ avatar: mockAvatar })).toBe(false);
	});

	it("returns false when avatar is missing", () => {
		expect(validateArticleData({ title: "Test Title" })).toBe(false);
	});

	it("returns false when both title and avatar are missing", () => {
		expect(validateArticleData({})).toBe(false);
	});

	it("returns false when title is null", () => {
		expect(validateArticleData({ title: null, avatar: mockAvatar })).toBe(
			false
		);
	});

	it("returns false when avatar is null", () => {
		expect(validateArticleData({ title: "Test Title", avatar: null })).toBe(
			false
		);
	});

	it("returns false when input is undefined", () => {
		// @ts-expect-error testing undefined input
		expect(validateArticleData(undefined)).toBe(false);
	});

	it("returns false when input is null", () => {
		// @ts-expect-error testing null input
		expect(validateArticleData(null)).toBe(false);
	});
});
