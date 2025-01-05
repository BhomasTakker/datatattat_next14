import isValidSession from "@/actions/auth/check-session";
import { CompleteSignup } from "./complete-signup/complete-signup";
import { getUser } from "@/actions/user/get-user";

export const ProfileEditPage = async () => {
	await isValidSession();
	const { signup_completed, username } = await getUser();

	if (!signup_completed) {
		return <CompleteSignup username={username} />;
	}

	return <div>Profile Edit Page</div>;
};
