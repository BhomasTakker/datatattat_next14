import { searchArticles } from "@/lib/mongo/actions/articles/search";
import styles from "./search-page.module.scss";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { SearchPageContent } from "./components/page-content";

export const SearchPage = async ({ q }: SearchParameters) => {
	const isQueryEmpty = !q || q.trim() === "";

	// I guess a simple search query will jut take a q and some basics i.e. time, region, etc
	// advanced search will be the full form - mustContain etc
	const query = {
		mustContain: q ? [q] : [],
	};

	let articles: CollectionItem[] = [];
	if (!isQueryEmpty) {
		const response = await searchArticles(query);
		articles = response.items;
	}

	return (
		<section className={styles.page}>
			<h1>Search {q}</h1>
			<SearchPageContent isQueryEmpty={isQueryEmpty} articles={articles} />
		</section>
	);
};
