import { apiFetch } from "./api/api-fetch";
import { ComponentDataOptions } from "./component-data-options";
import { metaFetch } from "./custom-meta/meta-fetch";
import { getManualVideoData } from "./manual/video/manual-video";
import { oembedFetchList } from "./oembed/oembed-fetch-list";
import { fetchRss } from "./rss/fetch-rss";

type Components =
	| typeof fetchRss
	| typeof apiFetch
	| typeof metaFetch
	| typeof getManualVideoData;

export const ComponentDataMap = new Map<ComponentDataOptions, Components>([
	[ComponentDataOptions.RSS, fetchRss],
	[ComponentDataOptions.API_QUERY, apiFetch],
	[ComponentDataOptions.OEMBED_LIST, oembedFetchList],
	[ComponentDataOptions.HTML_META_QUERY, metaFetch],
	[ComponentDataOptions.MANUAL_VIDEO_SOURCES, getManualVideoData], // Assuming manual video sources uses the same fetch as oembed
]);
