import styles from "../../page.module.scss";
import { redirect } from "next/navigation";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getSourceList } from "@/actions/cms/source-list";
import { ArticleSourceListCMSForm } from "@/components/cms/forms/article-source-list/article-source-list";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	await initCMSPage();

	const { id } = await params;

	const sourceList = await getSourceList({
		id: id,
	});

	if (!sourceList?._id) {
		redirect("/cms/articles/source-lists");
	}

	const { title, variant } = sourceList;

	return (
		<section className={styles.root}>
			<CMSTitle title={`Article Source List: ${title}`} description={variant} />
			<ArticleSourceListCMSForm list={sourceList} />
		</section>
	);
}
