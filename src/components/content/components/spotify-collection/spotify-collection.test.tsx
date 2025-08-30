import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SpotifyCollection } from "./spotify-collection";
import { SpotifyCollectionVariants } from "./variant-map";
import type { ComponentProps } from "@/types/component";
import type { OEmbed } from "@/types/data-structures/oembed";
import { ContainerHeightOptions } from "../../../page/components/stack/types";

// Mock the variant-map
jest.mock("./variant-map", () => ({
	SpotifyCollectionVariants: {
		SpotifyOembed: "spotify-oembed",
		SpotifyAudioStack: "spotify-audio-stack",
	},
	VariantsMap: new Map([
		[
			"spotify-oembed",
			{
				renderMethod: jest.fn((items: any[], options: any) => (
					<div data-testid="mock-spotify-oembed">
						{items.map((item, index) => (
							<div key={index} data-testid="mock-oembed-item">
								{item.title || item.name}
							</div>
						))}
						<div data-testid="height-option">{options.height}</div>
					</div>
				)),
				styles: {
					root: "mock-oembed-root-styles",
				},
			},
		],
		[
			"spotify-audio-stack",
			{
				renderMethod: jest.fn((items: any[], options: any) => (
					<div data-testid="mock-audio-stack">
						{items.map((item, index) => (
							<div key={index} data-testid="mock-audio-item">
								{item.title || item.name}
							</div>
						))}
						<div data-testid="height-option">{options.height}</div>
					</div>
				)),
				styles: {
					root: "mock-audio-stack-root-styles",
				},
			},
		],
	]),
}));

