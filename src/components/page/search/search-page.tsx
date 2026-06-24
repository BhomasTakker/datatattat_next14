import {
	GetLatestArticlesProps,
	searchArticles,
} from "@/lib/mongo/actions/articles/search";
import styles from "./search-page.module.scss";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { SearchPageContent } from "./components/page-content";
import { toStringArray } from "@/utils/array";
import { PageTitle } from "@/components/ui/typography/title/page-title";
import { MdSearch } from "react-icons/md";

export const SearchPage = async (searchQueryProps: GetLatestArticlesProps) => {
	const isQueryEmpty =
		!searchQueryProps || Object.keys(searchQueryProps).length === 0;

	searchQueryProps = {
		...searchQueryProps,
		filterContain: toStringArray(searchQueryProps?.filterContain),
		orRegion: toStringArray(searchQueryProps?.orRegion),
		excludeRegions: toStringArray(searchQueryProps?.excludeRegions),
		mustContain: toStringArray(searchQueryProps?.mustContain),
		mustNotContain: toStringArray(searchQueryProps?.mustNotContain),
		shouldContain: toStringArray(searchQueryProps?.shouldContain),
	};

	let articles: CollectionItem[] = [];
	if (!isQueryEmpty) {
		const response = await searchArticles(searchQueryProps);
		articles = response.items;
	}

	return (
		<section className={styles.page}>
			{/* We need a title component */}
			<PageTitle title="Search Results" Icon={MdSearch} />
			<SearchPageContent isQueryEmpty={isQueryEmpty} articles={articles} />
		</section>
	);
};
