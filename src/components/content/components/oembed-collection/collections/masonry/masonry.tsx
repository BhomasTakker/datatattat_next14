import { OEmbed } from "@/types/data-structures/oembed";
import { ClientOembed } from "../../content-oembed/client-component";
import styles from "./masonry.module.scss";
import { ContainerWidthOptions } from "@/components/page/components/stack/types";
import { UnknownObject } from "@/types/utils";

export type OembedMasonryProps = {
	minWidth: ContainerWidthOptions; // e.g. "xs", "sm", "md", "lg", "xl"
};

const renderOembed = (item: OEmbed) => {
	const { src, html } = item || {};

	return (
		<li key={item.id} data-testid="content-oembed">
			{html && <ClientOembed html={html} />}
		</li>
	);
};

// Oembed Minimum Sizes?
const Sizes = {
	XXS: "305",
	XS: "350",
	SM: "400",
	MD: "480",
	LG: "560",
	XL: "750",
	XXL: "900",
} as const;

const renderMethod = (collection: OEmbed[] = [], props: unknown) => {
	const { minWidth = "MD" } = props as OembedMasonryProps;
	const columnWidth = Sizes[minWidth];

	return (
		<ul
			className={`${styles.masonryGrid}`}
			style={
				{
					"--column-width": `${columnWidth}px`,
				} as React.CSSProperties
			}
		>
			{collection.map((item: OEmbed) => renderOembed(item))}
		</ul>
	);
};

const renderTemplate = (options: UnknownObject) => {
	return (
		<div className={styles.oembedPlaceholder}>Oembed Masonry Template</div>
	);
};

const oembedMasonry = {
	styles,
	renderMethod,
	renderTemplate,
};

export default oembedMasonry;
