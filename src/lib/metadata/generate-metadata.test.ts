import { generateMetaDataFromPage } from "./generate-metadata";
import { getMetadataForRoute } from "../../actions/page/page-actions";
import { Metadata as MetadataType } from "../../types/page";

// Mock getMetadataForRoute
jest.mock("../../actions/page/page-actions", () => ({
	getMetadataForRoute: jest.fn(),
}));

const mockGetMetadataForRoute = getMetadataForRoute as jest.MockedFunction<
	typeof getMetadataForRoute
>;

describe("generateMetaDataFromPage", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns empty object if no metadata is found", async () => {
		// @ts-expect-error - we need to pass undefined to the mock
		mockGetMetadataForRoute.mockResolvedValueOnce(undefined);
		const result = await generateMetaDataFromPage("/test");
		expect(result).toEqual({});
	});

	it("returns empty object if createMetaData is false", async () => {
		const meta: Partial<MetadataType> = {
			createMetaData: false,
		};
		mockGetMetadataForRoute.mockResolvedValueOnce(meta);
		const result = await generateMetaDataFromPage("/test");
		expect(result).toEqual({});
	});

	it("returns metadata with openGraph and twitter when showCardData and cardData are present", async () => {
		const meta: Partial<MetadataType> = {
			pageTitle: "Test Title",
			pageDescription: "Test Description",
			pageKeywords: "test,jest",
			pageImage: "image.png",
			favIcons: [
				{
					favIcon: {
						rel: "icon",
						href: "/favicon.ico",
						type: "image/x-icon",
						sizes: "16x16",
					},
				},
			],
			showCardData: true,
			cardData: {
				title: "Card Title",
				description: "Card Description",
				image: "card.png",
				url: "https://example.com",
				locale: "en_US",
				site_name: "Example",
				"image:alt": "Card Alt",
			},
			createMetaData: true,
		};
		mockGetMetadataForRoute.mockResolvedValueOnce(meta);

		const result = await generateMetaDataFromPage("/test");

		expect(result.title).toBe(meta.pageTitle);
		expect(result.description).toBe(meta.pageDescription);
		expect(result.keywords).toEqual(meta.pageKeywords);

		expect(result.openGraph).toEqual({
			title: "Card Title",
			description: "Card Description",
			image: "card.png",
			url: "https://example.com",
			type: "website",
			locale: "en_US",
			site_name: "Example",
			videos: [],
			audio: [],
			images: [
				{
					url: "card.png",
					alt: "Card Alt",
				},
			],
		});

		expect(result.twitter).toEqual({
			card: "summary_large_image",
			title: "Card Title",
			description: "Card Description",
			creator: "@datatattat",
			images: [
				{
					url: "card.png",
					alt: "Card Alt",
				},
			],
		});

		expect(result.icons).toEqual({
			other: [
				{
					rel: "icon",
					url: "/favicon.ico",
					type: "image/x-icon",
					sizes: "16x16",
				},
			],
		});
	});

	it("returns metadata without openGraph and twitter when showCardData is false", async () => {
		const meta: Partial<MetadataType> = {
			pageTitle: "Test Title",
			pageDescription: "Test Description",
			pageKeywords: "test,jest",
			favIcons: [],
			showCardData: false,
			createMetaData: true,
		};
		mockGetMetadataForRoute.mockResolvedValueOnce(meta);

		const result = await generateMetaDataFromPage("/test");

		expect(result.openGraph).toBeUndefined();
		expect(result.twitter).toBeUndefined();
	});

	it("handles missing favIcons gracefully", async () => {
		const meta: Partial<MetadataType> = {
			pageTitle: "Test Title",
			pageDescription: "Test Description",
			pageKeywords: "test",
			showCardData: false,
			createMetaData: true,
		};
		mockGetMetadataForRoute.mockResolvedValueOnce(meta);

		const result = await generateMetaDataFromPage("/test");

		expect(result.icons).toEqual({ other: [] });
	});
});
