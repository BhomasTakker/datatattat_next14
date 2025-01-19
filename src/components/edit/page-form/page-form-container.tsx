"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { PageForm } from "./page-form";
import { IPage } from "@/types/page";
import { useEffect } from "react";
import { savePage } from "@/actions/edit/update-page";
import { useRouter } from "next/navigation";
import { SaveState, useSaveState } from "@/components/hooks/use-save-state";

export const PageFormContainer = ({ pageData }: { pageData: IPage }) => {
	const { route } = pageData;
	const { setSaveState, status, reset } = useSaveState();
	const methods = useForm({
		// read up on this / required for unregistering fields
		// use in conjunction with unregister
		shouldUnregister: true,
		defaultValues: pageData as FieldValues,
	});

	const { refresh } = useRouter();

	useEffect(() => {
		refresh();
	}, [route]);

	const submitHandler = methods.handleSubmit(async (data) => {
		// This should be done on the server...
		// Take what's changed and merge with the page object
		setSaveState(SaveState.Saving);
		const update = { ...pageData, ...data };

		savePage(route, update)
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
			<PageForm submitHandler={submitHandler} />
			{status}
		</FormProvider>
	);
};
