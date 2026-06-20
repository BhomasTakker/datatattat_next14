import pageStyles from "../page.module.scss";
import { SearchPage } from "@/components/page/search/search-page";

export default async function Page() {
	return (
		<div className={pageStyles.page}>
			<SearchPage />
		</div>
	);
}
