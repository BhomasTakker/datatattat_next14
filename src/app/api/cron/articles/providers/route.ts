import { updateArticleProviders } from "@/lib/api/component-data/rss/collections/article-providers/update-article-providers";
import { connectToMongoDB } from "@/lib/mongo/db";

export const revalidate = 72000;

export async function GET() {
	try {
		await connectToMongoDB();
		// get data to respond with
		await updateArticleProviders();
		return Response.json({ message: "Updated all article providers." });
	} catch (error) {
		return Response.json({ error: "We had an unspecified error." });
	}
}
