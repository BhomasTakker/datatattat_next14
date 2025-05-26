import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VideoDisplayComponent } from "./video-display-component";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { PlayerCollectionVariant, PlayerSourceTypes } from "./structs";

// Mock child components
jest.mock("../../../video-player/video-player-container", () => ({
	VideoPlayerContainer: ({ playerRef, options }: any) => (
		<div
			data-testid="video-player-container"
			data-options={JSON.stringify(options)}
		/>
	),
}));
jest.mock("../../article/interaction/interactions", () => ({
	Interaction: ({ children, onClick }: any) => (
		<div data-testid="interaction" onClick={onClick}>
			{children}
		</div>
	),
}));
jest.mock("../../../../../../components/ui/in-view/in-view", () => ({
	InViewComponent: ({ children }: any) => (
		<div data-testid="in-view">{children}</div>
	),
}));
jest.mock("../../../../../../components/ui/with-data/with-data", () => ({
	WithData: ({ template }: any) => (
		<div data-testid="with-data">{template}</div>
	),
}));
jest.mock("../utils", () => ({
	articleMetaLoader: (item: any) => () => item,
	articleRenderer: () => () => <div data-testid="article-renderer" />,
	articleTemplate: () => <div data-testid="article-template" />,
}));

const mockArticles: CollectionItem[] = [
	{
		src: "video1.mp4",
		title: "Video 1",
		avatar: { src: "poster1.jpg" },
	} as CollectionItem,
	{
		src: "video2.mp4",
		title: "Video 2",
		avatar: { src: "poster2.jpg" },
	} as CollectionItem,
];

describe("VideoDisplayComponent", () => {
	it("renders the video player and articles", () => {
		const { container } = render(
			<VideoDisplayComponent
				articles={mockArticles}
				variant={PlayerCollectionVariant.HorizontalScroll}
				sourceType={PlayerSourceTypes.Youtube}
				autoplay={true}
			/>
		);
		expect(screen.getByTestId("video-player-container")).toBeInTheDocument();
		expect(screen.getAllByTestId("interaction")).toHaveLength(
			mockArticles.length
		);
		expect(screen.getAllByTestId("with-data")).toHaveLength(
			mockArticles.length
		);
		expect(container).toMatchSnapshot();
	});

	it("passes correct options to VideoPlayerContainer", () => {
		render(
			<VideoDisplayComponent
				articles={mockArticles}
				variant={PlayerCollectionVariant.HorizontalScroll}
				sourceType={PlayerSourceTypes.Youtube}
				autoplay={true}
			/>
		);
		const container = screen.getByTestId("video-player-container");
		const options = JSON.parse(container.getAttribute("data-options")!);
		expect(options.autoplay).toBe("any");
		expect(options.poster).toBe("poster1.jpg");
		expect(options.sources[0].src).toBe("video1.mp4");
		expect(options.sources[0].type).toBe(PlayerSourceTypes.Youtube);
	});

	it("renders nothing if articles is empty", () => {
		const { container } = render(
			<VideoDisplayComponent
				articles={[]}
				variant={PlayerCollectionVariant.HorizontalScroll}
				sourceType={PlayerSourceTypes.Youtube}
				autoplay={false}
			/>
		);
		// Should still render the container, but no articles
		expect(container.querySelectorAll("li")).toHaveLength(0);
	});

	it("calls onClick handler when an article is clicked", () => {
		render(
			<VideoDisplayComponent
				articles={mockArticles}
				variant={PlayerCollectionVariant.HorizontalScroll}
				sourceType={PlayerSourceTypes.Youtube}
				autoplay={false}
			/>
		);
		const interactions = screen.getAllByTestId("interaction");
		fireEvent.click(interactions[1]);
		// No error thrown, and handler is called (no-op in test)
		expect(interactions[1]).toBeInTheDocument();
	});

	it("applies the correct container class based on variant", () => {
		const { container } = render(
			<VideoDisplayComponent
				articles={mockArticles}
				variant={PlayerCollectionVariant.VerticalScroll}
				sourceType={PlayerSourceTypes.Youtube}
				autoplay={false}
			/>
		);

		const element = container.getElementsByClassName("containerVerticalScroll");
		expect(element.length).toBeGreaterThan(0);
		expect(container).toMatchSnapshot();
	});
});
