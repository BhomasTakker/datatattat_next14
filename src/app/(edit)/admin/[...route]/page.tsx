import { getServerSession } from "next-auth";
import styles from "../../../page.module.scss";
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
	const { role } = await getUserById(sessionUser.user_id);

	// need select from multiple levels of admin?
	const adminLevel = PATHS.home();

	const { route } = await params;
	const joined = route.join("/");

	// Get/Check level(s) of access
	if (role !== "admin") {
		return <div>Unauthorized</div>;
	}

	return (
		<div className={styles.page}>
			<EditPage route={`/${joined}`} title="Admin Edit" isAdminEdit={true} />
		</div>
	);
}
