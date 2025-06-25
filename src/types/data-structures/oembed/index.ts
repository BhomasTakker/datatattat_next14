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
