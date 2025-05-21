import Page from "../../../models/Page";
import {
	getPageByRoute,
	saveOrCreatePageByRoute,
	getPagesByUserId,
	deletePagesByUserId,
	deletePageByRoute,
	createNewPageByRoute,
} from "./page";
import { IPage } from "../../../types/page";

jest.mock("../../../models/Page");

const mockPageDoc = {
	meta: {
		pageTitle: "Test",
		pageDescription: "Desc",
		pageKeywords: "a,b",
		pageImage: "",
		favIcons: [],
		showCardData: false,
		cardData: {},
	},
	route: "/test",
	profile: {},
	content: {},
	creator: "user1",
};

describe("page actions", () => {
	beforeEach(() => {
		console.error = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getPageByRoute", () => {
		it("should decode the route and find the page", async () => {
			(Page.findOne as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockPageDoc),
			});
			const result = await getPageByRoute("/test");
			expect(Page.findOne).toHaveBeenCalledWith({ route: "/test" });
			expect(result).toEqual(mockPageDoc);
		});
	});

	describe("saveOrCreatePageByRoute", () => {
		it("should upsert a page and return result", async () => {
			(Page.findOneAndUpdate as jest.Mock).mockResolvedValue(mockPageDoc);
			const page: IPage = { ...mockPageDoc } as unknown as IPage;
			const result = await saveOrCreatePageByRoute(page, "user1");
			expect(Page.findOneAndUpdate).toHaveBeenCalledWith(
				{ route: "/test" },
				expect.objectContaining({ creator: "user1" }),
				expect.objectContaining({ upsert: true })
			);
			expect(result).toEqual({ result: mockPageDoc, message: "Saved Page!" });
		});

		it("should handle errors and return error message", async () => {
			(Page.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error("fail"));
			const page: IPage = { ...mockPageDoc } as unknown as IPage;
			const result = await saveOrCreatePageByRoute(page, "user1");
			expect(console.error).toHaveBeenCalledTimes(1);
			expect(result).toEqual({ message: "Error saving page" });
		});
	});

	describe("getPagesByUserId", () => {
		it("should find pages by userId", async () => {
			(Page.find as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue([mockPageDoc]),
			});
			const result = await getPagesByUserId("user1");
			expect(Page.find).toHaveBeenCalledWith({ creator: "user1" });
			expect(result).toEqual([mockPageDoc]);
		});
	});

	describe("deletePagesByUserId", () => {
		it("should delete a page by userId", async () => {
			(Page.findOneAndDelete as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockPageDoc),
			});
			const result = await deletePagesByUserId("user1");
			expect(Page.findOneAndDelete).toHaveBeenCalledWith({ creator: "user1" });
			expect(result).toEqual(mockPageDoc);
		});
	});

	describe("deletePageByRoute", () => {
		it("should delete a page by route", async () => {
			(Page.findOneAndDelete as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockPageDoc),
			});
			const result = await deletePageByRoute("/test");
			expect(Page.findOneAndDelete).toHaveBeenCalledWith({ route: "/test" });
			expect(result).toEqual(mockPageDoc);
		});
	});

	describe("createNewPageByRoute", () => {
		it("should create a new page and return success", async () => {
			(Page.create as jest.Mock).mockResolvedValue({});
			const result = await createNewPageByRoute("/new", "user2");
			expect(Page.create).toHaveBeenCalledWith(
				expect.objectContaining({ route: "/new", creator: "user2" })
			);
			expect(result).toEqual({
				success: true,
				message: "Page created successfully",
			});
		});

		it("should throw error if route or userId is missing", async () => {
			await expect(createNewPageByRoute("", "user2")).rejects.toThrow(
				"Invalid route or userId"
			);
			await expect(createNewPageByRoute("/new", "")).rejects.toThrow(
				"Invalid route or userId"
			);
		});

		it("should return error message on create failure", async () => {
			(Page.create as jest.Mock).mockRejectedValue(new Error("fail"));
			const result = await createNewPageByRoute("/fail", "user2");
			expect(result).toEqual({
				success: false,
				message: "Error creating page",
			});
		});
	});
});
