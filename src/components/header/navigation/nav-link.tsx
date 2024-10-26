import Link from "next/link";

import styles from "./nav-link.module.scss";

export type NavLinkData = {
	route: string;
	label: string;
	key?: string;
};

type NavLinkProps = {} & NavLinkData;

export const NavLink = ({ route, label }: NavLinkProps) => {
	return (
		<div className={styles.root}>
			<Link className={styles.link} href={route}>
				<p>{label}</p>
			</Link>
		</div>
	);
};
