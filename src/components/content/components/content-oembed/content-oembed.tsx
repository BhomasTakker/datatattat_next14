"use client";

import { ComponentProps } from "@/types/component";
import styles from "./content-oembed.module.scss";
import { ClientOembed } from "./client-component";
import { OEmbed } from "@/types/data-structures/oembed";
import { useEffect } from "react";

export type OEmbedComponentProps = {
	oembed: OEmbed;
	script?: string;
};

export const ContentOembed = ({ component, dataObject }: ComponentProps) => {
	const data = dataObject.data as OEmbedComponentProps;
	const { oembed, script } = data || {};
	// We 'should' sanitize this - twitter etc eon't render however
	// We need to limit providers - and trust them
	// const { html = "" } = oembedData || {};

	// This is a workaround to ensure the oEmbed content is rendered correctly
	// after hydration, on navigation we need to reload the script
	// as some oEmbed providers require JavaScript to render.
	// We 'should' determine this on a per provider basis and not use a blanket approach.
	useEffect(() => {
		if (script) {
			const scriptElement = document.createElement("script");
			scriptElement.src = script || "";
			scriptElement.async = true;
			document.body.appendChild(scriptElement);

			return () => {
				// Cleanup if necessary
				document.body.removeChild(scriptElement);
			};
		}
	}, []);

	const { html } = oembed;
	return (
		<div data-testid="content-oembed" className={styles.root}>
			{html && <ClientOembed html={html} />}
			{/* {script && <Script src={script} strategy="lazyOnload" />} */}
		</div>
	);
};
