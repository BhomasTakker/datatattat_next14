import React, { createRef } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { AudioPlayer } from "./audio-player";

const mockSrc = "test-audio.mp3";

function setup() {
	const audioPlayerRef = createRef<HTMLAudioElement>();
	const utils = render(
		<AudioPlayer src={mockSrc} audioPlayerRef={audioPlayerRef} />
	);
	const playPauseButton = utils.getAllByRole("button")[1];
	const back30Button = utils.getAllByRole("button")[0];
	const forward30Button = utils.getAllByRole("button")[2];
	const volumeButton = utils.getAllByRole("button")[3];
	const volumeSlider = utils.container.querySelector(
		'input[type="range"].' + "volume"
	);
	const progressBar = utils.container.querySelector(
		'input[type="range"].' + "progressBar"
	);
	return {
		...utils,
		audioPlayerRef,
		playPauseButton,
		back30Button,
		forward30Button,
		volumeButton,
		volumeSlider,
		progressBar,
	};
}

describe("AudioPlayer", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders audio element with correct src", () => {
		const { container } = setup();
		const audio = container.querySelector("audio");
		expect(audio).toBeInTheDocument();
		expect(audio?.getAttribute("src")).toBe(mockSrc);
	});

	it("toggles play/pause when playPauseButton is clicked", () => {
		const { playPauseButton, audioPlayerRef } = setup();
		const play = jest.fn();
		const pause = jest.fn();
		// @ts-ignore
		audioPlayerRef.current = {
			play,
			pause,
			paused: true,
			currentTime: 0,
			duration: 100,
			volume: 0.5,
			muted: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
		// Play
		fireEvent.click(playPauseButton);
		expect(play).toHaveBeenCalled();
		// Pause
		fireEvent.click(playPauseButton);
		expect(pause).toHaveBeenCalled();
	});

	it("calls back30Handler and forward30Handler", () => {
		const { back30Button, forward30Button, progressBar, audioPlayerRef } =
			setup();
		// @ts-ignore
		audioPlayerRef.current = {
			currentTime: 50,
			duration: 100,
			volume: 0.5,
			muted: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
		if (progressBar) {
			// @ts-ignore - Property 'value' does not exist on type 'Element'
			progressBar.value = "50";
			fireEvent.click(back30Button);
			// @ts-ignore - Property 'value' does not exist on type 'Element'
			expect(Number(progressBar.value)).toBe(20);
			// @ts-ignore - Property 'value' does not exist on type 'Element'
			progressBar.value = "50";
			fireEvent.click(forward30Button);
			// @ts-ignore - Property 'value' does not exist on type 'Element'
			expect(Number(progressBar.value)).toBe(80);
		}
	});

	it("toggles mute when volumeButton is clicked", () => {
		const { volumeButton, audioPlayerRef } = setup();
		// @ts-ignore
		audioPlayerRef.current = {
			muted: false,
			volume: 0.5,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
		fireEvent.click(volumeButton);
		// @ts-ignore - current is possibly null
		expect(audioPlayerRef.current.muted).toBe(true);
		fireEvent.click(volumeButton);
		// @ts-ignore - current is possibly null
		expect(audioPlayerRef.current.muted).toBe(false);
	});

	it("changes volume when volume slider is changed", () => {
		const { volumeSlider, audioPlayerRef } = setup();
		// @ts-ignore
		audioPlayerRef.current = {
			volume: 0.5,
			muted: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
		if (volumeSlider) {
			fireEvent.change(volumeSlider, { target: { value: "80" } });
			// @ts-ignore - current is possibly null
			expect(audioPlayerRef.current.volume).toBeCloseTo(0.8);
		}
	});

	it("updates currentTime and progress bar on range change", () => {
		const { progressBar, audioPlayerRef } = setup();
		// @ts-ignore
		audioPlayerRef.current = {
			currentTime: 0,
			duration: 100,
			volume: 0.5,
			muted: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
		if (progressBar) {
			fireEvent.change(progressBar, { target: { value: "30" } });
			// @ts-ignore - current is possibly null
			expect(audioPlayerRef.current.currentTime).toBe(30);
		}
	});

	it("displays formatted time", () => {
		const { container, audioPlayerRef } = setup();
		// @ts-ignore - missing ....
		audioPlayerRef.current = {
			currentTime: 65,
			duration: 125,
			volume: 0.5,
			muted: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
		// Not sure what copilot was trying to do here, but it was causing issues
		// act(() => {
		// 	fireEvent(audioPlayerRef.current as any, new Event("play"));
		// });
		const timeDisplay = container.querySelector("." + "time");
		expect(timeDisplay?.textContent).toMatch(/\d{2}:\d{2} \/ \d{2}:\d{2}/);
	});

	describe("Snaps", () => {
		it("matches snapshot", () => {
			const { asFragment } = setup();
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
