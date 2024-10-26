import { AiFillHome } from "react-icons/ai";
import styles from "./navigation-header.module.scss";
import Link from "next/link";
import { signIn } from "@/lib/routing/paths";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserMenu } from "./user-menu";
import { BiSolidUser } from "react-icons/bi";

const Logo = () => {
	return (
		<Link className={styles.logo} aria-label="Home" href="/">
			<AiFillHome size={"2rem"} />
		</Link>
	);
};

const Datatattat = () => {
	return (
		<div className={styles.logoContainer}>
			<Link href={"/"} key={"Home"} aria-hidden>
				{/* Pull from state - We should have a state config */}
				<h2 className={styles.logo}>DATATATTAT</h2>
			</Link>
		</div>
	);
};

const SignInButton = () => {
	return (
		// callback to current page
		<Link className={styles.simpleButton} href={signIn("/")}>
			<BiSolidUser size={"2rem"} />
			<p>Login</p>
		</Link>
	);
};

export const NavigationHeader = async () => {
	const session = await getServerSession(options);

	return (
		<nav className={styles.root}>
			<Logo />
			<Datatattat />
			{!session ? <SignInButton /> : <UserMenu />}
		</nav>
	);
};
