"use client";

// This could be a generic component eaasily enough
import { BiSolidUser } from "react-icons/bi";
import styles from "./user-menu.module.scss";
import React, { useEffect, useState } from "react";
import { DropDownProps, MenuDropDown } from "./drop-down/menu-drop-down";

type UserMenuProps = {
	username: string;
	avatar: string;
};

export const UserMenu = ({ username, avatar }: UserMenuProps) => {
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
			/>
		</div>
	);
};
