import { getArticle } from "./get-article";
import {
	getArticleBySrc,
	saveOrCreateArticleBySrc,
} from "@/lib/mongo/actions/article";
import { getMeta } from "@/actions/html/get-meta";
import { validateArticleData } from "./utils";
import { initialiseServices } from "@/lib/services/intialise-services";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

jest.mock("../../../lib/mongo/actions/article");
jest.mock("../../../actions/html/get-meta");
jest.mock("./utils");
jest.mock("../../../lib/services/intialise-services");
jest.mock("../../../utils/object", () => ({
	cloneDeep: (obj: any) => JSON.parse(JSON.stringify(obj)),
}));
jest.mock("cheerio", () => {
	return {
		__esModule: true,
		load: jest.fn((str) => ({
			text: jest.fn(() => str),
		})),
	};
});

const mockInitialiseServices = initialiseServices as jest.Mock;
const mockGetArticleBySrc = getArticleBySrc as jest.Mock;
const mockSaveOrCreateArticleBySrc = saveOrCreateArticleBySrc as jest.Mock;
const mockGetMeta = getMeta as jest.Mock;
const mockValidateArticleData = validateArticleData as jest.Mock;

describe("getArticle", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockInitialiseServices.mockResolvedValue(undefined);
	});

	it("returns existing article if found in DB", async () => {
		const article = { src: "test-src", title: "Test", details: {} };
		mockGetArticleBySrc.mockResolvedValue(article);

		const result = await getArticle({ src: "test-src" });

		expect(mockInitialiseServices).toHaveBeenCalled();
		expect(mockGetArticleBySrc).toHaveBeenCalledWith("test-src");
		expect(result).toEqual(article);
	});

	it("returns null if meta cannot be fetched", async () => {
		mockGetArticleBySrc.mockResolvedValue(null);
		mockGetMeta.mockResolvedValue(null);

		const result = await getArticle({ src: "no-meta-src" });

		expect(mockGetMeta).toHaveBeenCalledWith("no-meta-src");
		expect(result).toBeNull();
	});

	it("creates and saves new article if not found and meta is available", async () => {
		mockGetArticleBySrc.mockResolvedValue(null);
		mockGetMeta.mockResolvedValue({
			title: "Meta Title",
			description: "Meta Desc",
			image: "img.png",
			imageAlt: "alt",
			type: "article",
		});
		mockValidateArticleData.mockReturnValue(true);

		const result = await getArticle({
			src: "new-src",
			// @ts-expect-error - details is mocked
			details: { foo: "bar" },
		});

		expect(mockGetMeta).toHaveBeenCalledWith("new-src");
		expect(mockValidateArticleData).toHaveBeenCalled();
		expect(mockSaveOrCreateArticleBySrc).toHaveBeenCalled();
		expect(result).toMatchObject({
			title: "Meta Title",
			src: "new-src",
			description: "Meta Desc",
			guid: "",
			variant: "article",
			details: { foo: "bar" },
			avatar: { src: "img.png", alt: "alt" },
		});
	});

	it("does not save article if validation fails", async () => {
		mockGetArticleBySrc.mockResolvedValue(null);
		mockGetMeta.mockResolvedValue({
			title: "Meta Title",
			description: "Meta Desc",
			image: "img.png",
			imageAlt: "alt",
			type: "article",
		});
		mockValidateArticleData.mockReturnValue(false);

		const result = await getArticle({ src: "invalid-src" });

		expect(mockValidateArticleData).toHaveBeenCalled();
		expect(mockSaveOrCreateArticleBySrc).not.toHaveBeenCalled();
		expect(result).toMatchObject({
			title: "Meta Title",
			src: "invalid-src",
			description: "Meta Desc",
			guid: "",
			variant: "article",
			avatar: { src: "img.png", alt: "alt" },
		});
	});

	it("handles errors during save gracefully", async () => {
		mockGetArticleBySrc.mockResolvedValue(null);
		mockGetMeta.mockResolvedValue({
			title: "Meta Title",
			description: "Meta Desc",
			image: "img.png",
			imageAlt: "alt",
			type: "article",
		});
		mockValidateArticleData.mockReturnValue(true);
		mockSaveOrCreateArticleBySrc.mockImplementation(() => {
			throw new Error("DB error");
		});

		const result = await getArticle({ src: "error-src" });

		expect(result).toMatchObject({
			title: "Meta Title",
			src: "error-src",
			description: "Meta Desc",
			guid: "",
			variant: "article",
			avatar: { src: "img.png", alt: "alt" },
		});
	});
});
