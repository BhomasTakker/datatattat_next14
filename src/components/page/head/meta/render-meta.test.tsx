/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
// Workaround to test meta tags without actually rendering to screen
import React from "react";
import { render } from "@testing-library/react";
import { renderMeta } from "./render-meta";

describe("renderMeta", () => {
	it("should render meta tags correctly", () => {
		const data = {
			description: "Test description",
			keywords: "test, jest, react",
		};

		const { container } = render(<>{renderMeta({ data })}</>);

		const metaTags = container.querySelectorAll("meta");
		expect(metaTags.length).toBe(2);

		const descriptionMeta = container.querySelector('meta[name="description"]');
		expect(descriptionMeta).toBeInTheDocument();
		expect(descriptionMeta).toHaveAttribute("content", "Test description");

		const keywordsMeta = container.querySelector('meta[name="keywords"]');
		expect(keywordsMeta).toBeInTheDocument();
		expect(keywordsMeta).toHaveAttribute("content", "test, jest, react");
	});

	it("should render no meta tags if data is empty", () => {
		const data = {};

		const { container } = render(<>{renderMeta({ data })}</>);

		const metaTags = container.querySelectorAll("meta");
		expect(metaTags.length).toBe(0);
	});

	it("should render meta tags with correct keys", () => {
		const data = {
			"og:title": "Test Open Graph Title",
			"og:type": "website",
		};

		const { container } = render(<>{renderMeta({ data })}</>);

		const metaTags = container.querySelectorAll("meta");
		expect(metaTags.length).toBe(2);

		const ogTitleMeta = container.querySelector('meta[property="og:title"]');
		expect(ogTitleMeta).toBeInTheDocument();
		expect(ogTitleMeta).toHaveAttribute("content", "Test Open Graph Title");

		const ogTypeMeta = container.querySelector('meta[property="og:type"]');
		expect(ogTypeMeta).toBeInTheDocument();
		expect(ogTypeMeta).toHaveAttribute("content", "website");
	});
});
