import styles from "../../page.module.scss";
import { redirect } from "next/navigation";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { getSource } from "@/actions/cms/source";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { ArticleSourceCMSForm } from "@/components/cms/forms/article-source/article-source";
import { getProvider } from "@/actions/cms/provider";
import { ArticleProviderCMSForm } from "@/components/cms/forms/article-provider/article-provider-form";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	await initCMSPage();

	const { id } = await params;

	const source = await getSource({
		id: id,
	});

	if (!source?._id) {
		redirect("/cms/articles/source");
	}

	const { name, src } = source;

	const provider = await getProvider({
		name,
	});

	return (
		<section className={styles.root}>
			<CMSTitle title={`Article Source: ${name}`} description={src} />
			{provider && (
				<ArticleProviderCMSForm
					provider={provider}
					disabled={true}
					useNavigate={true}
				/>
			)}
			<ArticleSourceCMSForm source={source} />
		</section>
	);
}
