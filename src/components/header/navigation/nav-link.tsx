import Link from "next/link";

import styles from "./nav-link.module.scss";

export type NavLinkData = {
	route: string;
	label: string;
	key?: string;
};

type NavLinkProps = { prefix: string } & NavLinkData;

export const NavLink = ({ route, label, prefix = "" }: NavLinkProps) => {
	const routeLink = `${prefix}${route}`;
	return (
		<Link className={`${styles.root}`} href={routeLink}>
			<p>{label}</p>
		</Link>
	);
};
