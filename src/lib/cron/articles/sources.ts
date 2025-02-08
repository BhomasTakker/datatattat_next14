export const WORLD_MAIN = [
	"https://feeds.bbci.co.uk/news/world/rss.xml",
	"https://feeds.skynews.com/feeds/rss/world.xml",
	"https://www.aljazeera.com/xml/rss/all.xml",
	"https://www.theguardian.com/world/rss",
	"https://rss.dw.com/rdf/rss-en-world",
];

export const UK_MAIN = [
	"https://feeds.bbci.co.uk/news/uk/rss.xml",
	"https://feeds.skynews.com/feeds/rss/uk.xml",
	"https://www.theguardian.com/uk/rss",
	"https://www.independent.co.uk/news/uk/rss",
	"https://www.mirror.co.uk/?service=rss",
];

export const US_MAIN = [
	"https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml",
	"https://feeds.skynews.com/feeds/rss/us.xml",
	"https://www.theguardian.com/us-news/rss",
	"https://truthout.org/latest/feed/",
	"https://theconversation.com/us/articles.atom",
];

export const NEWS_ARTICLES_COLLECTION = [...WORLD_MAIN, ...UK_MAIN, ...US_MAIN];
