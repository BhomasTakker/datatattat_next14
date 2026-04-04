import { getPage } from "@/actions/page/page-actions";
import styles from "../../../page.module.scss";
import { IPage } from "@/types/page";
import { PageDisplay } from "@/components/page/page-display";
import { generateMetaDataFromPage } from "@/lib/metadata/generate-metadata";
import { initialiseServices } from "@/lib/services/intialise-services";

// Would ge the same provider data and create based upon that
export const generateMetadata = async () => await generateMetaDataFromPage("/");

// We need a revalidate strategy for everything
// currently we are 15 minutes on news updates
// and main searches
// We should go 15 as our smallest updates for the time being
// We can and should go lower in future and for breaking news pages etc
export const revalidate = 960;

export async function generateStaticParams() {
	// get admin routes from the database
	return [];
}

type Params = Promise<{ provider_id: string }>;
type Props = {
	params: Params;
};

export default async function Provider({ params }: Props) {
	await initialiseServices();
	const page = (await getPage("/")) as IPage;
	const providerId = (await params).provider_id;

	if (!page) {
		// omg do something
		return <h1>404</h1>;
	}

	return (
		<div className={styles.page}>
			<div>Provider Display:- {providerId}</div>
			<PageDisplay page={page} />
		</div>
	);
}
