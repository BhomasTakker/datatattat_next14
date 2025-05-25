import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import { VideoPlayer } from "./video-player";
import videojs from "video.js";

jest.mock("video.js");
jest.mock("videojs-youtube", () => ({}));

const mockDispose = jest.fn();
const mockOptions = jest.fn();
const mockIsDisposed = jest.fn(() => false);

const mockPlayerInstance = {
	dispose: mockDispose,
	options: mockOptions,
	isDisposed: mockIsDisposed,
};

(videojs as unknown as jest.Mock).mockImplementation(() => mockPlayerInstance);

describe("VideoPlayer", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Clean up DOM for each test
		document.body.innerHTML = "";
	});

	const defaultOptions = {
		controls: true,
		sources: [{ src: "https://test.com/video.mp4", type: "video/mp4" }],
		aspectRatio: "16:9",
		poster: "",
		techOrder: ["html5"],
	};

	it("renders without crashing", () => {
		const { container } = render(
			<VideoPlayer options={defaultOptions} onReady={jest.fn()} />
		);
		expect(container.querySelector("[data-vjs-player]")).toBeInTheDocument();
	});

	it("initializes videojs player on mount", () => {
		const onReady = jest.fn();
		render(<VideoPlayer options={defaultOptions} onReady={onReady} />);
		expect(videojs).toHaveBeenCalled();
		waitFor(() => {
			expect(onReady).toHaveBeenCalledWith(mockPlayerInstance);
		});
	});

	it("updates player options when options prop changes", () => {
		const { rerender } = render(
			<VideoPlayer options={defaultOptions} onReady={jest.fn()} />
		);
		const newOptions = {
			...defaultOptions,
			controls: false,
		};
		rerender(<VideoPlayer options={newOptions} onReady={jest.fn()} />);
		expect(mockOptions).toHaveBeenCalledWith(newOptions);
	});

	it("disposes player on unmount", () => {
		const { unmount } = render(
			<VideoPlayer options={defaultOptions} onReady={jest.fn()} />
		);
		unmount();
		expect(mockDispose).toHaveBeenCalled();
	});

	it("does not dispose player if already disposed", () => {
		mockIsDisposed.mockReturnValueOnce(true);
		const { unmount } = render(
			<VideoPlayer options={defaultOptions} onReady={jest.fn()} />
		);
		unmount();
		expect(mockDispose).not.toHaveBeenCalled();
	});
});
