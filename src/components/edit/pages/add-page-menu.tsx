"use client";

// This could be a generic component eaasily enough
import { MdAdd } from "react-icons/md";
import styles from "./add-page-menu.module.scss";
import React, { forwardRef, useEffect, useRef, useState } from "react";

type AddPageMenuProps = {
	createPageHandler: (route: string) => void;
	routePrefix: string;
};

export const AddPageMenu = ({
	createPageHandler,
	routePrefix,
}: AddPageMenuProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onClickHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		const route = inputRef.current?.value;
		if (route) {
			// should be check created properly
			createPageHandler(route);
			// clear input if we created a page
			if (inputRef.current) {
				inputRef.current.value = "";
			}
		}
	};

	return (
		<div className={styles.container}>
			<button className={styles.menuButton} onClick={onClickHandler}>
				<MdAdd className={styles.logo} />
			</button>
			<form className={`${styles.form}`}>
				<p className={styles.route}>{routePrefix}</p>
				<input ref={inputRef} className={styles.input} type="text" max={100} />
			</form>
		</div>
	);
};
