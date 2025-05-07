import { StyleSheet } from "@/types/css";
import { useState } from "react";

interface ArticleImage {
	image: string;
	imageAlt: string;
	styles: StyleSheet;
	fallback: string;
}

export const ArticleImage = ({
	image,
	imageAlt,
	styles,
	fallback,
}: ArticleImage) => {
	const [sourceImage, setSourceImage] = useState(image);

	// we should update image alt
	const onErrorHandler = () => {
		setSourceImage(fallback);
	};

	return (
		<img
			src={sourceImage}
			alt={imageAlt}
			className={styles.image}
			onError={onErrorHandler}
		/>
	);
};
