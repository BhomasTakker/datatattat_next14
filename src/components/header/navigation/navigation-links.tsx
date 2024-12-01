import React from "react";
import { NavLink, NavLinkData } from "./nav-link";
import styles from "./navigation-links.module.scss";

type NavigationProps = {
	navLinks: NavLinkData[];
	edit: boolean;
};

export const NavigationLinks = ({ navLinks, edit }: NavigationProps) => {
	const drawNavLinks = (links: NavLinkData[]) => {
		return links.map((link) => {
			const element = (
				<NavLink
					route={link.route}
					label={link.label}
					key={link.label}
					isEdit={edit}
				></NavLink>
			);
			return element;
		});
	};

	// Double div so we can center the nav
	return <div className={styles.root}>{drawNavLinks(navLinks)}</div>;
};
