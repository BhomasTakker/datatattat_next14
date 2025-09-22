import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import styles from "./navigation-header.module.scss";
import Link from "next/link";
import { PATHS } from "@/lib/routing/paths";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserMenu } from "./user-menu/user-menu";
import { BiSolidUser } from "react-icons/bi";
import { getUserById } from "@/lib/mongo/actions/user/user";
import { Session } from "@/types/auth/session";
import { initialiseServices } from "@/lib/services/intialise-services";
import kofi from "../../../public/assets/ko-fi/kofi_symbol.png";

const Logo = () => {
	return (
		<div>
			<Link aria-label="Home" href="/">
				<div className={styles.homeContainer}>
					<AiFillHome className={styles.logo} />
				</div>
			</Link>
		</div>
	);
};

const Datatattat = () => {
	return (
		<div className={styles.logoContainer}>
			<Link href={"/"} key={"Home"} data-testid="datatattat" aria-hidden>
				{/* Pull from state - We should have a state config */}
				<h2 className={styles.datatattat}>DATATATTAT</h2>
			</Link>
		</div>
	);
};

// provide drop down menu for logged out user
const SignInButton = () => {
	return (
		// callback to current page
		<Link
			className={styles.simpleButton}
			href={PATHS.signIn("/")}
			data-testid="sign-in"
		>
			<BiSolidUser className={styles.logo} />
		</Link>
	);
};

const Kofi = () => {
	return (
		<Image
			src={kofi}
			alt="Kofi Logo - A cup of coffee with a heart logo"
			height={32}
		/>
	);
};

const KofiImage = () => {
	return (
		<img
			height="36"
			src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
			alt="Support us at ko-fi.com"
		/>
	);
};

const KofiButton = () => {
	return (
		<a href="https://ko-fi.com/Z8Z81DQMUH" target="_blank">
			<div className={styles.image}>
				<KofiImage />
			</div>
			<div className={styles.icon}>
				<Kofi />
			</div>
		</a>
	);
};

export const NavigationHeader = async () => {
	await initialiseServices();
	const session = (await getServerSession(options)) as Session;

	let menuComponent = <div />;

	// Warning
	// Here may look like a bug
	// If we have an active session in local storage i.e. for Development
	// If we then are running in 'Production' we will not have a valid session
	// So the user button to sign in or modify will not be shown
	if (!session) {
		menuComponent = <SignInButton />;
	} else {
		// We can have in local storage the wrong user - from Prod or Staging etc
		const { user } = session;
		const { user_id } = user;
		const userData = await getUserById(user_id);

		if (userData) {
			const { username, avatar } = userData;
			menuComponent = <UserMenu username={username} avatar={avatar} />;
		}
	}

	return (
		<nav className={styles.root}>
			<Logo />
			<Datatattat />
			<div className={styles.menuContainer}>
				<KofiButton />
				{menuComponent}
			</div>
		</nav>
	);
};
