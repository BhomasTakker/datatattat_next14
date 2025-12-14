import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";

export default async function Page() {
	const { username } = await initCMSPage();

	if (!username) {
		console.error("User is not valid or username is missing.");
		return null;
	}

	return (
		<div>
			<CMSTitle title="CMS" />
		</div>
	);
}
