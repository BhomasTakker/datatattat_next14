import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { VideoDisplayComponent, DisplayPlayer } from "./display-player";
import { PlayerSourceTypes } from "../article-collection/collections/video-display/structs";
import type { ComponentProps } from "@/types/component";

// Mock the VideoPlayerContainer component
jest.mock("../video-player/video-player-container", () => ({
	VideoPlayerContainer: ({ styles, playerRef, options }: any) => (
		<div
			data-testid="video-player-container"
			data-options={JSON.stringify(options)}
			data-styles={styles?.root || ""}
		>
			Mock Video Player Container
		</div>
	),
}));

// Mock the BASE_PLAYER_OPTIONS
jest.mock("../video-player/options", () => ({
	BASE_PLAYER_OPTIONS: {
		autoplay: false,
		aspectRatio: "16:9",
		controls: true,
		fill: true,
		fluid: true,
		responsive: true,
		poster: "",
		playbackRates: [0.5, 1, 1.5, 2],
		width: undefined,
		height: undefined,
		preload: "auto",
		techOrder: ["html5", "youtube"],
		sources: [],
		audioOnlyMode: false,
		audioPosterMode: false,
	},
}));

// Mock the styles
jest.mock("./display-player.module.scss", () => ({
	root: "mock-display-player-root",
}));

describe("VideoDisplayComponent", () => {
	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	describe("Basic Rendering", () => {
		it("renders the component with correct test id", () => {
			const options = {
				src: "https://example.com/video.mp4",
			};

			render(<VideoDisplayComponent options={options} />);

			expect(screen.getByTestId("display-player")).toBeInTheDocument();
			expect(screen.getByTestId("display-player")).toHaveClass(
				"mock-display-player-root"
			);
		});

		it("renders VideoPlayerContainer with correct props", () => {
			const options = {
				src: "https://example.com/video.mp4",
				sourceType: PlayerSourceTypes.Mp4,
				poster: "https://example.com/poster.jpg",
				audioOnlyMode: false,
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			expect(videoContainer).toBeInTheDocument();

			// Check if options are passed correctly
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);
			expect(optionsData.sources).toHaveLength(1);
			expect(optionsData.sources[0].src).toBe("https://example.com/video.mp4");
			expect(optionsData.sources[0].type).toBe("video/mp4");
			expect(optionsData.poster).toBe("https://example.com/poster.jpg");
			expect(optionsData.audioOnlyMode).toBe(false);
		});
	});

	describe("Source Configuration", () => {
		it("handles missing src prop", () => {
			const options = {
				src: "",
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);
			expect(optionsData.sources[0].src).toBe("");
			expect(optionsData.sources[0].type).toBeUndefined();
		});

		it("handles different source types", () => {
			const testCases = [
				{
					sourceType: PlayerSourceTypes.Youtube,
					expected: "video/youtube",
				},
				{
					sourceType: PlayerSourceTypes.Vimeo,
					expected: "video/vimeo",
				},
				{
					sourceType: PlayerSourceTypes.Mp4,
					expected: "video/mp4",
				},
				{
					sourceType: PlayerSourceTypes.Default,
					expected: "default",
				},
			];

			testCases.forEach(({ sourceType, expected }) => {
				const { unmount } = render(
					<VideoDisplayComponent
						options={{
							src: "https://example.com/video",
							sourceType,
						}}
					/>
				);

				const videoContainer = screen.getByTestId("video-player-container");
				const optionsData = JSON.parse(
					videoContainer.getAttribute("data-options") || "{}"
				);
				expect(optionsData.sources[0].type).toBe(expected);

				unmount();
			});
		});

		it("handles undefined sourceType", () => {
			const options = {
				src: "https://example.com/video.mp4",
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);
			expect(optionsData.sources[0].type).toBeUndefined();
		});
	});

	describe("Poster Configuration", () => {
		it("uses provided poster URL", () => {
			const options = {
				src: "https://example.com/video.mp4",
				poster: "https://example.com/poster.jpg",
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);
			expect(optionsData.poster).toBe("https://example.com/poster.jpg");
		});

		it("uses empty string when poster is not provided", () => {
			const options = {
				src: "https://example.com/video.mp4",
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);
			expect(optionsData.poster).toBe("");
		});
	});

	describe("Audio Mode Configuration", () => {
		it("handles audioOnlyMode true", () => {
			const options = {
				src: "https://example.com/audio.mp3",
				audioOnlyMode: true,
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);
			expect(optionsData.audioOnlyMode).toBe(true);
		});

		it("handles audioOnlyMode false", () => {
			const options = {
				src: "https://example.com/video.mp4",
				audioOnlyMode: false,
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);
			expect(optionsData.audioOnlyMode).toBe(false);
		});

		it("handles undefined audioOnlyMode", () => {
			const options = {
				src: "https://example.com/video.mp4",
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);
			expect(optionsData.audioOnlyMode).toBeUndefined();
		});
	});

	describe("Player Options Merging", () => {
		it("merges with BASE_PLAYER_OPTIONS correctly", () => {
			const options = {
				src: "https://example.com/video.mp4",
				sourceType: PlayerSourceTypes.Mp4,
				poster: "https://example.com/poster.jpg",
				audioOnlyMode: true,
			};

			render(<VideoDisplayComponent options={options} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);

			// Check that BASE_PLAYER_OPTIONS are merged
			expect(optionsData.autoplay).toBe(false);
			expect(optionsData.aspectRatio).toBe("16:9");
			expect(optionsData.controls).toBe(true);
			expect(optionsData.fill).toBe(true);
			expect(optionsData.fluid).toBe(true);
			expect(optionsData.responsive).toBe(true);
			expect(optionsData.playbackRates).toEqual([0.5, 1, 1.5, 2]);
			expect(optionsData.preload).toBe("auto");
			expect(optionsData.techOrder).toEqual(["html5", "youtube"]);

			// Check that provided options override base options
			expect(optionsData.poster).toBe("https://example.com/poster.jpg");
			expect(optionsData.audioOnlyMode).toBe(true);
		});
	});
});

