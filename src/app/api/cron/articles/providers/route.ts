import { updateArticleProviders } from "@/lib/api/component-data/rss/collections/article-providers/update-article-providers";
import { connectToMongoDB } from "@/lib/mongo/db";

export const revalidate = 72_000;

export async function GET(request: Request, response: Response) {
	try {
		await connectToMongoDB();
		// get data to respond with
		await updateArticleProviders();
		return Response.json({ message: "Updated all article providers." });
	} catch (error) {
		console.log(error);
		return Response.json({ error: "We had an unspecified error." });
	}
}
