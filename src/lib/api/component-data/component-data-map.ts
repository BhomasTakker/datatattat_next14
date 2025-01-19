import { ComponentDataOptions } from "./component-data-options";
import { metaFetch } from "./custom-meta/meta-fetch";
import { rssFetch } from "./rss/rss-fetch";

const apiReturn = (data: object) => JSON.stringify(data);
const oembedReturn = (data: object) => JSON.stringify(data);

type Components =
	| typeof rssFetch
	| typeof apiReturn
	| typeof oembedReturn
	| typeof metaFetch;

export const ComponentDataMap = new Map<ComponentDataOptions, Components>([
	[ComponentDataOptions.RSS_QUERY, rssFetch],
	// [ComponentDataOptions.API_QUERY, apiReturn],
	// [ComponentDataOptions.OEMBED_QUERY, oembedReturn],
	[ComponentDataOptions.HTML_META_QUERY, metaFetch],
]);
