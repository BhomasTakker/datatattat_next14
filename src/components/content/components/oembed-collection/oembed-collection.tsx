"use client";

import { ComponentProps } from "@/types/component";
import { OEmbed } from "@/types/data-structures/oembed";
import { useEffect } from "react";
import { OembedCollectionVariants, VariantsMap } from "./variant-map";

export type OEmbedCollectionProps = {
	collection: OEmbed[];
	script?: string;
};

type OembedComponentProps = {
	variantType: OembedCollectionVariants;
};

// We should/could have bluesky api come through this?
// It looks like it would be very easy to integrate
// then we can get rid of the bluesky specific code
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

	const { variantType, ...rest } =
		componentProps as unknown as OembedComponentProps;

	const variantObject = VariantsMap.get(variantType);

	if (!variantObject) {
		return null;
	}

	const { renderMethod, styles } = variantObject;

	return (
		<div className={styles.root} data-testid={variantType}>
			{renderMethod(collection, rest)}
		</div>
	);
};
