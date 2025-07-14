import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AudioDisplayComponent } from "./audio-display-component";
import { CollectionItem } from "../../../../../../types/data-structures/collection/item/item";

// Mock child components
jest.mock("../../../audio-player/audio-player", () => ({
	AudioPlayer: ({ src }: { src: string }) => (
		<div data-testid="mock-audio-player">{src}</div>
	),
}));
jest.mock("./display-article", () => ({
	DisplayArticle: ({ item }: { item: CollectionItem }) => (
		<div data-testid="display-article">{item?.title}</div>
	),
}));
jest.mock("../../../../../../components/ui/in-view/in-view", () => ({
	InViewComponent: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));
jest.mock("../../article/interaction/interactions", () => ({
	Interaction: ({ children, onClick }: any) => (
		<div data-testid="interaction" onClick={onClick}>
			{children}
		</div>
	),
}));
jest.mock("../../../../../../components/ui/with-data/with-data", () => ({
	WithData: ({ template }: { template: React.ReactNode }) => <>{template}</>,
}));
jest.mock("../utils", () => ({
	articleMetaLoader: () => jest.fn(),
	articleRenderer: () => jest.fn(),
	articleTemplate: () => <div data-testid="article-template" />,
}));

const mockArticles: CollectionItem[] = [
	{ src: "audio1.mp3", title: "Audio 1" } as CollectionItem,
	{ src: "audio2.mp3", title: "Audio 2" } as CollectionItem,
];

describe("AudioDisplayComponent", () => {
	it("renders without crashing and displays the first article", () => {
		render(<AudioDisplayComponent articles={mockArticles} />);
		expect(screen.getByTestId("display-article")).toHaveTextContent("Audio 1");
		expect(screen.getByTestId("mock-audio-player")).toHaveTextContent(
			"audio1.mp3"
		);
	});

	it("renders a list of articles", () => {
		const { container } = render(
			<AudioDisplayComponent articles={mockArticles} />
		);
		const interactions = screen.getAllByTestId("interaction");
		expect(interactions.length).toBe(2);
		expect(container).toMatchSnapshot();
	});

	it("updates displayed article and audio player src on article click", () => {
		render(<AudioDisplayComponent articles={mockArticles} />);
		const interactions = screen.getAllByTestId("interaction");
		// Click the second article
		fireEvent.click(interactions[1]);
		// The displayed article should update
		waitFor(() => {
			expect(screen.getByTestId("display-article")).toHaveTextContent(
				"Audio 2"
			);
		});

		expect(screen.getByTestId("mock-audio-player")).toHaveTextContent(
			"audio2.mp3"
		);
	});

	it("handles empty articles array gracefully", () => {
		render(<AudioDisplayComponent articles={[]} />);
		expect(screen.getByTestId("display-article")).toBeInTheDocument();
		expect(screen.getByTestId("mock-audio-player")).toHaveTextContent("");
	});

	it("applies the correct size class", () => {
		render(<AudioDisplayComponent articles={mockArticles} size="medium" />);
		const ul = screen.getByRole("list");
		expect(ul.className).toMatch(/medium/);
	});
});