describe("SpotifyCollection Test Suite", () => {
	const mockSpotifyOembedItems: OEmbed[] = [
		{
			id: "1",
			title: "Test Spotify Album",
			type: "rich",
			version: "1.0",
			provider_name: "Spotify",
			provider_url: "https://spotify.com",
			html: '<iframe src="https://open.spotify.com/embed/album/123"></iframe>',
			width: 300,
			height: 152,
		},
		{
			id: "2",
			title: "Test Spotify Track",
			type: "rich",
			version: "1.0",
			provider_name: "Spotify",
			provider_url: "https://spotify.com",
			html: '<iframe src="https://open.spotify.com/embed/track/456"></iframe>',
			width: 300,
			height: 152,
		},
	];

	const mockSpotifyAudioItems = [
		{
			id: "test-track-1",
			title: "Test Song 1",
			src: "https://spotify.com/track1",
			description: "Test Description 1",
			guid: "guid-track-1",
			variant: "spotify-track",
			media: {
				type: "track",
			},
		},
		{
			id: "test-album-1",
			title: "Test Album 1",
			src: "https://spotify.com/album1",
			description: "Test Album Description",
			guid: "guid-album-1",
			variant: "spotify-album",
			media: {
				type: "album",
			},
		},
	];

	const createMockProps = (
		items: any[],
		variantType: string = SpotifyCollectionVariants.SpotifyOembed,
		additionalProps: any = {}
	): ComponentProps => ({
		component: {
			componentProps: {
				variantType,
				...additionalProps,
			},
		} as any,
		dataObject: {
			data: {
				items,
			},
		},
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	describe("Basic Rendering", () => {
		it("should render SpotifyOembed variant correctly", () => {
			const props = createMockProps(
				mockSpotifyOembedItems,
				SpotifyCollectionVariants.SpotifyOembed
			);
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("spotify-oembed")).toBeInTheDocument();
			expect(screen.getByTestId("spotify-oembed")).toHaveClass(
				"mock-oembed-root-styles"
			);
		});

		it("should render SpotifyAudioStack variant correctly", () => {
			const props = createMockProps(
				mockSpotifyAudioItems,
				SpotifyCollectionVariants.SpotifyAudioStack
			);
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("spotify-audio-stack")).toBeInTheDocument();
			expect(screen.getByTestId("spotify-audio-stack")).toHaveClass(
				"mock-audio-stack-root-styles"
			);
		});

		it("should return null when variant is not found", () => {
			const props = createMockProps(
				mockSpotifyOembedItems,
				"invalid-spotify-variant"
			);
			const { container } = render(<SpotifyCollection {...props} />);

			expect(container.firstChild).toBeNull();
		});

		it("should handle undefined variantType", () => {
			const props: ComponentProps = {
				component: {
					componentProps: {},
				} as any,
				dataObject: {
					data: {
						items: mockSpotifyOembedItems,
					},
				},
			};
			const { container } = render(<SpotifyCollection {...props} />);

			expect(container.firstChild).toBeNull();
		});
	});

	describe("Items Rendering", () => {
		it("should render Spotify oembed items using the variant render method", () => {
			const props = createMockProps(
				mockSpotifyOembedItems,
				SpotifyCollectionVariants.SpotifyOembed
			);
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("mock-spotify-oembed")).toBeInTheDocument();
			expect(screen.getAllByTestId("mock-oembed-item")).toHaveLength(2);
			expect(screen.getByText("Test Spotify Album")).toBeInTheDocument();
			expect(screen.getByText("Test Spotify Track")).toBeInTheDocument();
		});

		it("should render Spotify audio items using the variant render method", () => {
			const props = createMockProps(
				mockSpotifyAudioItems,
				SpotifyCollectionVariants.SpotifyAudioStack
			);
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("mock-audio-stack")).toBeInTheDocument();
			expect(screen.getAllByTestId("mock-audio-item")).toHaveLength(2);
			expect(screen.getByText("Test Song 1")).toBeInTheDocument();
			expect(screen.getByText("Test Album 1")).toBeInTheDocument();
		});

		it("should handle empty items array", () => {
			const props = createMockProps(
				[],
				SpotifyCollectionVariants.SpotifyOembed
			);
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("spotify-oembed")).toBeInTheDocument();
			expect(screen.getByTestId("mock-spotify-oembed")).toBeInTheDocument();
			expect(screen.queryAllByTestId("mock-oembed-item")).toHaveLength(0);
		});

		it("should handle missing items property", () => {
			const props: ComponentProps = {
				component: {
					componentProps: {
						variantType: SpotifyCollectionVariants.SpotifyOembed,
					},
				} as any,
				dataObject: {
					data: {},
				},
			};
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("spotify-oembed")).toBeInTheDocument();
			expect(screen.queryAllByTestId("mock-oembed-item")).toHaveLength(0);
		});

		it("should handle undefined dataObject", () => {
			const props: ComponentProps = {
				component: {
					componentProps: {
						variantType: SpotifyCollectionVariants.SpotifyOembed,
					},
				} as any,
				dataObject: undefined as any,
			};
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("spotify-oembed")).toBeInTheDocument();
			expect(screen.queryAllByTestId("mock-oembed-item")).toHaveLength(0);
		});
	});

	describe("Props Passing", () => {
		it("should pass additional props to render method for SpotifyOembed", () => {
			const additionalProps = {
				height: ContainerHeightOptions.LG,
				customProp: "test-value",
			};
			const props = createMockProps(
				mockSpotifyOembedItems,
				SpotifyCollectionVariants.SpotifyOembed,
				additionalProps
			);
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.LG
			);
		});

		it("should pass additional props to render method for SpotifyAudioStack", () => {
			const additionalProps = {
				height: ContainerHeightOptions.SM,
				customProp: "test-value",
			};
			const props = createMockProps(
				mockSpotifyAudioItems,
				SpotifyCollectionVariants.SpotifyAudioStack,
				additionalProps
			);
			render(<SpotifyCollection {...props} />);

			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.SM
			);
		});

		it("should exclude variantType from props passed to render method", () => {
			const { VariantsMap } = require("./variant-map");
			const mockVariant = VariantsMap.get("spotify-oembed");

			const props = createMockProps(
				mockSpotifyOembedItems,
				SpotifyCollectionVariants.SpotifyOembed,
				{ height: ContainerHeightOptions.MD, customProp: "test" }
			);
			render(<SpotifyCollection {...props} />);

			// Check that renderMethod was called with the correct arguments
			expect(mockVariant.renderMethod).toHaveBeenCalledWith(
				mockSpotifyOembedItems,
				{
					height: ContainerHeightOptions.MD,
					customProp: "test",
				}
			);
		});
	});

	describe("Component Structure", () => {
		it("should render with correct data-testid attribute", () => {
			const props = createMockProps(
				mockSpotifyOembedItems,
				SpotifyCollectionVariants.SpotifyOembed
			);
			render(<SpotifyCollection {...props} />);

			const container = screen.getByTestId("spotify-oembed");
			expect(container).toBeInTheDocument();
		});

		it("should apply correct CSS classes from variant styles", () => {
			const props = createMockProps(
				mockSpotifyAudioItems,
				SpotifyCollectionVariants.SpotifyAudioStack
			);
			render(<SpotifyCollection {...props} />);

			const container = screen.getByTestId("spotify-audio-stack");
			expect(container).toHaveClass("mock-audio-stack-root-styles");
		});
	});

	describe("Error Handling", () => {
		it("should handle null componentProps", () => {
			const props: ComponentProps = {
				component: {
					componentProps: null,
				} as any,
				dataObject: {
					data: {
						items: mockSpotifyOembedItems,
					},
				},
			};
			const { container } = render(<SpotifyCollection {...props} />);

			expect(container.firstChild).toBeNull();
		});

		it("should handle missing component property", () => {
			const props: ComponentProps = {
				component: {} as any,
				dataObject: {
					data: {
						items: mockSpotifyOembedItems,
					},
				},
			};
			const { container } = render(<SpotifyCollection {...props} />);

			expect(container.firstChild).toBeNull();
		});

		it("should handle variant with missing styles", () => {
			const { VariantsMap } = require("./variant-map");
			const originalVariant = VariantsMap.get("spotify-oembed");

			// Mock variant with empty styles object
			VariantsMap.set("spotify-oembed", {
				renderMethod: originalVariant.renderMethod,
				styles: { root: "" },
			});

			const props = createMockProps(
				mockSpotifyOembedItems,
				SpotifyCollectionVariants.SpotifyOembed
			);

			// Should render without error
			const { container } = render(<SpotifyCollection {...props} />);
			expect(container.firstChild).toBeInTheDocument();

			// Restore original variant
			VariantsMap.set("spotify-oembed", originalVariant);
		});
	});

	describe("Snapshot Testing", () => {
		it("should match snapshot for SpotifyOembed variant", () => {
			const props = createMockProps(
				mockSpotifyOembedItems,
				SpotifyCollectionVariants.SpotifyOembed
			);
			const { container } = render(<SpotifyCollection {...props} />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("should match snapshot for SpotifyAudioStack variant", () => {
			const props = createMockProps(
				mockSpotifyAudioItems,
				SpotifyCollectionVariants.SpotifyAudioStack
			);
			const { container } = render(<SpotifyCollection {...props} />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("should match snapshot for null case", () => {
			const props = createMockProps(mockSpotifyOembedItems, "invalid-variant");
			const { container } = render(<SpotifyCollection {...props} />);

			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
