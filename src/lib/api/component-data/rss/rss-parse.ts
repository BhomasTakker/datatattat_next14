// https://www.npmjs.com/package/rss-parser
import { UnknownObject } from "@/types/utils";
import Parser from "rss-parser";

// We are crashing when load times out
/** Fetch RSS data from src via rss-parser */
// This should be an action and explicitly use server
export const RSSParse = async (
	endpoint: string,
	customFields?: UnknownObject
) => {
	const parser = new Parser({
		customFields,
		// Todo:- Config
		timeout: 2000,
	});
	// if error do something!
	try {
		return await parser.parseURL(endpoint.toString());
	} catch (error) {
		console.error("Error fetching rss");
		return null;
	}
};
