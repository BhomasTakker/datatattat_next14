import styles from "../../../page.module.scss";
import { getUserByUsername } from "@/lib/mongo/actions/user";
import { ProfilePage } from "@/components/profile/profile-page";
import { ProfileEditPage } from "@/components/profile/profile-edit-page";
import { getUser } from "@/actions/user/get-user";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";

export default async function UserProfile({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;

	const sessionUser = await getUser();
	const profileUser = await getUserByUsername(username);

	if (sessionUser) {
		if (sessionUser._id.toString() === profileUser._id.toString()) {
			return (
				<div className={styles.page}>
					<ProfileEditPage />
				</div>
			);
		}
	}

	if (!profileUser) {
		// log and redirect
		redirect(PATHS.home());
	}

	return (
		<div className={styles.page}>
			<ProfilePage
				user={{ username: profileUser.username, avatar: profileUser.avatar }}
			/>
		</div>
	);
}
