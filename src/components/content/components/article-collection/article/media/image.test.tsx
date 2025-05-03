import React from "react";
import { render, screen } from "@testing-library/react";
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
			/>
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
			/>
		);
		const imgElement = screen.getByAltText("Test Image");
		expect(imgElement).toHaveClass("mock-image-class");
	});

	// what? Copilot?!?!? Bro!!
	// it('renders without crashing', () => {
	//   render(
	//     <ArticleImage image="test-image.jpg" imageAlt="Test Image" styles={mockStyles} />
	//   );
	//   expect(container).toBeInTheDocument();
	// });
});
