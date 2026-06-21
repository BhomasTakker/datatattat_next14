import { initialiseServices } from "@/lib/services/intialise-services";
import pageStyles from "../page.module.scss";
import { SearchPage } from "@/components/page/search/search-page";
import { GetLatestArticlesProps } from "@/lib/mongo/actions/articles/search";

type Params =
	| Promise<GetLatestArticlesProps>
	| GetLatestArticlesProps
	| undefined;
type Props = {
	searchParams: Params;
};

// Add meta so we can provide links on social media - lol

export default async function Page({ searchParams }: Props) {
	await initialiseServices();
	// We need to convert searchparams
	// contains etc must be converted to an array of strings, and any empty values removed
	const searchQueryProps = await searchParams;

	console.log("searchQueryProps", searchQueryProps);

	return (
		<div className={pageStyles.page}>
			<SearchPage {...searchQueryProps} />
		</div>
	);
}
