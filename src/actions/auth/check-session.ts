import { options } from "@/app/api/auth/[...nextauth]/options";
import { PATHS } from "@/lib/routing/paths";
import { Session } from "@/types/auth/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function isValidSession() {
	const session = (await getServerSession(options)) as Session;
	if (!session) {
		redirect(PATHS.home());
	}
}
