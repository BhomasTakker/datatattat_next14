import { IUser } from "@/types/user";
import { UserProfile } from "./user-profile";

type ProfilePageProps = {
	user: Pick<IUser, "username" | "avatar">;
};

// Show available pages
// search etc
export const ProfilePage = ({ user }: ProfilePageProps) => {
	return (
		<div>
			<UserProfile user={user} />
		</div>
	);
};
