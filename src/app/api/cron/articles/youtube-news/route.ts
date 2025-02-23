import { fetchCollections } from "@/lib/api/component-data/rss/collections/fetch-collections";
import { connectToMongoDB } from "@/lib/mongo/db";
import { UK_VIDEO } from "../../../../../../sources/news/videos/uk";
import { US_VIDEO } from "../../../../../../sources/news/videos/us";
import { WORLD_VIDEO } from "../../../../../../sources/news/videos/world";
import { getYoutubeCollection } from "@/lib/api/component-data/rss/collections/get-collection";
import { fetchYoutubeArticles } from "@/lib/api/component-data/rss/collections/articles/fetch-youtube-articles";

export const revalidate = 60;

export async function GET() {
	// figure this issue out
	await connectToMongoDB();

	console.log("fetching youtube news");

	const fetchMainNewsCollectionsFn = fetchCollections({
		sources: [UK_VIDEO, US_VIDEO, WORLD_VIDEO],
		feedCallback: getYoutubeCollection,
		itemsCallback: fetchYoutubeArticles,
		customFields: {
			// item: [["media:group", "media", { keepArray: false }]],
			item: ["media:group"],
		},
	});

	await fetchMainNewsCollectionsFn();

	return Response.json({ message: "fetched youtube news" });
}
