import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import spotifyAudioStack from "./audio-stack";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";
import { SearchTypes } from "@/types/api/spotify";
import { SpotifyCollectionItem } from "./types";

// Mock the client component since it uses hooks and API calls
jest.mock("./audio-stack-client", () => {
	return {
		__esModule: true,
		AudioStackClientComponent: ({ items, height }: any) => (
			<div data-testid="audio-stack-client">
				<div data-testid="height-option">{height}</div>
				<div data-testid="items-count">{items.length}</div>
				{items.map((item: SpotifyCollectionItem) => (
					<div key={item.id} data-testid={`item-${item.id}`}>
						{item.title}
					</div>
				))}
			</div>
		),
	};
});

const mockItems: SpotifyCollectionItem[] = [
	{
		id: "test-track-1",
		title: "Test Song 1",
		src: "https://spotify.com/track1",
		description: "Test Description 1",
		guid: "guid-track-1",
		variant: "spotify-track",
		media: {
			type: SearchTypes.Track,
		},
	},
	{
		id: "test-track-2",
		title: "Test Song 2",
		src: "https://spotify.com/track2",
		description: "Test Description 2",
		guid: "guid-track-2",
		variant: "spotify-album",
		media: {
			type: SearchTypes.Album,
		},
	},
];

describe("Audio Stack Component Test Suite", () => {
	describe("spotifyAudioStack object", () => {
		it("should have styles property", () => {
			expect(spotifyAudioStack.styles).toBeDefined();
		});

		it("should have renderMethod property", () => {
			expect(spotifyAudioStack.renderMethod).toBeDefined();
			expect(typeof spotifyAudioStack.renderMethod).toBe("function");
		});
	});

	describe("renderMethod", () => {
		it("should render AudioStackClientComponent with correct props", () => {
			const options = { height: ContainerHeightOptions.MD };
			const result = spotifyAudioStack.renderMethod(mockItems, options);

			render(result);

			expect(screen.getByTestId("audio-stack-client")).toBeInTheDocument();
			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.MD
			);
			expect(screen.getByTestId("items-count")).toHaveTextContent("2");
		});

		it("should render with empty items array when no items provided", () => {
			const options = { height: ContainerHeightOptions.SM };
			const result = spotifyAudioStack.renderMethod(undefined, options);

			render(result);

			expect(screen.getByTestId("audio-stack-client")).toBeInTheDocument();
			expect(screen.getByTestId("items-count")).toHaveTextContent("0");
		});

		it("should render with different height options", () => {
			const options = { height: ContainerHeightOptions.LG };
			const result = spotifyAudioStack.renderMethod(mockItems, options);

			render(result);

			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.LG
			);
		});

		it("should render all provided items", () => {
			const options = { height: ContainerHeightOptions.MD };
			const result = spotifyAudioStack.renderMethod(mockItems, options);

			render(result);

			expect(screen.getByTestId("item-test-track-1")).toHaveTextContent(
				"Test Song 1"
			);
			expect(screen.getByTestId("item-test-track-2")).toHaveTextContent(
				"Test Song 2"
			);
		});

		it("should handle single item", () => {
			const singleItem = [mockItems[0]];
			const options = { height: ContainerHeightOptions.MD };
			const result = spotifyAudioStack.renderMethod(singleItem, options);

			render(result);

			expect(screen.getByTestId("items-count")).toHaveTextContent("1");
			expect(screen.getByTestId("item-test-track-1")).toBeInTheDocument();
			expect(screen.queryByTestId("item-test-track-2")).not.toBeInTheDocument();
		});

		it("renders spotifyAudioStack unchanged", () => {
			const options = { height: ContainerHeightOptions.MD };
			const result = spotifyAudioStack.renderMethod(mockItems, options);
			const { container } = render(result);

			expect(container).toMatchSnapshot();
		});
	});

	describe("AudioStackProps type validation", () => {
		it("should work with ContainerHeightOptions.XS", () => {
			const options = { height: ContainerHeightOptions.XS };
			const result = spotifyAudioStack.renderMethod(mockItems, options);
			render(result);

			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.XS
			);
		});

		it("should work with ContainerHeightOptions.SM", () => {
			const options = { height: ContainerHeightOptions.SM };
			const result = spotifyAudioStack.renderMethod(mockItems, options);
			render(result);

			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.SM
			);
		});

		it("should work with ContainerHeightOptions.MD", () => {
			const options = { height: ContainerHeightOptions.MD };
			const result = spotifyAudioStack.renderMethod(mockItems, options);
			render(result);

			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.MD
			);
		});

		it("should work with ContainerHeightOptions.LG", () => {
			const options = { height: ContainerHeightOptions.LG };
			const result = spotifyAudioStack.renderMethod(mockItems, options);
			render(result);

			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.LG
			);
		});

		it("should work with ContainerHeightOptions.XL", () => {
			const options = { height: ContainerHeightOptions.XL };
			const result = spotifyAudioStack.renderMethod(mockItems, options);
			render(result);

			expect(screen.getByTestId("height-option")).toHaveTextContent(
				ContainerHeightOptions.XL
			);
		});
	});
});
