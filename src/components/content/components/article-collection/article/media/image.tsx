import { StyleSheet } from "@/types/css";

interface ArticleImage {
	image: string;
	imageAlt: string;
	styles: StyleSheet;
}

export const ArticleImage = ({
	image,
	imageAlt,
	styles,
}: // take in effect - i.e. greyscale
ArticleImage) => {
	return (
		// data-aspect?
		// <Image src={image} alt={imageAlt} className={styles.image} fill />
		<img src={image} alt={imageAlt} className={styles.image} />
	);
};
