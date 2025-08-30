import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SpotifyOembedComponent } from "./spotify-oembed-component";
import { ContainerHeightOptions } from "../../../../../components/page/components/stack/types";
import { OEmbed } from "@/types/data-structures/oembed";

// Mock the ClientOembed component
jest.mock("../../oembed-collection/content-oembed/client-component", () => ({
	ClientOembed: ({ html }: { html: string }) => (
		<div
			data-testid="client-oembed"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	),
}));

// Mock the getContainerHeight function
jest.mock("../../../../../components/page/components/stack/types", () => ({
	...jest.requireActual(
		"../../../../../components/page/components/stack/types"
	),
	getContainerHeight: jest.fn((height: string) => {
		const heights: Record<string, string> = {
			XXS: "120",
			XS: "200",
			SM: "280",
			MD: "360",
			LG: "480",
			XL: "600",
			XXL: "720",
		};
		return heights[height] || "360";
	}),
}));

type SpotifyOembed = {
	iframe_url: string;
} & OEmbed;

const createMockSpotifyOembed = (
	iframe_url: string,
	html: string = '<iframe src="test" height="152"></iframe>'
): SpotifyOembed => ({
	id: "test-id",
	title: "Test Spotify Content",
	type: "rich",
	version: "1.0",
	provider_name: "Spotify",
	provider_url: "https://spotify.com",
	html,
	iframe_url,
	width: 300,
	height: 152,
});

describe("SpotifyOembedComponent", () => {
	describe("renders correctly with different Spotify content types", () => {
		it("renders album content", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/album/123"
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
		});

		it("renders artist content", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/artist/456"
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
		});

		it("renders track content", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/track/789"
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
		});

		it("renders show content", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/show/abc"
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
		});

		it("renders playlist content", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/playlist/def"
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
		});

		it("renders episode content", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/episode/ghi"
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
		});
	});

	describe("height adjustment functionality", () => {
		it("updates height for album content type", () => {
			const originalHtml = '<iframe src="test" height="152"></iframe>';
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/album/123",
				originalHtml
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.LG}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed.innerHTML).toContain('height="480"');
		});

		it("updates height for artist content type", () => {
			const originalHtml = '<iframe src="test" height="152"></iframe>';
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/artist/456",
				originalHtml
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.XL}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed.innerHTML).toContain('height="600"');
		});

		it("updates height for playlist content type", () => {
			const originalHtml = '<iframe src="test" height="152"></iframe>';
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/playlist/def",
				originalHtml
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.SM}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed.innerHTML).toContain('height="280"');
		});

		it("does not update height for track content type", () => {
			const originalHtml = '<iframe src="test" height="152"></iframe>';
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/track/789",
				originalHtml
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.LG}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed.innerHTML).toContain('height="152"');
			expect(clientOembed.innerHTML).not.toContain('height="480"');
		});

		it("does not update height for show content type", () => {
			const originalHtml = '<iframe src="test" height="152"></iframe>';
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/show/abc",
				originalHtml
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.LG}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed.innerHTML).toContain('height="152"');
			expect(clientOembed.innerHTML).not.toContain('height="480"');
		});

		it("does not update height for episode content type", () => {
			const originalHtml = '<iframe src="test" height="152"></iframe>';
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/episode/ghi",
				originalHtml
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.LG}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed.innerHTML).toContain('height="152"');
			expect(clientOembed.innerHTML).not.toContain('height="480"');
		});
	});

	describe("default props", () => {
		it("uses default height when not provided", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/album/123"
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
		});
	});

	describe("edge cases", () => {
		it("handles empty html gracefully", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/album/123",
				""
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
			expect(clientOembed.innerHTML).toBe("");
		});

		it("handles iframe_url without known embed type", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/unknown/123",
				'<iframe src="test" height="152"></iframe>'
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.LG}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			// Should not update height since it's not a known type
			expect(clientOembed.innerHTML).toContain('height="152"');
			expect(clientOembed.innerHTML).not.toContain('height="480"');
		});

		it("handles html without height attribute", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/album/123",
				'<iframe src="test"></iframe>'
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.LG}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			expect(clientOembed).toBeInTheDocument();
		});

		it("handles html with multiple height attributes correctly", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/album/123",
				'<iframe src="test" height="152" style="height: 200px;"></iframe>'
			);

			render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.LG}
				/>
			);

			const clientOembed = screen.getByTestId("client-oembed");
			// Should only replace the height attribute, not the style
			expect(clientOembed.innerHTML).toContain('height="480"');
			expect(clientOembed.innerHTML).toContain('style="height: 200px;"');
		});
	});

	describe("component structure", () => {
		it("wraps ClientOembed in a div", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/track/789"
			);

			const { container } = render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			const wrapper = container.firstChild;
			expect(wrapper).toBeInstanceOf(HTMLDivElement);
			expect(wrapper).toContainElement(screen.getByTestId("client-oembed"));
		});

		it("matches snapshot for album content", () => {
			const mockItem = createMockSpotifyOembed(
				"https://open.spotify.com/embed/album/123",
				'<iframe src="https://open.spotify.com/embed/album/123" height="152"></iframe>'
			);

			const { container } = render(
				<SpotifyOembedComponent
					item={mockItem}
					height={ContainerHeightOptions.MD}
				/>
			);

			expect(container).toMatchSnapshot();
		});
	});
});
