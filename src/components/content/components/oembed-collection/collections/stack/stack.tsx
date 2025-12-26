import { OEmbed } from "@/types/data-structures/oembed";
import {
	ClientOembed,
	ClientOembedTemplate,
} from "../../content-oembed/client-component";
import styles from "./stack.module.scss";
import { UnknownObject } from "@/types/utils";

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

const renderTemplate = (options: UnknownObject) => {
	return (
		<ul className={`${styles.template}`}>
			{Array.from({ length: 10 }).map((_, index) => (
				<li key={index} data-testid="content-oembed">
					<ClientOembedTemplate />
				</li>
			))}
		</ul>
	);
};

const oembedStack = {
	styles,
	renderMethod,
	renderTemplate,
};

export default oembedStack;
