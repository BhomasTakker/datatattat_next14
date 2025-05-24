import { getHeader, saveOrCreateHeaderByRoute } from "./header";
import Header from "../../../models/Header";
import { HeaderType } from "@/types/header";

jest.mock("../../../models/Header");

const mockHeaderDoc = {
	route: "/test",
	nav: ["home", "about"],
	creator: "user1",
	createdAt: new Date("2023-01-01"),
	updatedAt: new Date("2023-01-02"),
	lean: jest.fn(),
};

describe("header actions", () => {
	beforeEach(() => {
		console.error = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getHeader", () => {
		it("returns EMPTY_HEADER if route is falsy", async () => {
			const result = (await getHeader("")) as HeaderType;
			expect(result.route).toBe("");
			expect(result.nav).toEqual([]);
		});

		it("decodes the route and queries Header", async () => {
			const leanResult = { ...mockHeaderDoc };
			(Header.findOne as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(leanResult),
			});

			const result = (await getHeader("%2Ftest")) as HeaderType;
			expect(Header.findOne).toHaveBeenCalledWith({ route: "/test" });
			expect(result.route).toBe("/test");
			expect(result.nav).toEqual(["home", "about"]);
		});

		it("returns EMPTY_HEADER if no document is found", async () => {
			(Header.findOne as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(null),
			});

			const result = (await getHeader("/notfound")) as HeaderType;
			expect(result.route).toBe("");
			expect(result.nav).toEqual([]);
		});
	});

	describe("saveOrCreateHeaderByRoute", () => {
		it("calls findOneAndUpdate with correct params", async () => {
			(Header.findOneAndUpdate as jest.Mock).mockResolvedValue({});

			const header = {
				route: "/save",
				nav: [
					{
						label: "nav1",
						route: "/nav1",
					},
				],
			};
			const creator = "user2";
			const result = await saveOrCreateHeaderByRoute(header, creator);

			expect(Header.findOneAndUpdate).toHaveBeenCalledWith(
				{ route: "/save" },
				{
					route: "/save",
					nav: [
						{
							label: "nav1",
							route: "/nav1",
						},
					],
					creator: "user2",
				},
				{ new: true, upsert: true }
			);
			expect(result).toEqual({ message: "Saved Header!" });
		});

		it("returns error message on exception", async () => {
			(Header.findOneAndUpdate as jest.Mock).mockRejectedValue(
				new Error("fail")
			);

			const header = { route: "/fail", nav: [] };
			const creator = "user3";
			const result = await saveOrCreateHeaderByRoute(header, creator);

			expect(result).toEqual({ message: "Error saving header" });
		});
	});
});
