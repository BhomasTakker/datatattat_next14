// https://nextjs.org/docs/pages/building-your-application/routing/api-routes

import { NEWS_ARTICLES_COLLECTION } from "@/lib/cron/articles/sources";
import { fetchCollections } from "@/lib/cron/collections/fetch-collections";
import { connectToMongoDB } from "@/lib/mongo/db";

await connectToMongoDB();

export async function GET() {
	try {
		const res = await fetchCollections(NEWS_ARTICLES_COLLECTION);
		return Response.json({ message: "Data loaded just swell!" });
	} catch (err) {
		console.error(err);
		return Response.json({ message: err });
	}
}
