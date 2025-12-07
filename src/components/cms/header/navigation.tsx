import { NavigationLinks } from "@/components/header/navigation/navigation-links";
import styles from "./navigation.module.scss";

// pass in I guess
const navLinks = [{ label: "Articles", route: "/cms/articles" }];

export const CMSNavigation = () => {
	return (
		<div className={styles.root}>
			<nav className={styles.toolbar} data-testid={"nav"}>
				<NavigationLinks navLinks={navLinks} prefix={""} />
			</nav>
		</div>
	);
};
