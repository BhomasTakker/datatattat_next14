import styles from "./user-profile.module.scss";
import { IUser } from "@/types/user";

type ProfilePageProps = {
	user: Partial<IUser>;
};
// potentially only show detail i.e. email and role
// IF you ARE that user
export const UserProfile = ({ user }: ProfilePageProps) => {
	const {
		username,
		avatar,
		signin_email,
		signin_method,
		signin_name,
		role,
		_id,
	} = user;

	const restricted = (
		<div>
			<p className={styles.role}>{`user role:- ${role}`}</p>
			<p className={styles.method}>{signin_method}</p>
			<p className={styles.name}>{signin_name}</p>
			<p className={styles.email}>{signin_email}</p>
			<p className={styles.id}>{`user_id:- ${_id}`}</p>
		</div>
	);

	return (
		<article className={styles.root}>
			<img
				className={styles.image}
				src={avatar}
				alt={`${username} avatar image`}
			/>

			<div className={styles.content}>
				<h2 className={styles.name}>{username}</h2>
				{_id ? restricted : null}
			</div>
		</article>
	);
};
