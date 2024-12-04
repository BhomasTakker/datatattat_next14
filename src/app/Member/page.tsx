import { getServerSession } from "next-auth";
import { DefaultSession, options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";

// temp page just for showing how to use session
export default async function Member() {
	const session = await getServerSession(options);

	if (!session) {
		redirect(PATHS.signIn("/Member"));
	}

	const { user } = session as DefaultSession;

	return (
		<div>
			<h1>Member page</h1>
			<p>{user?.email}</p>
			{/* <p>{user?.role}</p> */}
		</div>
	);
}
