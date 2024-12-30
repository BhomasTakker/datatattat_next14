"use server";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

// Probably get meta data and split/get card data from it
export type MetaData = {
	description?: string | null;
	image?: string | null;
	imageAlt?: string | null;
	locale?: string | null;
	site_name?: string | null;
	title?: string | null;
	type?: string | null;
	url?: string | null;
};

// Move this kind  of junk
// We probably want to store raw meta data?
// Or form all the cdata we have into a single object
const getOGMetaDataFromHTML = async (document: Document): Promise<MetaData> => {
	return Promise.resolve({
		// or use description
		description: document.head
			?.querySelector('meta[property="og:description"]')
			?.getAttribute("content"),
		image: document.head
			?.querySelector('meta[property="og:image"]')
			?.getAttribute("content"),
		imageAlt: document.head
			?.querySelector('meta[property="og:imageAlt"]')
			?.getAttribute("content"),
		locale: document.head
			?.querySelector('meta[property="og:locale"]')
			?.getAttribute("content"),
		site_name: document.head
			?.querySelector('meta[property="og:site_name"]')
			?.getAttribute("content"),
		// or use title
		title: document.head
			?.querySelector('meta[property="og:title"]')
			?.getAttribute("content"),
		type: document.head
			?.querySelector('meta[property="og:type"]')
			?.getAttribute("content"),
		url: document.head
			?.querySelector('meta[property="og:url"]')
			?.getAttribute("content"),
	});
};

// get all meta data from a given url
// Then get whatevr you require off it
export const getMeta = async (src: string) => {
	try {
		const response = await fetch(src);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const result = await response.text();

		const dom = new JSDOM(result);
		const meta = await getOGMetaDataFromHTML(dom.window.document);
		return meta;
	} catch (error) {
		console.warn("Error fetching meta data", error);
		return null;
	}
};
