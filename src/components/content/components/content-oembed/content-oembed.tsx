import { ComponentProps } from "@/types/component";
import styles from "./content-oembed.module.scss";
import Script from "next/script";
import { getOembed } from "@/actions/oembed/get-oembed";
import { ClientOembed } from "./client-component";

export const ContentOembed = async ({
	component,
	dataObject,
}: ComponentProps) => {
	// Ultimately check if user has - i.e. Twitter disabled
	// get object from id
	// call fetch oembed / with params
	// if there is a script load it
	// load the Oembed object
	// Pass in params?
	const oembedData = await getOembed("");

	return (
		<div className={styles.root}>
			<Script
				src="https://platform.twitter.com/widgets.js"
				strategy="lazyOnload"
			/>
			{oembedData && <ClientOembed oembedData={oembedData} />}
		</div>
	);
};
