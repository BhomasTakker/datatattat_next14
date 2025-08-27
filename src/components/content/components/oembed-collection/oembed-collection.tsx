"use client";

// We need to keep a collection of correct uris...
// BlueSky Feed - at://did:plc:5kibbwi53pd7kzwqnfesekny/app.bsky.feed.generator/aaaltgwr5a6vs
// thread at://did:plc:shxqhlplcrwpegumqqltpvzz/app.bsky.feed.post/3lwpibwqspz2l
// author id - did:plc:shxqhlplcrwpegumqqltpvzz
//////////////////////////////////////////////////////
import { ComponentProps } from "@/types/component";
import { OEmbed } from "@/types/data-structures/oembed";
import { useEffect } from "react";
import { VariantsMap } from "./variant-map";

export type OEmbedCollectionProps = {
	items: OEmbed[];
	script?: string;
};

// We should/could have bluesky api come through this?
// It looks like it would be very easy to integrate
// then we can get rid of the bluesky specific code
export const OembedCollection = ({ component, dataObject }: ComponentProps) => {
	const { componentProps } = component;
	const { items = [], script = "" } =
		(dataObject?.data as OEmbedCollectionProps) || {};

	useEffect(() => {
		if (script) {
			let scriptElement = null;
			try {
				scriptElement = document.createElement("script");
				scriptElement.src = script || "";
				scriptElement.async = true;
				scriptElement.onload = () => {
					// console.log("Oembed script loaded successfully.");
				};
			} catch (error) {
				console.error("Error creating script element:", error);
			}
			if (scriptElement) {
				document.body.appendChild(scriptElement);

				return () => {
					document.body.removeChild(scriptElement);
				};
			}
		}
	}, []);

	const { variantType, ...rest } = componentProps || {};

	const variantObject = VariantsMap.get(variantType);

	if (!variantObject) {
		return null;
	}

	const { renderMethod, styles } = variantObject;

	return (
		<div className={styles.root} data-testid={variantType}>
			{renderMethod(items, rest)}
		</div>
	);
};
