import { AiFillHome } from "react-icons/ai";
import styles from "./navigation-header.module.scss";
import Link from "next/link";
import { PATHS } from "@/lib/routing/paths";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserMenu } from "./user-menu/user-menu";
import { BiSolidUser } from "react-icons/bi";
import { getUserById } from "@/lib/mongo/actions/user";
import { Session } from "@/types/auth/session";

const Logo = () => {
	return (
		<Link aria-label="Home" href="/">
			<div className={styles.homeContainer}>
				<AiFillHome className={styles.logo} />
			</div>
		</Link>
	);
};

const Datatattat = () => {
	return (
		<div className={styles.logoContainer}>
			<Link href={"/"} key={"Home"} aria-hidden>
				{/* Pull from state - We should have a state config */}
				<h2 className={styles.datatattat}>DATATATTAT</h2>
			</Link>
		</div>
	);
};

const SignInButton = () => {
	return (
		// callback to current page
		<Link className={styles.simpleButton} href={PATHS.signIn("/")}>
			<BiSolidUser className={styles.logo} />
			<p>Login</p>
		</Link>
	);
};

export const NavigationHeader = async () => {
	const session = (await getServerSession(options)) as Session;

	let menuComponent = null;

	if (!session) {
		menuComponent = <SignInButton />;
	} else {
		const { user } = session;
		const { user_id } = user;
		const { role, username, avatar } = await getUserById(user_id);
		menuComponent = <UserMenu username={username} avatar={avatar} />;
	}

	return (
		<nav className={styles.root}>
			<Logo />
			<Datatattat />
			{menuComponent}
		</nav>
	);
};
