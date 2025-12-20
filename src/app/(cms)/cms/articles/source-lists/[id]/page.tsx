import styles from "../../page.module.scss";
import { redirect } from "next/navigation";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getSourceList } from "@/actions/cms/source-list";
import { ArticleSourceListCMSForm } from "@/components/cms/forms/article-source-list/article-source-list";
import { gotoSource } from "@/actions/cms/source";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	await initCMSPage();

	const { id } = await params;

	const sourceList = await getSourceList({
		id: id,
		// incorrectly placed on form data at the minute
		populate: true,
	});

	if (!sourceList?._id) {
		redirect("/cms/articles/source-lists");
	}

	const { title, variant, sources } = sourceList;
	const paginatedSources = {
		data: sources || [],
		pagination: {
			total: sources ? sources.length : 0,
			page: 1,
			pages: 1,
			limit: 100,
		},
	};

	// We need to send only the _ids to the form
	const formattedSourceList = {
		...sourceList,
		sources: sources?.map((source) => source._id) || [],
	};

	return (
		<section className={styles.root}>
			<CMSTitle title={`Article Source List: ${title}`} description={variant} />
			{sources && (
				<PaginatedTable
					columns={["name", "url", "title", "variant"]}
					paginatedData={paginatedSources}
					onSelect={gotoSource}
				/>
			)}
			{/* @ts-expect-error Incorrect type - issue noted in component */}
			<ArticleSourceListCMSForm list={formattedSourceList} />
		</section>
	);
}
