"use client";

import { FormProvider, useForm } from "react-hook-form";

// This could be a generic component eaasily enough
import { MdAdd } from "react-icons/md";
import styles from "./add-page-menu.module.scss";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { patterns } from "@/utils/regex";

type AddPageMenuProps = {
	createPageHandler: (route: string) => void;
	routePrefix: string;
};

type Inputs = {
	route: string;
};

export const AddPageMenu = ({
	createPageHandler,
	routePrefix,
}: AddPageMenuProps) => {
	const methods = useForm<Inputs>({
		defaultValues: {},
	});
	const {
		handleSubmit,
		formState: { errors },
		reset,
		register,
	} = methods;

	const onSubmit = handleSubmit(async (data) => {
		const route = data.route;
		const isRouteValid = route.match(patterns.pageSlug.regex);
		if (!isRouteValid) {
			// flag somethng
			return;
		}
		createPageHandler(route);
		reset();
	});

	return (
		<FormProvider {...methods}>
			<div className={styles.container}>
				<form className={`${styles.form}`} onSubmit={onSubmit}>
					<div className={styles.inputContainer}>
						<button className={styles.menuButton} type="submit">
							<MdAdd className={styles.logo} />
						</button>
						<p className={styles.route}>{routePrefix}</p>
						<input
							className={styles.input}
							type="text"
							max={50}
							{...register("route", {
								required: true,
								pattern: {
									value: patterns.pageSlug.regex,
									message: patterns.pageSlug.message,
								},
							})}
						/>
					</div>

					{errors.route && (
						<p className={`${styles.warn} ${styles.showWarning}`}>
							{errors.route.message}
						</p>
					)}
				</form>
			</div>
		</FormProvider>
	);
};
