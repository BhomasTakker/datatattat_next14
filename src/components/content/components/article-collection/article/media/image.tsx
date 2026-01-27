import { StyleSheet } from "@/types/css";
import { useState } from "react";
import { fallbackImageGradient } from "../utils/fallback";

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

	const onErrorHandler = () => {
		if (sourceImage === fallbackImageGradient()) return; // final fallback reached
		if (sourceImage === fallback) {
			setSourceImage(fallbackImageGradient());
			return;
		}

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
