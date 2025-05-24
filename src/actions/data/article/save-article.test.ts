import { saveOrUpdateArticle } from "./save-article";
import { saveOrCreateArticleBySrc } from "@/lib/mongo/actions/article";
import { initialiseServices } from "@/lib/services/intialise-services";
import { validateArticleData } from "./utils";

jest.mock("../../../lib/mongo/actions/article", () => ({
	saveOrCreateArticleBySrc: jest.fn(),
}));
jest.mock("../../../lib/services/intialise-services", () => ({
	initialiseServices: jest.fn(),
}));
jest.mock("./utils", () => ({
	validateArticleData: jest.fn(),
}));

describe("saveOrUpdateArticle", () => {
	const mockItem = { id: "1", title: "Test Article" };

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should validate the article data", async () => {
		(validateArticleData as jest.Mock).mockReturnValue(true);
		(saveOrCreateArticleBySrc as jest.Mock).mockResolvedValue({
			success: true,
		});

		// @ts-expect-error missing data in mock
		await saveOrUpdateArticle(mockItem);

		expect(validateArticleData).toHaveBeenCalledWith(mockItem);
	});

	it("should call initialiseServices and saveOrCreateArticleBySrc if validation passes", async () => {
		(validateArticleData as jest.Mock).mockReturnValue(true);
		(saveOrCreateArticleBySrc as jest.Mock).mockResolvedValue({
			success: true,
		});

		// @ts-expect-error missing data in mock
		const result = await saveOrUpdateArticle(mockItem);

		expect(initialiseServices).toHaveBeenCalled();
		expect(saveOrCreateArticleBySrc).toHaveBeenCalledWith(mockItem);
		expect(result).toEqual({ success: true });
	});

	it("should not call initialiseServices or saveOrCreateArticleBySrc if validation fails", async () => {
		(validateArticleData as jest.Mock).mockReturnValue(false);

		// @ts-expect-error missing data in mock
		const result = await saveOrUpdateArticle(mockItem);

		expect(initialiseServices).not.toHaveBeenCalled();
		expect(saveOrCreateArticleBySrc).not.toHaveBeenCalled();
		expect(result).toBeNull();
	});
});
