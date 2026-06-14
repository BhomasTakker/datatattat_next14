import styles from "../../../../page.module.scss";
import { redirect } from "next/navigation";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getPage } from "@/actions/cms/page";
import { PageCMSForm } from "@/components/cms/forms/page/page-form";

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
			<CMSTitle title={`Page: ${route}`} />
			<PageCMSForm page={page} />
		</section>
	);
}
