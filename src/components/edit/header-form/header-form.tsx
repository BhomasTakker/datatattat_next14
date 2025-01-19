"use client";

import { useForm, FormProvider } from "react-hook-form";

import { saveHeader } from "@/actions/edit/update-header";
import { HeaderType } from "@/types/header";
import { NavList } from "./nav/nav-list";
import { Button } from "@/components/ui/button";

import styles from "./header-form.module.scss";
import { SaveState, useSaveState } from "@/components/hooks/use-save-state";

type HeaderFormProps = {
	headerData: Omit<HeaderType, "createdAt" | "updatedAt">;
};

export const HeaderForm = ({ headerData }: HeaderFormProps) => {
	const { setSaveState, status, reset } = useSaveState();
	const methods = useForm({
		// read up on this / required for unregistering fields
		// use in conjunction with unregister
		shouldUnregister: true,
	});

	const { handleSubmit } = methods;
	const { route, nav } = headerData;

	const onSubmit = handleSubmit(async (data) => {
		setSaveState(SaveState.Saving);
		saveHeader(route, data)
			.then((res) => {
				reset(5000);
				setSaveState(SaveState.Saved);
			})
			.catch((err) => {
				setSaveState(SaveState.Error);
			});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} className={styles.form}>
				<NavList links={nav} />
				<Button type="submit">Submit</Button>
			</form>
			{status}
		</FormProvider>
	);
};
