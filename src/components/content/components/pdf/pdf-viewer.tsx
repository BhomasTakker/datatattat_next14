"use client";

import { ComponentProps } from "@/types/component";
import { useState, useEffect, useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import styles from "./pdf-viewer.module.scss";
import { Button } from "@/components/ui/button";

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
	const [numPages, setNumPages] = useState<number>();
	const [pageNum, setPageNumber] = useState<number>(
		parseInt(pageNumber, 10) || 1,
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [pageWidth, setPageWidth] = useState<number>(800);
	const containerRef = useRef<HTMLDivElement>(null);

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

	return (
		<div className={styles.container}>
			{error && (
				<div className={styles.error}>
					<p>
						<strong>Unable to load PDF:</strong> {error}
					</p>
					<p className={styles.errorHint}>
						This PDF may be protected by CORS or bot detection. You can try
						opening it directly:
					</p>
					<Button
						onClick={() => window.open(pdfUrl, "_blank")}
						className={styles.openButton}
					>
						📄 Open PDF in New Tab
					</Button>
				</div>
			)}

			{loading && !error && (
				<div className={styles.loading}>Loading PDF...</div>
			)}

			{!error && (
				<div ref={containerRef} className={styles.pdfWrapper}>
					<Document
						file={proxiedUrl}
						onLoadSuccess={onDocumentLoadSuccess}
						onLoadError={onDocumentLoadError}
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
			)}

			{!error && (
				<div className={styles.controls}>
					<Button
						onClick={previousPage}
						disabled={pageNum <= 1}
						className={styles.button}
					>
						Previous
					</Button>

					<p className={styles.pageInfo}>
						Page {pageNum} of {numPages || "?"}
					</p>

					<Button
						onClick={nextPage}
						disabled={!numPages || pageNum >= numPages}
						className={styles.button}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};
