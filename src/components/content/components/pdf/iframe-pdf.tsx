import styles from "./iframe-pdf.module.scss";
import { useState, useEffect, useRef } from "react";
import { isPDF } from "./utils";

type IframePDFProps = {
	src: string;
	errorComponent?: React.ReactNode;
};

export const IframePDF = ({ src, errorComponent }: IframePDFProps) => {
	const [error, setError] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const isValidPDFSource = isPDF(src);

	useEffect(() => {
		if (!isValidPDFSource) {
			setError(true);
			return;
		}

		setError(false);
		timeoutRef.current = setTimeout(() => {
			setError(true);
			// magic number / somewhere
		}, 10000); // 10 second timeout

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [src, isValidPDFSource]);

	const handleLoad = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setError(false);
	};

	return (
		<div className={styles.root}>
			{error && (errorComponent ? errorComponent : <p>Failed to load PDF</p>)}
			{!error && (
				<iframe
					ref={iframeRef}
					src={src}
					className={styles.pdf}
					onLoad={handleLoad}
					onError={() => setError(true)}
				/>
			)}
		</div>
	);
};
