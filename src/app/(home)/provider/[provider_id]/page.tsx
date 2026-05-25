import styles from "../../../page.module.scss";
import { initialiseServices } from "@/lib/services/intialise-services";
import { getArticleProviderByIdOrSlug } from "@/lib/mongo/actions/article-provider";
import { ProviderPage } from "@/components/page/provider/provider-page";
import type { Metadata } from "next";

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	await initialiseServices();

	const awaitedParams = await params;

	const providerId = awaitedParams.provider_id;
	const providerData = await getArticleProviderByIdOrSlug(providerId);

	if (!providerData) return {};

	const { name, description, url, logo } = providerData;

	return {
		title: name,
		description,
		openGraph: {
			title: `${name} | Datatattat`,
			description,
			url,
			images: [{ url: logo || "/assets/logo-hero.png", alt: name }],
		},
	};
};

// We need a revalidate strategy for everything
// currently we are 15 minutes on news updates
// and main searches
// We should go 15 as our smallest updates for the time being
// We can and should go lower in future and for breaking news pages etc
export const revalidate = 960;

type Params = Promise<{ provider_id: string }>;
type Props = {
	params: Params;
};

export default async function Provider({ params }: Props) {
	await initialiseServices();
	const providerId = (await params).provider_id;

	const providerData = await getArticleProviderByIdOrSlug(providerId);

	if (!providerData) {
		return <h1>404</h1>;
	}

	return (
		<div className={styles.page}>
			<ProviderPage providerData={providerData} />
		</div>
	);
}
