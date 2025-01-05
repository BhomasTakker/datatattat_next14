import styles from "../../../page.module.scss";
import { getUserByUsername } from "@/lib/mongo/actions/user";
import { ProfilePage } from "@/components/profile/profile-page";
import { ProfileEditPage } from "@/components/profile/profile-edit-page";
import { getUser } from "@/actions/user/get-user";

export default async function UserHome({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;
	const sessionUser = await getUser();

	///////////////////////////////////////////////////////////////////
	// Technically there could be multiple users of the same name...
	// need make sure the user has completed the sign up process
	// i.e. get by username AND completed
	// Then there should only be one
	//////////////////////////////////////////////////
	const profileUser = await getUserByUsername(username);

	if (sessionUser._id.toString() === profileUser._id.toString()) {
		return (
			<div className={styles.page}>
				<ProfileEditPage />
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<ProfilePage />
		</div>
	);
}
