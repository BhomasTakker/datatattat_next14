import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import spotifyOembed from "./oembed";
import { OEmbed } from "@/types/data-structures/oembed";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";

// Mock the SpotifyOembedComponent
jest.mock("./spotify-oembed-component", () => ({
	SpotifyOembedComponent: ({
		item,
		height,
	}: {
		item: any;
		height: ContainerHeightOptions;
	}) => (
		<div data-testid="spotify-oembed-component">
			<div data-testid="item-id">{item?.id}</div>
			<div data-testid="item-iframe-url">{item?.iframe_url}</div>
			<div data-testid="height">{height}</div>
		</div>
	),
}));

// Mock styles
jest.mock("./oembed.module.scss", () => ({
	default: {
		container: "mocked-container-class",
		item: "mocked-item-class",
	},
}));

describe("spotifyOembed", () => {
	describe("renderMethod", () => {
		const mockOembedItem: OEmbed & { iframe_url: string } = {
			id: "test-id",
			title: "Test Track",
			type: "rich",
			version: "1.0",
			provider_name: "Spotify",
			provider_url: "https://open.spotify.com",
			html: '<iframe src="https://open.spotify.com/embed/track/123" width="300" height="380"></iframe>',
			iframe_url: "https://open.spotify.com/embed/track/123",
			width: 300,
			height: 380,
		};

		it("renders SpotifyOembedComponent with the first item", () => {
			const items = [mockOembedItem];
			const options = {};

			const result = spotifyOembed.renderMethod(items, options);
			const { container } = render(<div>{result}</div>);

			expect(
				screen.getByTestId("spotify-oembed-component")
			).toBeInTheDocument();
			expect(screen.getByTestId("item-id")).toHaveTextContent("test-id");
			expect(screen.getByTestId("item-iframe-url")).toHaveTextContent(
				"https://open.spotify.com/embed/track/123"
			);
		});

		it("uses default height when no height option is provided", () => {
			const items = [mockOembedItem];
			const options = {};

			const result = spotifyOembed.renderMethod(items, options);
			render(<div>{result}</div>);

			expect(screen.getByTestId("height")).toHaveTextContent(
				ContainerHeightOptions.MD
			);
		});

		it("uses provided height option", () => {
			const items = [mockOembedItem];
			const options = { height: ContainerHeightOptions.LG };

			const result = spotifyOembed.renderMethod(items, options);
			render(<div>{result}</div>);

			expect(screen.getByTestId("height")).toHaveTextContent(
				ContainerHeightOptions.LG
			);
		});

		it("renders with different height options", () => {
			const items = [mockOembedItem];
			const heightOptions = [
				ContainerHeightOptions.XS,
				ContainerHeightOptions.SM,
				ContainerHeightOptions.MD,
				ContainerHeightOptions.LG,
				ContainerHeightOptions.XL,
			];

			heightOptions.forEach((height) => {
				const { unmount } = render(
					<div>{spotifyOembed.renderMethod(items, { height })}</div>
				);

				expect(screen.getByTestId("height")).toHaveTextContent(height);
				unmount();
			});
		});

		it("renders with empty items array", () => {
			const items: any[] = [];
			const options = {};

			const result = spotifyOembed.renderMethod(items, options);
			render(<div>{result}</div>);

			expect(
				screen.getByTestId("spotify-oembed-component")
			).toBeInTheDocument();
			expect(screen.getByTestId("item-id")).toHaveTextContent("");
		});

		it("renders with undefined items", () => {
			const options = {};

			const result = spotifyOembed.renderMethod(undefined, options);
			render(<div>{result}</div>);

			expect(
				screen.getByTestId("spotify-oembed-component")
			).toBeInTheDocument();
			expect(screen.getByTestId("item-id")).toHaveTextContent("");
		});

		it("only uses the first item when multiple items are provided", () => {
			const secondItem: OEmbed & { iframe_url: string } = {
				...mockOembedItem,
				id: "second-id",
				title: "Second Track",
				iframe_url: "https://open.spotify.com/embed/track/456",
			};

			const items = [mockOembedItem, secondItem];
			const options = {};

			const result = spotifyOembed.renderMethod(items, options);
			render(<div>{result}</div>);

			expect(screen.getByTestId("item-id")).toHaveTextContent("test-id");
			expect(screen.getByTestId("item-id")).not.toHaveTextContent("second-id");
		});

		it("handles different Spotify URL types", () => {
			const spotifyUrls = [
				"https://open.spotify.com/embed/track/123",
				"https://open.spotify.com/embed/album/456",
				"https://open.spotify.com/embed/artist/789",
				"https://open.spotify.com/embed/playlist/abc",
				"https://open.spotify.com/embed/show/def",
				"https://open.spotify.com/embed/episode/ghi",
			];

			spotifyUrls.forEach((iframe_url, index) => {
				const item = {
					...mockOembedItem,
					id: `test-id-${index}`,
					iframe_url,
				};

				const { unmount } = render(
					<div>{spotifyOembed.renderMethod([item], {})}</div>
				);

				expect(screen.getByTestId("item-iframe-url")).toHaveTextContent(
					iframe_url
				);
				unmount();
			});
		});
	});

	describe("exports", () => {
		it("exports styles", () => {
			expect(spotifyOembed.styles).toBeDefined();
			expect(spotifyOembed.styles).toEqual({
				default: {
					container: "mocked-container-class",
					item: "mocked-item-class",
				},
			});
		});

		it("exports renderMethod", () => {
			expect(spotifyOembed.renderMethod).toBeDefined();
			expect(typeof spotifyOembed.renderMethod).toBe("function");
		});
	});

	describe("type compatibility", () => {
		it("accepts valid SpotifyOembed items", () => {
			const validItem: OEmbed & { iframe_url: string } = {
				id: "test",
				title: "Test",
				type: "rich",
				version: "1.0",
				provider_name: "Spotify",
				provider_url: "https://open.spotify.com",
				html: "<iframe></iframe>",
				iframe_url: "https://open.spotify.com/embed/track/123",
			};

			expect(() => {
				const result = spotifyOembed.renderMethod([validItem], {});
				render(<div>{result}</div>);
			}).not.toThrow();
		});

		it("handles items with additional OEmbed properties", () => {
			const itemWithExtras: OEmbed & { iframe_url: string } = {
				id: "test",
				title: "Test",
				type: "rich",
				version: "1.0",
				provider_name: "Spotify",
				provider_url: "https://open.spotify.com",
				html: "<iframe></iframe>",
				iframe_url: "https://open.spotify.com/embed/track/123",
				author_name: "Test Artist",
				author_url: "https://open.spotify.com/artist/123",
				thumbnail_url: "https://example.com/thumb.jpg",
				width: 300,
				height: 380,
				cache_age: 3600,
				customProperty: "custom value",
			};

			expect(() => {
				const result = spotifyOembed.renderMethod([itemWithExtras], {});
				render(<div>{result}</div>);
			}).not.toThrow();

			expect(screen.getByTestId("item-id")).toHaveTextContent("test");
		});
	});

	describe("Snaps", () => {
		it("renders spotifyOembed renderMethod unchanged", () => {
			const items = [
				{
					id: "test-id",
					title: "Test Track",
					type: "rich",
					version: "1.0",
					provider_name: "Spotify",
					provider_url: "https://open.spotify.com",
					html: '<iframe src="https://open.spotify.com/embed/track/123" width="300" height="380"></iframe>',
					iframe_url: "https://open.spotify.com/embed/track/123",
					width: 300,
					height: 380,
				},
			];
			const options = { height: ContainerHeightOptions.LG };

			const result = spotifyOembed.renderMethod(items, options);
			const { container } = render(<div>{result}</div>);

			expect(container).toMatchSnapshot();
		});
	});
});
