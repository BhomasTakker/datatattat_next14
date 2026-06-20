"use client";

import { useEffect, useState } from "react";
import { searchArticles } from "@/actions/data/search-articles";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { SearchForm } from "../forms/search-form";
import { ArticleList } from "./article-list";
import { updateUrlState } from "@/utils/url";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";

type SearchPageContentProps = {
	isQueryEmpty: boolean;
	articles: CollectionItem[];
};

export const SearchPageContent = ({
	isQueryEmpty,
	articles: initialArticles,
}: SearchPageContentProps) => {
	const [articles, setArticles] = useState(initialArticles);
	const [isEmpty, setIsEmpty] = useState(isQueryEmpty);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdvanced, setIsAdvanced] = useState(false);

	// is it worth making a hook?
	const router = useRouter();
	useEffect(() => {
		// Handler for browser back/forward
		const handlePopState = () => {
			window.location.reload();
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [router]);

	const handleSubmit = async (data: FieldValues) => {
		if (isLoading) return;
		setIsLoading(true);
		const query = (data.q as string).trim();

		if (!query) {
			setIsEmpty(true);
			setArticles([]);
			updateUrlState("/search");
			setIsLoading(false);
			return;
		}

		const response = await searchArticles({ mustContain: [query] });
		setIsEmpty(false);
		setArticles(response.items);
		updateUrlState(`/search?q=${encodeURIComponent(query)}`);
		setIsLoading(false);
	};

	return (
		<>
			{isEmpty && <p>Please enter a search query.</p>}
			{!isEmpty && articles.length > 0 && <ArticleList articles={articles} />}
			<SearchForm
				onSubmit={handleSubmit}
				isLoading={isLoading}
				isAdvanced={isAdvanced}
			/>
		</>
	);
};
