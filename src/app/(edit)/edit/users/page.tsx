import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserById } from "@/lib/mongo/actions/user";
import { PATHS } from "@/lib/routing/paths";
import { Session } from "@/types/auth/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;
	const { username } = await getUserById(sessionUser.user_id);

	const userHome = `${PATHS.users()}/${username}`;

	redirect(`${PATHS.edit}${userHome}`);
}
