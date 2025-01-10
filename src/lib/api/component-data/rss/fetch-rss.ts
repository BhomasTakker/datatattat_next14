// https://www.npmjs.com/package/rss-parser
import Parser from "rss-parser";

// We are crashing when load times out
/** Fetch RSS data from src via rss-parser */
export const fetchRSS = async (endpoint: string) => {
	const parser = new Parser({
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
