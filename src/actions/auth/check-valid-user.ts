import { getUserById } from "@/lib/mongo/actions/user/user";
import isValidSession from "./check-session";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { initialiseServices } from "@/lib/services/intialise-services";

export async function isValidUser() {
	const session = await isValidSession();

	const { user: sessionUser } = session;
	const { user_id } = sessionUser;

	await initialiseServices();

	const user = await getUserById(user_id);

	if (!user) {
		redirect(PATHS.home());
	}

	return user;
}
