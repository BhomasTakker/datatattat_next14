import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ArticleImage } from "./image";

describe("ArticleImage Component", () => {
	const mockStyles = {
		image: "mock-image-class",
	};

	it("renders the image with the correct src and alt attributes", () => {
		render(
			<ArticleImage
				image="test-image.jpg"
				fallback="fallback-image.jpg"
				imageAlt="Test Image"
				styles={mockStyles}
			/>,
		);
		const imgElement = screen.getByAltText("Test Image");
		expect(imgElement).toHaveAttribute("src", "test-image.jpg");
	});

	it("applies the correct styles to the image", () => {
		render(
			<ArticleImage
				image="test-image.jpg"
				fallback="fallback-image.jpg"
				imageAlt="Test Image"
				styles={mockStyles}
			/>,
		);
		const imgElement = screen.getByAltText("Test Image");
		expect(imgElement).toHaveClass("mock-image-class");
	});

	it("switches to fallback image when primary image fails to load", () => {
		render(
			<ArticleImage
				image="broken-image.jpg"
				fallback="fallback-image.jpg"
				imageAlt="Test Image"
				styles={mockStyles}
			/>,
		);
		const imgElement = screen.getByAltText("Test Image");
		expect(imgElement).toHaveAttribute("src", "broken-image.jpg");

		// Simulate image load error
		fireEvent.error(imgElement);

		expect(imgElement).toHaveAttribute("src", "fallback-image.jpg");
	});

	it("switches to gradient when both primary and fallback images fail", () => {
		render(
			<ArticleImage
				image="broken-image.jpg"
				fallback="broken-fallback.jpg"
				imageAlt="Test Image"
				styles={mockStyles}
			/>,
		);
		const imgElement = screen.getByAltText("Test Image");

		// First error - should switch to fallback
		fireEvent.error(imgElement);
		expect(imgElement).toHaveAttribute("src", "broken-fallback.jpg");

		// Second error - should switch to gradient
		fireEvent.error(imgElement);
		const currentSrc = imgElement.getAttribute("src");
		expect(currentSrc).toContain("data:image/svg+xml");
		expect(currentSrc).toContain("linearGradient");
	});

	it("does not change image when gradient fallback fails", () => {
		render(
			<ArticleImage
				image="broken-image.jpg"
				fallback="broken-fallback.jpg"
				imageAlt="Test Image"
				styles={mockStyles}
			/>,
		);
		const imgElement = screen.getByAltText("Test Image");

		// Trigger errors to get to gradient
		fireEvent.error(imgElement);
		fireEvent.error(imgElement);
		const gradientSrc = imgElement.getAttribute("src");

		// Third error - should not change
		fireEvent.error(imgElement);
		expect(imgElement.getAttribute("src")).toBe(gradientSrc);
	});
});
