import { getServerSession } from "next-auth";
import styles from "../../../../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";
import { getUserById } from "@/lib/mongo/actions/user";
import { Session } from "@/types/auth/session";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { PATHS } from "@/lib/routing/paths";

export const dynamic = "force-dynamic";

type PageProps = {
	params: Promise<{ route: string[] }>;
};

export default async function Page({ params }: PageProps) {
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;
	const { username } = await getUserById(sessionUser.user_id);

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
