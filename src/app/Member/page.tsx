import { getServerSession } from "next-auth";
import { DefaultSession, options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/routing/paths";

export default async function Member() {
	const session = await getServerSession(options);

	if (!session) {
		redirect(signIn("/Member"));
	}

	const { user } = session as DefaultSession;

	console.log({ session, user });

	return (
		<div>
			<h1>Member page</h1>
			<p>{user?.email}</p>
			<p>{user?.role}</p>
		</div>
	);
}
