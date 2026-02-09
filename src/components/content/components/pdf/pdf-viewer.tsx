"use client";

import { ComponentProps } from "@/types/component";
import { useState, useEffect, useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import styles from "./pdf-viewer.module.scss";
import { PDFPagination } from "./pagination";
import { PDFLoadError } from "./pdf-error";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

type PDFViewerComponentProps = {
	pdfUrl: string;
	pageNumber?: string;
};

export const PDFViewer = ({ component, dataObject }: ComponentProps) => {
	const { componentProps } = component;
	const { pdfUrl, pageNumber = "1" } =
		componentProps as unknown as PDFViewerComponentProps;

	// probably useReducer would be cleaner here but this is straightforward enough for now
	const [numPages, setNumPages] = useState<number>();
	const [pageNum, setPageNumber] = useState<number>(
		parseInt(pageNumber, 10) || 1,
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [pageWidth, setPageWidth] = useState<number>(800);
	const containerRef = useRef<HTMLDivElement>(null);

	// useHook to track container width for responsive scaling
	useEffect(() => {
		const updateWidth = () => {
			if (containerRef.current) {
				setPageWidth(containerRef.current.offsetWidth);
			}
		};

		// Initial measurement
		setTimeout(updateWidth, 0);

		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
		setLoading(false);
		setError(null);
	}

	function onDocumentLoadError(error: Error): void {
		console.error("Error loading PDF:", error);
		setError(error.message || "Failed to load PDF");
		setLoading(false);
	}

	function changePage(offset: number): void {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function previousPage(): void {
		changePage(-1);
	}

	function nextPage(): void {
		changePage(1);
	}

	// Use proxy to avoid CORS issues
	const proxiedUrl = `/api/proxy-pdf?url=${encodeURIComponent(pdfUrl)}`;

	if (error) {
		return <PDFLoadError error={error} pdfUrl={pdfUrl} />;
	}

	return (
		<div className={styles.container}>
			{loading && <div className={styles.loading}>Loading PDF...</div>}

			<div ref={containerRef} className={styles.pdfWrapper}>
				<Document
					file={proxiedUrl}
					onLoadSuccess={onDocumentLoadSuccess}
					onLoadError={onDocumentLoadError}
					// show template
					loading={<div>Loading document...</div>}
				>
					<Page
						pageNumber={pageNum}
						renderTextLayer={true}
						renderAnnotationLayer={true}
						width={pageWidth}
					/>
				</Document>
			</div>

			<PDFPagination
				pageNum={pageNum}
				numPages={numPages}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
		</div>
	);
};
