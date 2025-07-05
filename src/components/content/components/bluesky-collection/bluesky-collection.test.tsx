import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
	BlueSkyCollection,
	BlueSkyOembedComponent,
} from "./bluesky-collection";
import { PageComponent } from "@/types/page";
import { getOembed } from "@/actions/oembed/get-oembed";

jest.mock("../../../../actions/oembed/get-oembed", () => ({
	getOembed: jest.fn(),
}));
// Mock dependencies
jest.mock("../content-oembed/content-oembed", () => ({
	ContentOembed: ({ dataObject }: any) => (
		<div data-testid="mock-content-oembed">{JSON.stringify(dataObject)}</div>
	),
}));

jest.mock("../../../../lib/api/component-data/oembed/options/bluesky", () => ({
	blueskyOembedByUri: {
		script: "<script>test</script>",
		createUrl: (uri: string) => `https://bsky.app/oembed?uri=${uri}`,
	},
}));

describe("BlueSkyOembedComponent", () => {
	const component: PageComponent = { id: "test", type: "test" } as any;

	it("renders ContentOembed with fetched oembed data", async () => {
		(getOembed as jest.Mock).mockResolvedValueOnce({ foo: "bar" });

		render(
			// @ts-ignore
			await BlueSkyOembedComponent({ uri: "test-uri", component })
		);

		expect(screen.getByTestId("bluesky-oembed")).toBeInTheDocument();
		expect(screen.getByTestId("mock-content-oembed")).toHaveTextContent("foo");
	});

	it("returns null and logs error if getOembed throws", async () => {
		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		(getOembed as jest.Mock).mockRejectedValueOnce(new Error("fail"));

		// @ts-ignore
		const result = await BlueSkyOembedComponent({
			uri: "bad-uri",
			component,
		});
		expect(result).toBeNull();
		expect(errorSpy).toHaveBeenCalledWith(
			"Error fetching oembed for Bluesky URI:",
			"bad-uri",
			expect.any(Error)
		);
		errorSpy.mockRestore();
	});
});

describe("BlueSkyCollection", () => {
	const component: PageComponent = { id: "test", type: "test" } as any;

	it("renders a collection with multiple BlueSkyOembedComponent", () => {
		const dataObject = { data: { items: ["uri1", "uri2"] } };
		render(<BlueSkyCollection component={component} dataObject={dataObject} />);
		waitFor(() => {
			const collection = screen.getByTestId("bluesky-collection");
			expect(collection).toBeInTheDocument();
			// Should render as many children as items (as unresolved promises)
			expect(collection.childNodes.length).toBe(2);
		});
	});

	it("renders nothing if items is empty", () => {
		const dataObject = { data: { items: [] } };
		render(<BlueSkyCollection component={component} dataObject={dataObject} />);
		const collection = screen.getByTestId("bluesky-collection");
		expect(collection.childNodes.length).toBe(0);
	});

	it("handles missing dataObject.data gracefully", () => {
		// @ts-expect-error - Intentionally passing an empty object
		render(<BlueSkyCollection component={component} dataObject={{}} />);
		const collection = screen.getByTestId("bluesky-collection");
		expect(collection.childNodes.length).toBe(0);
	});
});
