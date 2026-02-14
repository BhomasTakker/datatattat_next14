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

	it("returns metadata with openGraph and twitter when createMetaData is true", async () => {
		const meta: Partial<MetadataType> = {
			pageTitle: "Test Title",
			pageDescription: "Test Description",
			pageKeywords: "test,jest",
			pageImage: "image.png",
			"image:alt": "Card Alt",
			locale: "en_US",
			site_name: "Example",
			url: "https://example.com",
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
			createMetaData: true,
		};
		mockGetMetadataForRoute.mockResolvedValueOnce(meta);

		const result = await generateMetaDataFromPage("/test");

		expect(result.title).toBe(meta.pageTitle);
		expect(result.description).toBe(meta.pageDescription);
		expect(result.keywords).toEqual(meta.pageKeywords);

		expect(result.openGraph).toEqual({
			title: "Test Title",
			description: "Test Description",
			image: "image.png",
			url: "https://example.com",
			type: "website",
			locale: "en_US",
			site_name: "Example",
			videos: [],
			audio: [],
			images: [
				{
					url: "image.png",
					alt: "Card Alt",
				},
			],
		});

		expect(result.twitter).toEqual({
			card: "summary_large_image",
			site: "@datatattat",
			title: "Test Title",
			description: "Test Description",
			creator: "@datatattat",
			images: [
				{
					url: "https://Exampleimage.png",
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

	it("returns metadata with openGraph and twitter when createMetaData is true", async () => {
		const meta: Partial<MetadataType> = {
			pageTitle: "Test Title",
			pageDescription: "Test Description",
			pageKeywords: "test,jest",
			pageImage: "image.png",
			"image:alt": "Card Alt",
			locale: "en_US",
			site_name: "Example",
			url: "https://example.com",
			favIcons: [],
			createMetaData: true,
		};
		mockGetMetadataForRoute.mockResolvedValueOnce(meta);

		const result = await generateMetaDataFromPage("/test");

		expect(result.openGraph).toBeDefined();
		expect(result.twitter).toBeDefined();
	});

	it("handles missing favIcons gracefully", async () => {
		const meta: Partial<MetadataType> = {
			pageTitle: "Test Title",
			pageDescription: "Test Description",
			pageKeywords: "test",
			pageImage: "image.png",
			"image:alt": "Card Alt",
			locale: "en_US",
			site_name: "Example",
			url: "https://example.com",
			createMetaData: true,
		};
		mockGetMetadataForRoute.mockResolvedValueOnce(meta);

		const result = await generateMetaDataFromPage("/test");

		expect(result.icons).toEqual({ other: [] });
	});
});
