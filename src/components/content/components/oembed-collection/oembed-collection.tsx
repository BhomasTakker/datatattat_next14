"use client";

import { ComponentProps } from "@/types/component";
import { OEmbed } from "@/types/data-structures/oembed";
import { useEffect } from "react";
import { ClientOembed } from "../content-oembed/client-component";
import { OembedCollectionVariants, VariantsMap } from "./variant-map";

export type OEmbedCollectionProps = {
	collection: OEmbed[];
	script?: string;
};

type OembedComponentProps = {
	variant: OembedCollectionVariants;
};

export const OembedCollection = ({ component, dataObject }: ComponentProps) => {
	const { componentProps } = component;
	const { collection, script } = dataObject.data as OEmbedCollectionProps;

	// could be an oembed hook
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

	const { variant, ...rest } =
		componentProps as unknown as OembedComponentProps;

	const variantObject = VariantsMap.get(variant);

	if (!variantObject) {
		return null;
	}

	const { renderMethod, styles } = variantObject;

	return (
		<div className={styles.root} data-testid={variant}>
			{renderMethod(collection, rest)}
		</div>
	);
};
