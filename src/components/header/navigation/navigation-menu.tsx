import { NavLinkData } from "./nav-link";
import { NavigationLinks } from "./navigation-links";
import classes from "./navigation-menu.module.scss";

interface NavigationMenuProps {
	items: NavLinkData[];
}

export const NavigationMenu = ({ items }: NavigationMenuProps) => {
	const showNav = items && items.length;

	return (
		<div className={classes.root}>
			{showNav ? (
				<nav className={classes.toolbar}>
					<NavigationLinks navLinks={items} />
				</nav>
			) : null}
		</div>
	);
};
