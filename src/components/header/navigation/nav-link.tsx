import Link from "next/link";

import styles from "./nav-link.module.scss";

export type NavLinkData = {
	route: string;
	label: string;
	key?: string;
};

type NavLinkProps = { isEdit: boolean } & NavLinkData;

export const NavLink = ({ route, label, isEdit }: NavLinkProps) => {
	const routeLink = isEdit ? `/edit?route=${route}` : route;
	// if edit...
	return (
		<Link className={`${styles.root}`} href={routeLink}>
			<p>{label}</p>
		</Link>
	);
};
