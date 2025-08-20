import { OEmbed } from "@/types/data-structures/oembed";
import { ClientOembed } from "../../../content-oembed/client-component";
import styles from "./masonry.module.scss";
import {
	ContainerWidthOptions,
	getContainerWidth,
} from "@/components/page/components/stack/types";

type OembedMasonryProps = {
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

const renderMethod = (collection: OEmbed[] = [], props: OembedMasonryProps) => {
	const { minWidth = "MD" } = props;
	const columnWidth = getContainerWidth(minWidth);

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

const oembedMasonry = {
	styles,
	renderMethod,
};

export default oembedMasonry;
