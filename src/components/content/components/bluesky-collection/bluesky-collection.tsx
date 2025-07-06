import { ComponentProps } from "@/types/component";
import { ContentOembed } from "../content-oembed/content-oembed";
import { blueskyOembedByUri } from "@/lib/api/component-data/oembed/options/bluesky";
import { getOembed } from "@/actions/oembed/get-oembed";
import { PageComponent } from "@/types/page";
import styles from "./bluesky-collection.module.scss";

export type BlueSkyCollectionProps = {
	items: string[];
};

export const BlueSkyOembedComponent = async ({
	uri,
	component,
}: {
	uri: string;
	component: PageComponent;
}) => {
	const { script, createUrl } = blueskyOembedByUri;
	const url = createUrl(uri);

	try {
		const oembed = await getOembed(url);

		return (
			// this component wouldn't be correct
			<div key={uri} data-testid="bluesky-oembed">
				<ContentOembed
					component={component}
					dataObject={{ data: { script, oembed } }}
				></ContentOembed>
			</div>
		);
	} catch (err) {
		console.error("Error fetching oembed for Bluesky URI:", uri, err);
		return null; // Return null if there's an error
	}
};

export const BlueSkyCollection = ({
	component,
	dataObject,
}: ComponentProps) => {
	const data = dataObject.data as BlueSkyCollectionProps;
	const { items = [] } = data || {};

	const oembedComponents = items.map(async (uri: string) => {
		return <BlueSkyOembedComponent uri={uri} component={component} />;
	});
	return (
		<div data-testid="bluesky-collection" className={styles.root}>
			{oembedComponents}
		</div>
	);
};
