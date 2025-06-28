import React from "react";
import { render, screen } from "@testing-library/react";
import { ContentOembed, OEmbedComponentProps } from "./content-oembed";

// Mock next/script since it only works in Next.js environment
jest.mock("next/script", () => (props: any) => {
	return <div data-testid="mock-script" {...props} />;
});

// Mock ClientOembed component
jest.mock("./client-component", () => ({
	ClientOembed: ({ html }: { html: string }) => (
		<div
			data-testid="client-oembed"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	),
}));

const baseProps = {
	component: {},
	dataObject: {
		data: {
			oembed: {
				html: "<blockquote>Embedded Content</blockquote>",
			},
		},
	},
};

describe("ContentOembed", () => {
	it("renders the root div with correct test id", async () => {
		const { container } = render(await ContentOembed(baseProps as any));
		expect(
			container.querySelector('[data-testid="content-oembed"]')
		).toBeInTheDocument();
	});

	it("renders the embedded html via ClientOembed", async () => {
		const { container } = render(await ContentOembed(baseProps as any));
		expect(
			container.querySelector('[data-testid="client-oembed"]')
		).toBeInTheDocument();
		expect(
			container.querySelector('[data-testid="client-oembed"]')?.innerHTML
		).toContain("Embedded Content");
	});

	it("renders the Script component when script prop is provided", async () => {
		const propsWithScript = {
			...baseProps,
			dataObject: {
				data: {
					...baseProps.dataObject.data,
					script: "https://example.com/embed.js",
				},
			},
		};
		const { container } = render(await ContentOembed(propsWithScript as any));
		expect(
			container.querySelector('[data-testid="mock-script"]')
		).toBeInTheDocument();
		expect(
			container.querySelector('[data-testid="mock-script"]')
		).toHaveAttribute("src", "https://example.com/embed.js");
	});

	it("does not render ClientOembed if html is missing", async () => {
		const propsNoHtml = {
			...baseProps,
			dataObject: {
				data: {
					oembed: {},
				},
			},
		};
		const { container } = render(await ContentOembed(propsNoHtml as any));
		expect(
			container.querySelector('[data-testid="client-oembed"]')
		).not.toBeInTheDocument();
	});

	it("does not render Script if script is not provided", async () => {
		const { container } = render(await ContentOembed(baseProps as any));
		expect(
			container.querySelector('[data-testid="mock-script"]')
		).not.toBeInTheDocument();
	});
});
