"use server";

//////////////////////////////////////////
// We had a major issue here with jsdom
// when jsdom encounters an error i scss say
// it logs that error - so for the Guardian
// pretty sure it's itentional...
// there is an error in the stylesheet for every url you load
// This would all log causing slowdowns...
// the fix is essentially to override
// the default error handling of jsdom
// by loading the virtual dom - adding an error listener
// and no-opping it
/////////////////////////////////////////////////
// probably want to move this to a utils folder
// Call get dom
// or create a dom class etc and get meta from it
// Ultimately, call a conversion to take specific data from html
// this is all a scraper is doing
/////////////////////////////////////////////////
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
	// No-op to skip console errors.
});
/////////////////////////////////////////////////

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

		const dom = new JSDOM(result, { virtualConsole });
		const meta = await getOGMetaDataFromHTML(dom.window.document);
		return meta;
	} catch (error) {
		console.warn("Error fetching meta data", error);
		return null;
	}
};
