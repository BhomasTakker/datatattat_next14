import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Article } from "./article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { StyleSheet } from "@/types/css";

// Mock the ArticleImage and Meta components
jest.mock("./media/image", () => {
	return {
		__esModule: true,
		ArticleImage: ({
			image,
			imageAlt,
		}: {
			image: string;
			imageAlt: string;
		}) => {
			return (
				<div data-testid="mock-article-image">
					<div data-testid="image">{image}</div>
					<div data-testid="imageAlt">{imageAlt}</div>
				</div>
			);
		},
	};
});
jest.mock("./meta/meta", () => {
	return {
		__esModule: true,
		Meta: () => <div data-testid="mock-meta" />,
	};
});

jest.mock("../../../../../utils/html", () => {
	return {
		__esModule: true,
		stripHTML: (html: string) => html,
	};
});

const mockStyles: StyleSheet = {
	article: "article-class",
	contentContainer: "content-container-class",
	textContainer: "text-container-class",
	title: "title-class",
	description: "description-class",
};

const mockArticle: CollectionItem = {
	src: "https://www.bbc.co.uk/news",
	guid: "test-guid",
	variant: "test-variant",
	title: "Test Title",
	description: "Test Description",
	avatar: {
		src: "test-image-src",
		alt: "test-image-alt",
	},
	details: {
		categories: ["Category1", "Category2"],
		authors: ["Author1", "Author2"],
		published: "2023-01-01",
		publishers: ["Publisher1"],
	},
};

describe("Article Component", () => {
	it("renders the article with title and description", () => {
		render(<Article article={mockArticle} styles={mockStyles} />);

		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();
	});

	it("renders the ArticleImage component when image is provided", () => {
		render(<Article article={mockArticle} styles={mockStyles} />);
		expect(screen.getByTestId("mock-article-image")).toBeInTheDocument();
	});

	it("renders the Meta component with correct props", () => {
		render(<Article article={mockArticle} styles={mockStyles} />);
		expect(screen.getByTestId("mock-meta")).toBeInTheDocument();
	});

	it("does not render the ArticleImage component when image is not provided", () => {
		const articleWithoutImage = { ...mockArticle, avatar: null };
		// @ts-expect-error - we are passing dead data for the image
		render(<Article article={articleWithoutImage} styles={mockStyles} />);
		expect(screen.queryByTestId("mock-article-image")).not.toBeInTheDocument();
	});

	it("renders default alt text when image alt is not provided", () => {
		const articleWithoutImageAlt = {
			...mockArticle,
			avatar: { src: "test-image-src", alt: "" },
		};
		render(<Article article={articleWithoutImageAlt} styles={mockStyles} />);
		expect(
			screen.getByText(
				"We're sorry. This image does not have any alternative text."
			)
		).toBeInTheDocument();
	});
});
