"use client";

import { useForm, FormProvider } from "react-hook-form";

import { saveHeader } from "@/actions/edit/update-header";
import { HeaderType } from "@/types/header";
import { useState } from "react";
import { NavList } from "./nav/nav-list";
import { Button } from "@/components/ui/button";

import styles from "./header-form.module.scss";

type HeaderFormProps = {
	headerData: Omit<HeaderType, "createdAt" | "updatedAt">;
};

export const HeaderForm = ({ headerData }: HeaderFormProps) => {
	const [pageState, setPageState] = useState<string | undefined>(undefined);

	const methods = useForm({
		// read up on this / required for unregistering fields
		// use in conjunction with unregister
		shouldUnregister: true,
	});

	const { handleSubmit } = methods;
	const { route, nav } = headerData;

	const onSubmit = handleSubmit(async (data) => {
		const res = await saveHeader(route, data);
		setPageState(res.message);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} className={styles.form}>
				<NavList links={nav} />
				<Button type="submit">Submit</Button>
				{pageState ? (
					<p aria-live="polite" role="status">
						{pageState}
					</p>
				) : null}
			</form>
		</FormProvider>
	);
};
