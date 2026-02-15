import { ComponentDataOptions } from "@/lib/api/component-data/component-data-options";
import { GenericInput } from "@/types/edit/inputs/inputs";
import { APIOptions, GetAPIConfig } from "./api/api-base-config";
import { HTML_META_QUERY_CONFIG } from "./html/meta-config";
import { RSS_CONFIG } from "./rss/rss-config";

export enum QueryOptions {
	NONE = "none",
	RSS = ComponentDataOptions.RSS,
	SPOTIFY_OEMBED = ComponentDataOptions.SPOTIFY_OEMBED,
	OEMBED_LIST = ComponentDataOptions.OEMBED_LIST,
	API_QUERY = ComponentDataOptions.API_QUERY,
	HTML_META_QUERY = ComponentDataOptions.HTML_META_QUERY,
	MANUAL_VIDEO_SOURCES = ComponentDataOptions.MANUAL_VIDEO_SOURCES,
}

export type queryContainersProps =
	| null
	| typeof RSS_CONFIG
	| typeof HTML_META_QUERY_CONFIG
	| GenericInput;

export type ComponentQueryOptions = {
	rssOptions?: object;
	oembedOptions?: object;
	apiOptions?: GetAPIConfig;
	metaOptions?: object;
};

// All of this needs restructuring into types etc.
// We were having import issues
export const ARTICLE_OPTIONS = [
	// we need to  add this after we determine variant
	QueryOptions.NONE,
	QueryOptions.API_QUERY,
	QueryOptions.HTML_META_QUERY,
	QueryOptions.RSS,
];

export type APIConfigOptions = {
	options: APIOptions[];
	defaultSelection?: APIOptions;
};

export type GetWithConfig = {
	options: QueryOptions[];
	defaultSelection?: QueryOptions;
	apiConfigOptions?: APIConfigOptions;
};
