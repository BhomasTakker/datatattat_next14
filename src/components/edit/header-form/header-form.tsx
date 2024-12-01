"use client";

import { updateHeader } from "@/actions/edit/update-header";
import { getSubHeaders } from "@/actions/header/get-header";
import { HeaderNav, HeaderType } from "@/types/header";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import styles from "./header-form.module.scss";

type State = {
	message: string | null;
};

const initialState: State = {
	message: null,
};

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<button type="submit" aria-disabled={pending}>
			Submit
		</button>
	);
};

type Link = {
	label: string;
	route: string;
};

const NavLink = ({ link }: { link: Link }) => {
	const { label, route } = link;
	const [labelValue, setLabelValue] = useState(label);
	const [routeValue, setRouteValue] = useState(route);

	const updateLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLabelValue(e.target.value);
	};

	const updateRoute = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRouteValue(e.target.value);
	};

	return (
		<div className={styles.navLink}>
			<div className={styles.input}>
				<label htmlFor={`label-${label}`}>Label</label>
				<input
					type="text"
					id={`label-${label}`}
					name={`label-${label}`}
					value={labelValue}
					onChange={updateLabel}
					required
				/>
			</div>
			<div className={styles.input}>
				<label htmlFor={`route-${label}`}>Route</label>
				<input
					type="text"
					id={`route-${label}`}
					name={`route-${label}`}
					value={routeValue}
					onChange={updateRoute}
					required
				/>
			</div>
		</div>
	);
};

const NavLinks = ({ links }: { links: HeaderNav }) => {
	const linksArray = links.map((link, index) => {
		return <NavLink key={index} link={link} />;
	});
	return <>{linksArray}</>;
};

export const HeaderForm = ({
	route,
	headerData,
}: {
	route: string;
	headerData: HeaderType[];
}) => {
	const [state, formAction] = useFormState(updateHeader, initialState);

	const nav = headerData[0].nav;

	// Create add and delete and move up and down buttons
	// submit button
	// notify
	return (
		<form action={formAction}>
			<NavLinks links={nav} />
			<SubmitButton />
			<p aria-live="polite" role="status">
				{state.message}
			</p>
		</form>
	);
};
