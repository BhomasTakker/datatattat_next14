import { ComponentProps } from "@/types/component";
import styles from "./content-oembed.module.scss";
import Script from "next/script";
import { ClientOembed } from "./client-component";
import { OEmbed } from "@/types/data-structures/oembed";

export type OEmbedComponentProps = {
	oembed: OEmbed;
	script?: string;
};

export const ContentOembed = async ({
	component,
	dataObject,
}: ComponentProps) => {
	const data = dataObject.data as OEmbedComponentProps;
	const { oembed, script } = data || {};
	// We 'should' sanitize this - twitter etc eon't render however
	// We need to limit providers - and trust them
	// const { html = "" } = oembedData || {};

	const { html } = oembed;
	return (
		<div data-testid="content-oembed" className={styles.root}>
			{script && <Script src={script} strategy="lazyOnload" />}
			{html && <ClientOembed html={html} />}
		</div>
	);
};
