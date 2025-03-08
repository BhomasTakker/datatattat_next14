import ArticleProvider from "@/models/ArticleProvider";
import { Aggregator } from "..";

export const destructProvider = (aggregator: Aggregator) => {
	return [
		...aggregator,
		{
			$lookup: {
				from: ArticleProvider.collection.name,
				localField: "provider",
				foreignField: "_id",
				as: "provider",
			},
		},
		{
			$addFields: {
				provider: { $arrayElemAt: ["$provider", 0] },
			},
		},
	];
};
