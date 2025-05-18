import { createLinks, getParentId, randomKeyGenerator } from "./edit";

describe("Edit Utils", () => {
	describe("getParentId", () => {
		it("returns the object parent id from a given identifier - using . as a delimeter.", () => {
			const id = "a.b.c.d.e";
			const expected = "a.b.c.d";
			const result = getParentId(id);
			expect(result).toEqual(expected);
		});
		it("returns an empty string when there is no parent id.", () => {
			const id = "a";
			const expected = "";
			const result = getParentId(id);
			expect(result).toEqual(expected);
		});
		it("returns an empty string when an empty string is provided.", () => {
			const id = "";
			const expected = "";
			const result = getParentId(id);
			expect(result).toEqual(expected);
		});
	});
	describe("randomKeyGenerator", () => {
		it("returns a random string of 5 characters", () => {
			const result = randomKeyGenerator();
			expect(result).toHaveLength(5);
		});
		it("returns a unique random characters", () => {
			const result = randomKeyGenerator();
			const result2 = randomKeyGenerator();
			expect(result).not.toEqual(result2);
		});
	});
	describe("createLinks", () => {
		it("returns an array of objects with label and route properties", () => {
			const header = {
				label1: "label1",
				label2: "label2",
				route1: "/route1",
				route2: "/route2",
			};
			const expected = [
				{ label: "label1", route: "/route1" },
				{ label: "label2", route: "/route2" },
			];
			const result = createLinks(header);
			expect(result).toEqual(expected);
		});
	});
});
