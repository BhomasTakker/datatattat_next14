import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { WithData } from "./with-data";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

// Mock WithData component for demonstration
// Replace this import with your actual WithData import

const template = <div>...loading</div>;
const dataFetcher = () =>
	Promise.resolve({
		title: "Hello World!",
		content: "This is the loaded content.",
	} as unknown as CollectionItem);
const articleRenderer = (data: any) => (
	<div>
		<h1>{data.title}</h1>
		<p>{data.content}</p>
	</div>
);

describe("WithData", () => {
	it("renders loading state initially", () => {
		render(
			<WithData
				getter={dataFetcher}
				callback={articleRenderer}
				template={template}
			/>
		);
		expect(screen.getByText(/loading/i)).toBeInTheDocument();
	});

	it("renders data when fetchData resolves", async () => {
		render(
			<WithData
				getter={dataFetcher}
				callback={articleRenderer}
				template={template}
			/>
		);
		await waitFor(() =>
			expect(screen.getByText(/hello world/i)).toBeInTheDocument()
		);
	});

	it("renders error state when fetchData rejects", async () => {
		render(
			<WithData
				getter={() => Promise.reject(new Error("Error fetching data"))}
				callback={articleRenderer}
				template={template}
			/>
		);
		await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
	});
});
