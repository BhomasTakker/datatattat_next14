import styles from "./user-profile.module.scss";

type User = {
	name: string;
	email: string;
	image: string;
	role: string; //union of roles
};

// potentially only show detail i.e. email and role
// IF you ARE that user
export const UserProfile = ({ user }: { user: User }) => {
	const { name, email, image, role } = user;
	return (
		<article className={styles.root}>
			<img className={styles.image} src={image} alt="Me yar!" />

			<div className={styles.content}>
				<h2 className={styles.name}>{name}</h2>
				<p className={styles.email}>{email}</p>
				<p className={styles.role}>{`role:- ${role}`}</p>
			</div>
		</article>
	);
};
