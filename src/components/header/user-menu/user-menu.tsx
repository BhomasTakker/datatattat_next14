"use client";

// This could be a generic component eaasily enough
import { BiSolidUser } from "react-icons/bi";
import styles from "./user-menu.module.scss";
import { useEffect, useState } from "react";
import { MenuDropDown } from "./drop-down/menu-drop-down";

type UserMenuProps = {
	username: string;
	avatar: string;
	role: string;
};

export const UserMenu = ({ username, avatar, role }: UserMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const closeHnd = () => setIsOpen(false);
		if (isOpen) {
			document.addEventListener("click", closeHnd);
		}
		return () => {
			document.removeEventListener("click", closeHnd);
		};
	}, [isOpen]);

	return (
		<div data-testid="user-menu">
			<button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
				<BiSolidUser className={styles.logo} />
			</button>
			<MenuDropDown
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				username={username}
				avatar={avatar}
				role={role}
			/>
		</div>
	);
};
