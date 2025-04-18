// https://www.w3schools.com/XML/xml_rss.asp

import { UnknownObject } from "@/types/utils";

export type RSSEnclosure = {
	type: string;
	length: string;
	url: string;
};

export type RSSImage = {
	url: string;
	title: string;
	link: string;
};

export type RSSSource = {
	url: string;
};

export type RSSItem = {
	title: string;
	description: string;
	["content:encoded"]?: string;
	author?: string;
	category?: string;
	content?: string;
	contentSnippet?: string;
	creator?: string;
	guid?: string;
	isoDate?: string;
	link?: string;
	pubDate?: string;
	source?: string;
	comments?: [];
	image?: RSSImage;
	enclosure?: RSSEnclosure;

	categories?: string[];
};

export type RSSChannelType = {
	generator?: string;
	webMaster?: string;
	title: string;
	cloud?: string;
	copyright?: string;
	description: string;
	docs?: string;
	feedUrl?: string;
	language?: string;
	lastBuildDate?: string;
	link: string;
	managingEditor?: string;
	paginationLinks?: string;
	pubDate?: string;
	rating?: string;
	image?: RSSImage;
	skipDays?: string;
	skipHours?: string;
	textInput?: string;
	ttl?: string;

	items?: RSSItem[];
};

// why and why feed feedUrl
export type DataResponse = {
	items: RSSItem[];
	link?: string;
	title?: string;
	feed?: string;
	description?: string;
	lastBuildDate?: string;
	language?: string;
	webMaster?: string;
	pubDate?: string;
	generator?: string;
	image?: RSSImage;
	ttl?: string;
} & UnknownObject;
