import { initialiseServices } from "@/lib/services/intialise-services";
import pageStyles from "../page.module.scss";
import { SearchPage } from "@/components/page/search/search-page";

type Params = Promise<SearchParameters>;
type Props = {
	searchParams: Params;
};

export default async function Page({ searchParams }: Props) {
	await initialiseServices();
	const { q } = await searchParams;

	return (
		<div className={pageStyles.page}>
			<SearchPage q={q} />
		</div>
	);
}
