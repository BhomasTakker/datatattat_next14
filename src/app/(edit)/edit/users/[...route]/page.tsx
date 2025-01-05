import styles from "../../../../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";
import { PATHS } from "@/lib/routing/paths";
import isValidSession from "@/actions/auth/check-session";
import isSignupComplete from "@/actions/signup/signup-completed";
import { getUser } from "@/actions/user/get-user";

export const dynamic = "force-dynamic";

type PageProps = {
	params: Promise<{ route: string[] }>;
};

export default async function Page({ params }: PageProps) {
	await isValidSession();
	await isSignupComplete();

	const { username } = await getUser();

	const { route } = await params;

	const joined = route.join("/");

	if (!joined.startsWith(username)) {
		return <div>Unauthorized</div>;
	}

	return (
		<div className={styles.page}>
			<EditPage route={`${PATHS.users()}/${joined}`} title="Edit" />
		</div>
	);
}
