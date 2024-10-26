"use client";

import { PATHS } from "@/lib/routing/paths";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function CLientMember() {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect(PATHS.signIn("/ClientMember"));
		},
	});
	return (
		<div>
			<h1>Client Member</h1>
			<p>{session?.user?.name}</p>
		</div>
	);
}
