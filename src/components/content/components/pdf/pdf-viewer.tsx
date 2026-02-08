"use client";

import { ComponentProps } from "@/types/component";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

export const PDFViewer = ({ component, dataObject }: ComponentProps) => {
	console.log("PDFViewer component", { component, dataObject });
	const { componentProps } = component;
	const { pdfUrl } = componentProps as unknown as { pdfUrl: string };
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}

	console.log("Rendering PDFViewer with pdfUrl:", pdfUrl);
	console.log(
		"Rendering PDFViewer with pdfUrl:",
		component.componentProps.pdfUrl,
	);
	console.log(
		"Rendering PDFViewer with componentProps:",
		component.componentProps,
	);
	console.log("Rendering PDFViewer with component:", component);

	return (
		<div>
			<Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
				<Page pageNumber={pageNumber} />
			</Document>
			<p>
				Page {pageNumber} of {numPages}
			</p>
		</div>
	);
};
