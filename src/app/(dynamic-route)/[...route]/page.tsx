import { getPage } from "@/actions/page/page-actions";
import { IPage } from "@/types/page";
import { PageDisplay } from "@/components/page/page-display";
import styles from "../../page.module.scss";
import { generateMetaDataFromPage } from "@/lib/metadata/generate-metadata";

type Params = Promise<{ route: string[] }>;
type Props = {
	params: Params;
};

export const revalidate = 600;

export const generateMetadata = async ({ params }: Props) => {
	const { route } = await params;
	const joined = route.join("/");

	const metadata = await generateMetaDataFromPage(`/${joined}`);
	return metadata;
};

export default async function Page({ params }: Props) {
	const { route } = await params;
	const joined = route.join("/");

	const page = (await getPage(`/${joined}`)) as IPage;

	if (!page) {
		// omg do something
		return <h1>404</h1>;
	}

	return (
		<div className={styles.page}>
			<PageDisplay page={page} />
		</div>
	);
}
