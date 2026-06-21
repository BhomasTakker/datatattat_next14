"use client";

import { useState } from "react";
import { searchArticles } from "@/actions/data/search-articles";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { SearchForm } from "../forms/search-form";
import { ArticleList } from "./article-list";
import { updateUrlState } from "@/utils/url";
import { FieldValues } from "react-hook-form";
import { ToggleButton } from "@/components/ui/toggle-button/toggle-button";
import { trimObjectValues } from "@/utils/object";
import { usePopState } from "@/hooks/usePopState";
import styles from "./page-content.module.scss";

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

	usePopState({
		handlePopState: () => {
			window.location.reload();
		},
	});

	const handleSubmit = async (data: FieldValues) => {
		if (isLoading) return;
		setIsLoading(true);

		// this isn't great - works but? - at least use a config value?
		// This is the object saved in the form state - we need to get the params from it
		const params = data.articlesSearchApi?.params as
			| Record<string, string>
			| undefined;

		const trimmedParams = trimObjectValues(params || {}) as Record<
			string,
			string
		>;

		if (!trimmedParams || Object.keys(trimmedParams).length === 0) {
			setIsEmpty(true);
			setArticles([]);
			updateUrlState("/search");
			setIsLoading(false);
			return;
		}

		const response = await searchArticles(trimmedParams);

		setIsEmpty(false);
		setArticles(response.items);
		updateUrlState(`/search?${new URLSearchParams(trimmedParams).toString()}`);
		setIsLoading(false);
	};

	return (
		<div className={styles.content}>
			{isEmpty && <p>Please enter a search query.</p>}

			{/* We will add advanced search later */}
			{/* <ToggleButton
				value={isAdvanced}
				onChange={() => setIsAdvanced((v) => !v)}
				labelOn="Advanced Search"
				labelOff="Simple Search"
				id="search-toggle"
			/> */}
			<section className={styles.searchForm}>
				{/* We want here or above a way to search for video and eventually podcasts/audio displaying the appropriate component */}
				{/* i.e. this would be Article Search form */}
				<SearchForm
					onSubmit={handleSubmit}
					isLoading={isLoading}
					isAdvanced={isAdvanced}
				/>
			</section>
			<section className={styles.articles}>
				{!isEmpty && articles.length > 0 && <ArticleList articles={articles} />}
			</section>
		</div>
	);
};
