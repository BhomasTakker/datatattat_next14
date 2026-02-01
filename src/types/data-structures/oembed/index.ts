import { OembedOptions } from "@/lib/api/component-data/oembed/oembed-options";

export type OEmbedParams = {
	variant: OembedOptions;
};

// Thought we could do a descriminating type?
export type TwitterOEmbedParams = {
	variant: OembedOptions.twitter;
	account: string;
	tweetId: string;
} & OEmbedParams;

// assuming one type here
export type RedditOEmbedParams = {
	variant: OembedOptions.reddit;
	url: string;
} & OEmbedParams;

export type BlueskyOEmbedParams = {
	variant: OembedOptions.bluesky;
	account: string;
	postId: string;
} & OEmbedParams;

export type TikTokOEmbedParams = {
	variant: OembedOptions.tiktok;
	account: string;
	videoId: string;
} & OEmbedParams;

export type SpotifyOEmbedParams = {
	variant: OembedOptions.spotify;
	asset: string;
	contentId: string;
} & OEmbedParams;

export type GenericOEmbedParams = TwitterOEmbedParams;

export type OEmbed = {
	id: string;
	title: string;
	type: string;
	version: string;
	provider_name: string;
	provider_url: string;
	author_name?: string;
	author_url?: string;
	cache_age?: number;
	thumbnail_url?: string;
	thumbnail_width?: number;
	thumbnail_height?: number;
	html: string;
	width?: number;
	height?: number;
	[customProperty: string]: any; // Allow additional properties
};
