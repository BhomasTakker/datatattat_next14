import styles from "./pdf-template.module.scss";

type PDFTemplateProps = {
	width?: number;
	aspectRatio?: number;
};

export const PDFTemplate = ({
	width = 800,
	aspectRatio = 1.414, // Standard A4 aspect ratio (297/210)
}: PDFTemplateProps) => {
	const height = width * aspectRatio;

	return (
		<div
			className={styles.template}
			style={{
				width: `${width}px`,
				height: `${height}px`,
			}}
			aria-label="Loading PDF document"
		/>
	);
};
