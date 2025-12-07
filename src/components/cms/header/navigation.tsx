import { NavigationLinks } from "@/components/header/navigation/navigation-links";
import styles from "./navigation.module.scss";

const navLinks = [
	{ label: "Dashboard", route: "/cms/dashboard" },
	{ label: "Posts", route: "/cms/posts" },
	{ label: "Pages", route: "/cms/pages" },
	{ label: "Settings", route: "/cms/settings" },
];

export const CMSNavigation = () => {
	return (
		<div className={styles.root}>
			<nav className={styles.toolbar} data-testid={"nav"}>
				<NavigationLinks navLinks={navLinks} prefix={""} />
			</nav>
		</div>
	);
};
