import styles from "../../../page.module.scss";
import { generateMetaDataFromPage } from "@/lib/metadata/generate-metadata";
import { initialiseServices } from "@/lib/services/intialise-services";
import { getArticleProviderById } from "@/lib/mongo/actions/article-provider";
import { ProviderPage } from "@/components/page/provider/provider-page";

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
	const providerId = (await params).provider_id;

	const providerData = await getArticleProviderById(providerId);

	if (!providerData) {
		return <h1>404</h1>;
	}

	// get within the ProviderPage

	return (
		<div className={styles.page}>
			<ProviderPage providerId={providerId} />
		</div>
	);
}
