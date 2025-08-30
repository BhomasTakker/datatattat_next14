import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AudioStackClientComponent } from "./audio-stack-client";
import { SpotifyCollectionItem } from "./types";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";
import { SearchTypes } from "@/types/api/spotify";

// Mock the spotify oembed module
jest.mock(
	"../../../../../lib/api/component-data/oembed/options/spotify",
	() => ({
		spotifyOembedByResponse: {
			createUrl: jest.fn().mockReturnValue("https://mocked-url.com"),
		},
	})
);

// Mock the oembed utils
jest.mock("../../../../../lib/api/component-data/oembed/utils", () => ({
	fetchOembed: jest.fn(),
}));

// Mock the ClientOembed component
jest.mock("../../oembed-collection/content-oembed/client-component", () => ({
	ClientOembed: ({ html }: { html: string }) => (
		<div data-testid="client-oembed">{html}</div>
	),
}));

// Mock the Article component
jest.mock("../../article-collection/article/article", () => ({
	Article: ({ article, styles }: { article: any; styles: any }) => (
		<div data-testid="article" data-article-id={article.id}>
			<div data-testid="article-title">{article.title}</div>
			<div data-testid="article-description">{article.description}</div>
		</div>
	),
}));

// Mock the Interaction component
jest.mock("../../article-collection/article/interaction/interactions", () => ({
	Interaction: ({
		children,
		onClick,
		type,
	}: {
		children: React.ReactNode;
		onClick: () => void;
		type: string;
	}) => (
		<div
			data-testid="interaction"
			onClick={onClick}
			data-interaction-type={type}
		>
			{children}
		</div>
	),
}));

// Mock the InViewComponent
jest.mock("../../../../ui/in-view/in-view", () => ({
	InViewComponent: ({
		children,
		template,
		options,
	}: {
		children: React.ReactNode;
		template: React.ReactNode;
		options: any;
	}) => (
		<div data-testid="in-view-component" data-options={JSON.stringify(options)}>
			{children}
		</div>
	),
}));

// Mock the interactions map
jest.mock(
	"../../article-collection/article/interaction/interactions-map",
	() => ({
		InteractionsOptions: {
			Click: "Click",
		},
	})
);

// Mock the stack types and utility function
jest.mock("../../../../page/components/stack/types", () => ({
	ContainerHeightOptions: {
		SM: "SM",
		MD: "MD",
		LG: "LG",
	},
	getContainerHeight: jest.fn((height: string) => {
		const heights = {
			SM: 300,
			MD: 500,
			LG: 700,
		};
		return heights[height as keyof typeof heights] || 500;
	}),
}));

// Mock the styles
jest.mock("./audio-stack.module.scss", () => ({
	template: "template-class",
	articles: "articles-class",
}));

const mockSpotifyCollectionItems: SpotifyCollectionItem[] = [
	{
		id: "spotify-1",
		title: "Test Song 1",
		src: "https://test-url-1.com",
		description: "Test Description 1",
		guid: "guid-1",
		variant: "spotify",
		media: {
			type: SearchTypes.Track,
		},
	},
	{
		id: "spotify-2",
		title: "Test Song 2",
		src: "https://test-url-2.com",
		description: "Test Description 2",
		guid: "guid-2",
		variant: "spotify",
		media: {
			type: SearchTypes.Album,
		},
	},
	{
		id: "spotify-3",
		title: "Test Song 3",
		src: "https://test-url-3.com",
		description: "Test Description 3",
		guid: "guid-3",
		variant: "spotify",
		media: {
			type: SearchTypes.Playlist,
		},
	},
];

