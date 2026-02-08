"use client";
// This could and perhaps should be a generic component?
// Isit possible and sensible to try
import { Button } from "@/components/ui/button";
import styles from "./pagination.module.scss";

type PDFPaginationProps = {
	pageNum: number;
	numPages?: number;
	previousPage: () => void;
	nextPage: () => void;
};

export const PDFPagination = ({
	pageNum,
	numPages,
	previousPage,
	nextPage,
}: PDFPaginationProps) => {
	return (
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
	);
};
