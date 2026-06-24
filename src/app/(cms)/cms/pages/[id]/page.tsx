import styles from "../../../../page.module.scss";
import { redirect } from "next/navigation";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getPage } from "@/actions/cms/page";
import { PageCMSForm } from "@/components/cms/forms/page/page-form";
import { PageTitle } from "@/components/ui/typography/title/page-title";
import { MdArticle } from "react-icons/md";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	await initCMSPage();

	const { id } = await params;

	const page = await getPage({
		_id: id,
	});

	if (!page?._id) {
		redirect("/cms/pages");
	}

	const { _id: pageId, route } = page;

	return (
		<section className={styles.root}>
			<PageTitle title={`Page: ${route}`} variant="cms" Icon={MdArticle} />
			<PageCMSForm page={page} />
		</section>
	);
}
