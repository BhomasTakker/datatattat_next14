import { connectToMongoDB } from "@/lib/mongo/db";
import { UK } from "../../../../../../sources/news/articles/uk";
import { US } from "../../../../../../sources/news/articles/us";
import { WORLD } from "../../../../../../sources/news/articles/world";
import { fetchCollections } from "@/lib/api/component-data/rss/collections/fetch-collections";
import { getCollection } from "@/lib/api/component-data/rss/collections/get-collection";
import { fetchArticles } from "@/lib/api/component-data/rss/collections/articles/fetch-articles";

export const revalidate = 60;

export async function GET() {
	// figure this issue out
	await connectToMongoDB();

	console.log("fetching news");

	const fetchMainNewsCollectionsFn = fetchCollections({
		sources: [UK, US, WORLD],
		feedCallback: getCollection,
		itemsCallback: fetchArticles,
	});

	await fetchMainNewsCollectionsFn();

	return Response.json({ message: "fetched news" });
}
