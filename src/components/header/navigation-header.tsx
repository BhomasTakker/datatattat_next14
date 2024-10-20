import { AiFillHome } from "react-icons/ai";
import styles from "./navigation-header.module.scss";
import Link from "next/link";

const Logo = () => {
	return (
		<Link className={styles.logo} aria-label="Home" href="/">
			<AiFillHome />
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

export const NavigationHeader = () => {
	return (
		<nav className={styles.root}>
			<Logo />
			<Datatattat />

			<form>
				<button className={styles.simpleButton}>Login</button>
			</form>
		</nav>
	);
};
