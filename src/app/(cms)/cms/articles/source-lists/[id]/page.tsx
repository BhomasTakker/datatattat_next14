import styles from "../../page.module.scss";
import { redirect } from "next/navigation";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { getSource } from "@/actions/cms/source";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { ArticleSourceCMSForm } from "@/components/cms/forms/article-source/article-source";
import { getProvider } from "@/actions/cms/provider";
import { ArticleProviderCMSForm } from "@/components/cms/forms/article-provider/article-provider-form";
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

	console.log("Source List:", sourceList);

	if (!sourceList?._id) {
		redirect("/cms/articles/source-lists");
	}

	const { title, variant } = sourceList;

	return (
		<section className={styles.root}>
			<CMSTitle title={`Article Source List: ${title}`} description={variant} />
			{/* {provider && (
        <ArticleProviderCMSForm
          provider={provider}
          disabled={true}
          useNavigate={true}
        />
      )}*/}
			<ArticleSourceListCMSForm list={sourceList} />
		</section>
	);
}
