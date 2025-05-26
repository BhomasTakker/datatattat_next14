import React from "react";
import { render } from "@testing-library/react";
import { VideoPlayerContainer } from "./video-player-container";
import { PlayerOptions } from "./types";
import Player from "video.js/dist/types/player";
const mockApplyPlayerOptions = require("./utils").applyPlayerOptions;

const mockVideoPlayer = jest.fn(({ onReady, options }: any) => {
	// Simulate player object
	const player = {
		play: jest.fn(),
		on: jest.fn(),
	};
	React.useEffect(() => {
		onReady && onReady(player);
	}, [onReady]);
	return <div data-testid="video-player-mock" />;
});
// Mock the VideoPlayer component
jest.mock("./video-player", () => ({
	VideoPlayer: (args: any) => mockVideoPlayer(args),
}));

// Mock applyPlayerOptions
jest.mock("./utils", () => ({
	applyPlayerOptions: jest.fn(),
}));

describe("VideoPlayerContainer", () => {
	const playerRef = { current: null };
	const options: PlayerOptions = {
		autoplay: false,
		controls: true,
		sources: [{ src: "video.mp4", type: "video/mp4" }],
		aspectRatio: "",
		poster: "",
		techOrder: [],
	};

	it("renders VideoPlayer and passes options", () => {
		const { getByTestId } = render(
			<VideoPlayerContainer
				styles={{}}
				playerRef={playerRef}
				options={options}
			/>
		);
		expect(getByTestId("video-player-mock")).toBeInTheDocument();
	});

	it("sets playerRef.current when player is ready", () => {
		render(
			<VideoPlayerContainer
				styles={{}}
				playerRef={playerRef}
				options={options}
			/>
		);
		expect(playerRef.current).not.toBeNull();
	});

	it("calls applyPlayerOptions with player and options", () => {
		render(
			<VideoPlayerContainer
				styles={{}}
				playerRef={playerRef}
				options={options}
			/>
		);
		expect(mockApplyPlayerOptions).toHaveBeenCalledWith(
			expect.any(Object),
			options
		);
	});

	it("calls player.play if autoplay is true", () => {
		const optionsWithAutoplay = { ...options, autoplay: true };
		let playCalled = false;
		// Override the mock to check play
		mockVideoPlayer.mockImplementation(({ onReady }: any) => {
			const player = {
				play: jest.fn(() => {
					playCalled = true;
				}),
				on: jest.fn(),
			};
			React.useEffect(() => {
				onReady && onReady(player);
			}, [onReady]);
			return <div data-testid="video-player-mock" />;
		});
		render(
			<VideoPlayerContainer
				styles={{}}
				playerRef={playerRef}
				options={optionsWithAutoplay}
			/>
		);
		expect(playCalled).toBe(true);
	});

	it("registers dispose event handler", () => {
		let disposeHandler: (() => void) | undefined;
		mockVideoPlayer.mockImplementation(({ onReady }: any) => {
			const player = {
				play: jest.fn(),
				on: jest.fn((event, handler) => {
					if (event === "dispose") disposeHandler = handler;
				}),
			};
			React.useEffect(() => {
				onReady && onReady(player);
			}, [onReady]);
			return <div data-testid="video-player-mock" />;
		});
		render(
			<VideoPlayerContainer
				styles={{}}
				playerRef={playerRef}
				options={options}
			/>
		);
		expect(typeof disposeHandler).toBe("function");
	});
});
