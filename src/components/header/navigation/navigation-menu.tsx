import { NavLinkData } from "./nav-link";
import { NavigationLinks } from "./navigation-links";
import classes from "./navigation-menu.module.scss";

interface NavigationMenuProps {
	items: NavLinkData[];
	edit?: boolean;
}

export const NavigationMenu = ({
	items,
	edit = false,
}: NavigationMenuProps) => {
	const showNav = items && items.length > 0;

	return (
		<>
			{showNav ? (
				// div seems unnecessary
				<div className={classes.root}>
					<nav className={classes.toolbar} data-testid={"nav"}>
						<NavigationLinks navLinks={items} edit={edit} />
					</nav>
				</div>
			) : null}
		</>
	);
};
