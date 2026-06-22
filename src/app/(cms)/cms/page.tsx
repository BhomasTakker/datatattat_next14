import { initCMSPage } from "@/actions/cms/init-cms-page";
import { PageTitle } from "@/components/ui/typography/title/page-title";
import { MdArticle } from "react-icons/md";

export default async function Page() {
	const { username } = await initCMSPage();

	if (!username) {
		console.error("User is not valid or username is missing.");
		return null;
	}

	return (
		<div>
			<PageTitle title="CMS" variant="cms" Icon={MdArticle} />
		</div>
	);
}
