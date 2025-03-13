import styles from "../../../../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";
import { PATHS } from "@/lib/routing/paths";
import isValidSession from "@/actions/auth/check-session";
import isSignupComplete from "@/actions/signup/signup-completed";
import { isValidUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";

export const dynamic = "force-dynamic";

type PageProps = {
	params: Promise<{ route: string[] }>;
};

export default async function Page({ params }: PageProps) {
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();

	const { username } = await isValidUser();

	const { route } = await params;

	const joined = route.join("/");
	const decodedRoute = decodeURI(joined);

	// We only need the decodedRoute to check against the username
	// We don't need to provide a decoded route to the EditPage component
	if (!decodedRoute.startsWith(username)) {
		return <div>Unauthorized</div>;
	}

	return (
		<div className={styles.page}>
			<EditPage route={`${PATHS.users()}/${joined}`} title="Edit" />
		</div>
	);
}
