"use client";

import { Button } from "@/components/ui/button";
import styles from "./pdf-error.module.scss";

type PDFLoadErrorProps = {
	error: string;
	pdfUrl: string;
};

const ERROR_MESSAGE =
	"Failed to load PDF. This may be due to CORS restrictions or bot detection on the source server.";

export const PDFLoadError = ({ error, pdfUrl }: PDFLoadErrorProps) => {
	return (
		<div className={styles.error}>
			<p>
				<strong>Unable to load PDF:</strong> {error}
			</p>
			<p className={styles.errorHint}>{ERROR_MESSAGE}</p>
			<Button
				onClick={() => window.open(pdfUrl, "_blank")}
				className={styles.openButton}
			>
				📄 Open PDF in New Tab
			</Button>
		</div>
	);
};
