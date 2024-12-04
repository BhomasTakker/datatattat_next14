import { User } from "@/types/auth/session";
import styles from "./user-profile.module.scss";

// potentially only show detail i.e. email and role
// IF you ARE that user
// Also probably get the actual User docum,ent rather than use the session
export const UserProfile = ({ user }: { user: User }) => {
	const { name, email, image, user_id } = user;
	return (
		<article className={styles.root}>
			<img className={styles.image} src={image} alt="Me yar!" />

			<div className={styles.content}>
				<h2 className={styles.name}>{name}</h2>
				<p className={styles.email}>{email}</p>
				<p className={styles.role}>{`user_id:- ${user_id}`}</p>
			</div>
		</article>
	);
};
