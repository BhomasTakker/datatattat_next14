"use client";

import { useCallback, useState } from "react";
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
import {
	ARTICLES_SEARCH_API_CONFIG,
	SIMPLE_SEARCH_API_CONFIG,
} from "@/components/edit/config/query/api/apis/articles-search/articles-search-api";
import { OptionsForm } from "../forms/options-form";

type SearchPageContentProps = {
	isQueryEmpty: boolean;
	articles: CollectionItem[];
};

const getConfig = (isAdvanced: boolean) => {
	console.log("getConfig called with isAdvanced:", isAdvanced);
	return isAdvanced ? ARTICLES_SEARCH_API_CONFIG : SIMPLE_SEARCH_API_CONFIG;
};

export const SearchPageContent = ({
	isQueryEmpty,
	articles: initialArticles,
}: SearchPageContentProps) => {
	const [articles, setArticles] = useState(initialArticles);
	const [isEmpty, setIsEmpty] = useState(isQueryEmpty);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdvanced, setIsAdvanced] = useState(false);
	const [variant, setVariant] = useState<"article" | "video">("article");

	usePopState({
		handlePopState: () => {
			window.location.reload();
		},
	});

	// currently on variant and isAdvanced change we empty the results.
	// It would be better if we only updated results on search
	const optionsUpdatedHandler = (data: FieldValues) => {
		const isAdvancedOption = data.optionsForm.isAdvanced as boolean;
		setIsAdvanced(isAdvancedOption);
		setArticles([]);
	};

	const onVariantChange = useCallback((newVariant: "article" | "video") => {
		console.log("Variant changed to:", newVariant);
		setVariant(newVariant);
		setArticles([]);
	}, []);

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
			<OptionsForm onSubmit={optionsUpdatedHandler} />

			<section className={styles.searchForm}>
				<SearchForm
					onSubmit={handleSubmit}
					onChange={onVariantChange}
					isLoading={isLoading}
					isAdvanced={isAdvanced}
					config={getConfig(isAdvanced)}
				/>
			</section>
			{isEmpty && <p>Please enter a search query.</p>}
			<section className={styles.articles}>
				{!isEmpty && articles.length > 0 && (
					<ArticleList articles={articles} articleVariant={variant} />
				)}
			</section>
		</div>
	);
};
