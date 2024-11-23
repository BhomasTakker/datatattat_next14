// https://www.npmjs.com/package/rss-parser
import Parser from "rss-parser";

/** Fetch RSS data from src via rss-parser */
export const fetchRSS = async (endpoint: string) => {
	const parser = new Parser({
		// Todo:- Config
		timeout: 1000,
	});
	return await parser.parseURL(endpoint.toString());
};