describe("DisplayPlayer", () => {
	const createMockProps = (componentProps: any = {}): ComponentProps => ({
		component: {
			componentProps,
		} as any,
		dataObject: {
			data: {},
		},
	});

	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	describe("Props Extraction", () => {
		it("extracts all props correctly from componentProps", () => {
			const componentProps = {
				src: "https://example.com/video.mp4",
				sourceType: PlayerSourceTypes.Youtube,
				poster: "https://example.com/poster.jpg",
				audioOnlyMode: true,
			};

			const props = createMockProps(componentProps);
			render(<DisplayPlayer {...props} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);

			expect(optionsData.sources[0].src).toBe("https://example.com/video.mp4");
			expect(optionsData.sources[0].type).toBe("video/youtube");
			expect(optionsData.poster).toBe("https://example.com/poster.jpg");
			expect(optionsData.audioOnlyMode).toBe(true);
		});

		it("handles partial componentProps", () => {
			const componentProps = {
				src: "https://example.com/video.mp4",
			};

			const props = createMockProps(componentProps);
			render(<DisplayPlayer {...props} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);

			expect(optionsData.sources[0].src).toBe("https://example.com/video.mp4");
			expect(optionsData.sources[0].type).toBeUndefined();
			expect(optionsData.poster).toBe(""); // BASE_PLAYER_OPTIONS default
			expect(optionsData.audioOnlyMode).toBeUndefined();
		});

		it("handles empty componentProps", () => {
			const props = createMockProps({});
			render(<DisplayPlayer {...props} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);

			expect(optionsData.sources[0].src).toBe("");
			expect(optionsData.sources[0].type).toBeUndefined();
			expect(optionsData.poster).toBe(""); // BASE_PLAYER_OPTIONS default
			expect(optionsData.audioOnlyMode).toBeUndefined();
		});

		it("uses default empty string for src when not provided", () => {
			const componentProps = {
				sourceType: PlayerSourceTypes.Mp4,
				poster: "https://example.com/poster.jpg",
				audioOnlyMode: false,
			};

			const props = createMockProps(componentProps);
			render(<DisplayPlayer {...props} />);

			const videoContainer = screen.getByTestId("video-player-container");
			const optionsData = JSON.parse(
				videoContainer.getAttribute("data-options") || "{}"
			);

			expect(optionsData.sources[0].src).toBe("");
			expect(optionsData.sources[0].type).toBe("video/mp4");
			expect(optionsData.poster).toBe("https://example.com/poster.jpg");
			expect(optionsData.audioOnlyMode).toBe(false);
		});
	});

	describe("Integration with VideoDisplayComponent", () => {
		it("passes correct options to VideoDisplayComponent", () => {
			const componentProps = {
				src: "https://example.com/test.mp4",
				sourceType: PlayerSourceTypes.Mp4,
				poster: "https://example.com/test-poster.jpg",
				audioOnlyMode: false,
			};

			const props = createMockProps(componentProps);
			render(<DisplayPlayer {...props} />);

			expect(screen.getByTestId("display-player")).toBeInTheDocument();
			expect(screen.getByTestId("video-player-container")).toBeInTheDocument();
		});
	});

	describe("Snaps", () => {
		it("renders DisplayPlayer unchanged", () => {
			const componentProps = {
				src: "https://example.com/video.mp4",
				sourceType: PlayerSourceTypes.Mp4,
				poster: "https://example.com/poster.jpg",
				audioOnlyMode: false,
			};

			const props = createMockProps(componentProps);
			const { container } = render(<DisplayPlayer {...props} />);
			expect(container).toMatchSnapshot();
		});

		it("renders VideoDisplayComponent unchanged", () => {
			const options = {
				src: "https://example.com/video.mp4",
				sourceType: PlayerSourceTypes.Mp4,
				poster: "https://example.com/poster.jpg",
				audioOnlyMode: false,
			};

			const { container } = render(<VideoDisplayComponent options={options} />);
			expect(container).toMatchSnapshot();
		});
	});
});
