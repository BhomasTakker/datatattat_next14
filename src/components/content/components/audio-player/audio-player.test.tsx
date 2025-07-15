import React from "react";
import { render, screen } from "@testing-library/react";
import { AudioPlayer } from "./audio-player";

// Mock styles import
jest.mock("./audio-player.module.scss", () => ({
	audioPlayer: "audioPlayer",
	card: "card",
}));

// Mock react-h5-audio-player
jest.mock("react-h5-audio-player", () => {
	return {
		__esModule: true,
		default: React.forwardRef((props: any, ref) => (
			<div data-testid="h5-audio-player" ref={ref} {...props}>
				H5AudioPlayer
				<span data-testid="src">{props.src}</span>
			</div>
		)),
		RHAP_UI: {
			MAIN_CONTROLS: "MAIN_CONTROLS",
			VOLUME_CONTROLS: "VOLUME_CONTROLS",
		},
	};
});

// Mock VideoDisplayComponent
jest.mock("../display-player/display-player", () => ({
	VideoDisplayComponent: (props: any) => (
		<div data-testid="video-display-component" {...props}>
			VideoDisplayComponent
			<span data-testid="video-src">{props.options?.src}</span>
			<span data-testid="audio-only">
				{props.options?.audioOnlyMode ? "true" : "false"}
			</span>
		</div>
	),
}));

describe("AudioPlayer", () => {
	it("renders default audio player for normal audio src", () => {
		render(<AudioPlayer src="audio.mp3" />);
		expect(screen.getByTestId("h5-audio-player")).toBeInTheDocument();
		expect(screen.getByTestId("src")).toHaveTextContent("audio.mp3");
		expect(
			screen.queryByTestId("video-display-component")
		).not.toBeInTheDocument();
	});

	it("renders radio variant with correct props", () => {
		render(<AudioPlayer src="radio.mp3" variant="radio" />);
		expect(screen.getByTestId("h5-audio-player")).toBeInTheDocument();
		expect(screen.getByTestId("src")).toHaveTextContent("radio.mp3");
		// Since we can't check props directly, check that the component rendered
	});

	it("renders VideoDisplayComponent for .m3u8 src", () => {
		render(<AudioPlayer src="stream.m3u8" />);
		expect(screen.getByTestId("video-display-component")).toBeInTheDocument();
		expect(screen.getByTestId("video-src")).toHaveTextContent("stream.m3u8");
		expect(screen.getByTestId("audio-only")).toHaveTextContent("true");
		expect(screen.queryByTestId("h5-audio-player")).not.toBeInTheDocument();
	});

	it("applies correct class names", () => {
		render(<AudioPlayer src="audio.mp3" />);
		expect(
			screen.getByText("H5AudioPlayer").parentElement?.className
		).toContain("audioPlayer");
	});

	it("renders with custom variant", () => {
		render(<AudioPlayer src="audio.mp3" variant="custom" />);
		expect(screen.getByTestId("h5-audio-player")).toBeInTheDocument();
	});

	describe("Snaps", () => {
		it("matches snapshot for default audio player", () => {
			const { container } = render(<AudioPlayer src="audio.mp3" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for radio variant", () => {
			const { container } = render(
				<AudioPlayer src="radio.mp3" variant="radio" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for .m3u8 src (VideoDisplayComponent)", () => {
			const { container } = render(<AudioPlayer src="stream.m3u8" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for custom variant", () => {
			const { container } = render(
				<AudioPlayer src="audio.mp3" variant="custom" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
