import Article from "@/models/Article";
import { GetLatestArticlesProps } from "../search";
import { PipelineStage } from "mongoose";
import { createSearchAggregate } from "./searchAggregate";

// Aggregation course 2 hour
// https://www.youtube.com/watch?v=vx1C8EyTa7Y

export type Aggregator = PipelineStage[];

const createAggregate = (queryParams: GetLatestArticlesProps) => {
	const aggregate: Aggregator = [];

	return createSearchAggregate(queryParams, aggregate);
};

export const buildArticleSearchQuery = async (
	queryParams: GetLatestArticlesProps
) => {
	const res = await Article.aggregate(createAggregate(queryParams));

	return res;
};
