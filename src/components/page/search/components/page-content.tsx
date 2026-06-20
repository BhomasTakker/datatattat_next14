"use client";

import { useEffect, useState } from "react";
import { searchArticles } from "@/actions/data/search-articles";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { SimpleSearchForm } from "../forms/simple-search-form";
import { ArticleList } from "./article-list";
import { updateUrlState } from "@/utils/url";
import { useRouter } from "next/navigation";

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

	// make a hook
	const router = useRouter();
	useEffect(() => {
		// Handler for browser back/forward
		const handlePopState = (event: any) => {
			console.log("Back/Forward navigation detected", event);
			window.location.reload();
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [router]);

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const formData = new FormData(event.currentTarget);
		const query = (formData.get("q") as string).trim();

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
			<SimpleSearchForm onSubmit={handleSubmit} isLoading={isLoading} />
		</>
	);
};
