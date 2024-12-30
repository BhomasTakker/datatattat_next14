import { NavLinkData } from "./nav-link";
import { NavigationLinks } from "./navigation-links";
import classes from "./navigation-menu.module.scss";

interface NavigationMenuProps {
	items: NavLinkData[];
	edit?: boolean;
	prefix?: string;
}

export const NavigationMenu = ({ items, prefix = "" }: NavigationMenuProps) => {
	const showNav = items && items.length > 0;

	return (
		<>
			{showNav ? (
				// div seems unnecessary
				<div className={classes.root}>
					<nav className={classes.toolbar} data-testid={"nav"}>
						<NavigationLinks navLinks={items} prefix={prefix} />
					</nav>
				</div>
			) : null}
		</>
	);
};
