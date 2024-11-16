import { NavLinkData } from "./nav-link";
import { NavigationLinks } from "./navigation-links";
import classes from "./navigation-menu.module.scss";

interface NavigationMenuProps {
	items: NavLinkData[];
}

export const NavigationMenu = ({ items }: NavigationMenuProps) => {
	const showNav = items && items.length > 0;

	return (
		<>
			{showNav ? (
				<div className={classes.root}>
					<nav className={classes.toolbar} data-testid={"nav"}>
						<NavigationLinks navLinks={items} />
					</nav>
				</div>
			) : null}
		</>
	);
};
