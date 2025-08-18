import { OEmbed } from "@/types/data-structures/oembed";
import { ClientOembed } from "../../../content-oembed/client-component";
import styles from "./stack.module.scss";
import { UnknownObject } from "@/types/utils";

const renderOembed = (item: OEmbed) => {
	const { src, html } = item;

	console.log("Rendering Oembed:", { item });

	// const template = articleTemplate(styles);
	return (
		<div data-testid="content-oembed" className={styles.root}>
			{html && <ClientOembed html={html} />}
		</div>
	);
};

const renderMethod = (collection: any[] = [], _: UnknownObject) => {
	return collection.map((item) => renderOembed(item));
};

const oembedStack = {
	styles,
	renderMethod,
};

export default oembedStack;
