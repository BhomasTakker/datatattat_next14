import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { getUserById } from "@/lib/mongo/actions/user";
import { Session } from "@/types/auth/session";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";

// export const dynamic = "force-dynamic";

export default async function Page() {
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;
	const { username } = await getUserById(sessionUser.user_id);

	const userHome = `${PATHS.user(username)}`;

	redirect(`${PATHS.edit()}${userHome}`);
}