describe("AudioStackClientComponent", () => {
	const {
		fetchOembed,
	} = require("../../../../../lib/api/component-data/oembed/utils");
	const {
		spotifyOembedByResponse,
	} = require("../../../../../lib/api/component-data/oembed/options/spotify");

	beforeEach(() => {
		jest.clearAllMocks();
		fetchOembed.mockResolvedValue({ html: "<div>Mocked Spotify Embed</div>" });
		spotifyOembedByResponse.createUrl.mockReturnValue("https://mocked-url.com");
		console.error = jest.fn();
	});

	it("renders with default props", async () => {
		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		// Wait for the initial oembed fetch to complete
		await waitFor(() => {
			expect(screen.getByTestId("client-oembed")).toBeInTheDocument();
		});

		// Check that the oembed component is rendered
		expect(screen.getByTestId("client-oembed")).toHaveTextContent(
			"<div>Mocked Spotify Embed</div>"
		);

		// Check that all articles are rendered
		expect(screen.getAllByTestId("article")).toHaveLength(3);

		const articleTitles = screen.getAllByTestId("article-title");
		const articleDescriptions = screen.getAllByTestId("article-description");

		expect(articleTitles[0]).toHaveTextContent("Test Song 1");
		expect(articleDescriptions[0]).toHaveTextContent("Test Description 1");
	});

	it("renders articles in a list with correct container height", async () => {
		const {
			getContainerHeight,
		} = require("../../../../page/components/stack/types");

		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.LG}
			/>
		);

		await waitFor(() => {
			expect(screen.getByTestId("client-oembed")).toBeInTheDocument();
		});

		// Check that getContainerHeight was called with the correct height
		expect(getContainerHeight).toHaveBeenCalledWith(ContainerHeightOptions.LG);

		// Check that the articles container has the correct style
		const articlesContainer = screen.getByRole("list");
		expect(articlesContainer).toHaveStyle({ height: "700px" });
		expect(articlesContainer).toHaveClass("articles-class");
	});

	it("fetches oembed data for the initial item", async () => {
		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		await waitFor(() => {
			expect(fetchOembed).toHaveBeenCalledWith(
				{ id: "spotify-1", type: SearchTypes.Track },
				expect.any(Function)
			);
		});
	});

	it("handles article click and updates the display component", async () => {
		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		// Wait for initial render
		await waitFor(() => {
			expect(screen.getByTestId("client-oembed")).toBeInTheDocument();
		});

		// Clear previous calls
		fetchOembed.mockClear();
		spotifyOembedByResponse.createUrl.mockClear();

		// Click on the second article
		const interactions = screen.getAllByTestId("interaction");
		fireEvent.click(interactions[1]);

		// Wait for the new oembed fetch
		await waitFor(() => {
			expect(fetchOembed).toHaveBeenCalledWith(
				{ id: "spotify-2", type: SearchTypes.Album },
				expect.any(Function)
			);
		});
	});

	it("renders each article with correct interaction properties", async () => {
		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		await waitFor(() => {
			expect(screen.getByTestId("client-oembed")).toBeInTheDocument();
		});

		const interactions = screen.getAllByTestId("interaction");
		expect(interactions).toHaveLength(3);

		interactions.forEach((interaction) => {
			expect(interaction).toHaveAttribute("data-interaction-type", "Click");
		});
	});

	it("renders InViewComponent with correct options", async () => {
		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		await waitFor(() => {
			expect(screen.getByTestId("client-oembed")).toBeInTheDocument();
		});

		const inViewComponents = screen.getAllByTestId("in-view-component");
		expect(inViewComponents).toHaveLength(3);

		inViewComponents.forEach((component) => {
			const options = JSON.parse(
				component.getAttribute("data-options") || "{}"
			);
			expect(options).toEqual({
				threshold: 0,
				triggerOnce: true,
			});
		});
	});

	it("returns null and logs error when no items are provided", () => {
		const { container } = render(
			<AudioStackClientComponent
				items={[]}
				height={ContainerHeightOptions.MD}
			/>
		);

		expect(container.firstChild).toBeNull();
		expect(console.error).toHaveBeenCalledWith("No items received");
	});

	it("handles missing media in initial item", async () => {
		const itemsWithoutMedia = [
			{
				...mockSpotifyCollectionItems[0],
				media: undefined as any,
			},
		];

		render(
			<AudioStackClientComponent
				items={itemsWithoutMedia}
				height={ContainerHeightOptions.MD}
			/>
		);

		// Should not call fetchOembed if media is missing
		await waitFor(() => {
			expect(fetchOembed).not.toHaveBeenCalled();
		});

		// Should still render the article
		expect(screen.getByTestId("article")).toBeInTheDocument();
	});

	it("handles oembed fetch error gracefully", async () => {
		// Mock console.error to avoid noise in test output
		const consoleSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		fetchOembed.mockRejectedValue(new Error("Oembed fetch failed"));

		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		// Should still render articles even if oembed fails
		expect(screen.getAllByTestId("article")).toHaveLength(3);

		// Wait for the error to be handled
		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith(
				"Failed to fetch oembed data:",
				expect.any(Error)
			);
		});

		// Should not render client-oembed component if fetch fails
		expect(screen.queryByTestId("client-oembed")).not.toBeInTheDocument();

		// Restore console.error
		consoleSpy.mockRestore();
	});

	it("uses correct default height when height prop is not provided", async () => {
		const {
			getContainerHeight,
		} = require("../../../../page/components/stack/types");

		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		await waitFor(() => {
			expect(getContainerHeight).toHaveBeenCalledWith(
				ContainerHeightOptions.MD
			);
		});
	});

	it("renders articles with correct keys and list items", async () => {
		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		await waitFor(() => {
			expect(screen.getByTestId("client-oembed")).toBeInTheDocument();
		});

		const listItems = screen.getAllByRole("listitem");
		expect(listItems).toHaveLength(3);

		const articles = screen.getAllByTestId("article");
		expect(articles[0]).toHaveAttribute("data-article-id", "spotify-1");
		expect(articles[1]).toHaveAttribute("data-article-id", "spotify-2");
		expect(articles[2]).toHaveAttribute("data-article-id", "spotify-3");
	});

	it("maintains state correctly when switching between articles", async () => {
		render(
			<AudioStackClientComponent
				items={mockSpotifyCollectionItems}
				height={ContainerHeightOptions.MD}
			/>
		);

		// Wait for initial render
		await waitFor(() => {
			expect(screen.getByTestId("client-oembed")).toBeInTheDocument();
		});

		// Click on third article
		const interactions = screen.getAllByTestId("interaction");
		fireEvent.click(interactions[2]);

		await waitFor(() => {
			expect(fetchOembed).toHaveBeenCalledWith(
				{ id: "spotify-3", type: SearchTypes.Playlist },
				expect.any(Function)
			);
		});

		// Click back to first article
		fireEvent.click(interactions[0]);

		await waitFor(() => {
			expect(fetchOembed).toHaveBeenCalledWith(
				{ id: "spotify-1", type: SearchTypes.Track },
				expect.any(Function)
			);
		});
	});
});
