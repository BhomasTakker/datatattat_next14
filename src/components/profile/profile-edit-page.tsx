import { CompleteSignup } from "./complete-signup/complete-signup";
import { UserProfile } from "./user-profile";
import { isValidUser } from "@/actions/auth/check-valid-user";

export const ProfileEditPage = async () => {
	// redirects if no user
	const user = await isValidUser();

	const { signup_completed, username } = user;

	if (!signup_completed) {
		return <CompleteSignup username={username} />;
	}

	return (
		<div>
			<UserProfile user={user} />
		</div>
	);
};
