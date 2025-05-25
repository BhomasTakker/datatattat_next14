import React from "react";
import { render } from "@testing-library/react";
import { articleRenderer, articleTemplate, articleMetaLoader } from "./utils";
import { Article } from "../article/article";
import * as getMetaModule from "@/actions/client/get-meta";

jest.mock("../article/article", () => ({
	Article: jest.fn(() => <div data-testid="article-component" />),
}));

jest.mock("../../../../../actions/client/get-meta", () => ({
	getClientMeta: jest.fn(),
}));

describe("articleRenderer", () => {
	it("renders Article with correct props", () => {
		const styles = { template: "template-class" } as any;
		const item = { id: 1, title: "Test" } as any;
		const Renderer = articleRenderer(styles);
		const { getByTestId } = render(<>{Renderer(item)}</>);
		expect(getByTestId("article-component")).toBeInTheDocument();
		expect(Article).toHaveBeenCalledWith({ article: item, styles }, undefined);
	});
});

describe("articleTemplate", () => {
	it("renders a div with the correct className", () => {
		const styles = { template: "template-class" } as any;
		const { container } = render(articleTemplate(styles));
		const div = container.querySelector("div");
		expect(div).toBeInTheDocument();
		expect(div).toHaveClass("template-class");
	});
});

describe("articleMetaLoader", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("calls getClientMeta if loadData is truthy", async () => {
		const item = { loadData: true, foo: "bar" } as any;
		const mockMeta = { meta: "data" };
		(getMetaModule.getClientMeta as jest.Mock).mockResolvedValue(mockMeta);

		const loader = articleMetaLoader(item);
		const result = await loader();

		expect(getMetaModule.getClientMeta).toHaveBeenCalledWith(item);
		expect(result).toBe(mockMeta);
	});

	it("returns item if loadData is falsy", async () => {
		const item = { loadData: false, foo: "bar" } as any;
		const loader = articleMetaLoader(item);
		const result = await loader();

		expect(getMetaModule.getClientMeta).not.toHaveBeenCalled();
		expect(result).toBe(item);
	});
});
