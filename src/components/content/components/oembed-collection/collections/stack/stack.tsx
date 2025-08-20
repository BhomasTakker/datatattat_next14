import { OEmbed } from "@/types/data-structures/oembed";
import { ClientOembed } from "../../../content-oembed/client-component";
import styles from "./stack.module.scss";

export type OembedStackProps = {};

const renderOembed = (item: OEmbed) => {
	const { src, html } = item || {};

	return (
		<li key={item.id} data-testid="content-oembed" className={styles.root}>
			{html && <ClientOembed html={html} />}
		</li>
	);
};

const renderMethod = (collection: OEmbed[] = [], props: OembedStackProps) => {
	return (
		<ul className={`${styles.list}`}>
			{collection.map((item) => renderOembed(item))}
		</ul>
	);
};

const oembedStack = {
	styles,
	renderMethod,
};

export default oembedStack;
