import React from "react";
import { render } from "@testing-library/react";
import { renderFavIcons } from "./fav-icon";

describe("renderFavIcons", () => {
	it("renders the correct number of favicons", () => {
		const icons = [
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
		];

		const { container } = render(<>{renderFavIcons({ icons })}</>);
		const linkElements = container.querySelectorAll("link");

		expect(linkElements.length).toBe(icons.length);
	});

	it("renders favicons with correct attributes", () => {
		const icons = [
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
		];

		const { container } = render(<>{renderFavIcons({ icons })}</>);
		const linkElement = container.querySelector("link");

		expect(linkElement).toHaveAttribute("rel", "icon");
		expect(linkElement).toHaveAttribute("type", "image/png");
		expect(linkElement).toHaveAttribute("sizes", "32x32");
		expect(linkElement).toHaveAttribute("href", "/favicon-32x32.png");
	});
});