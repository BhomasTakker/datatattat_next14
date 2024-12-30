import { getServerSession } from "next-auth";
import styles from "../../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";
import { options } from "../../api/auth/[...nextauth]/options";
import { getUserById } from "@/lib/mongo/actions/user";
import { Session } from "@/types/auth/session";

export const dynamic = "force-dynamic";

export default async function Page({
	searchParams,
}: {
	searchParams?: { route: string };
}) {
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;
	const { username } = await getUserById(sessionUser.user_id);

	const userHome = `/users/${username}`;

	const { route = userHome } = searchParams || {};

	if (!route.startsWith(userHome)) {
		return <div>Unauthorized</div>;
	}

	return (
		<div className={styles.page}>
			<EditPage route={route} title="Edit" />
		</div>
	);
}
