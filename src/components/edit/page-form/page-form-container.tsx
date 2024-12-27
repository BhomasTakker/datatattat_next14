"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { PageForm } from "./page-form";
import { PageFormContextProvider } from "./context/page-form-context";
import { IPage } from "@/types/page";

export const PageFormContainer = ({ pageData }: { pageData: IPage }) => {
	const methods = useForm({
		// read up on this / required for unregistering fields
		// use in conjunction with unregister
		shouldUnregister: true,
		defaultValues: pageData as FieldValues,
	});

	return (
		<FormProvider {...methods}>
			<PageFormContextProvider page={pageData} methods={methods}>
				<PageForm />
			</PageFormContextProvider>
		</FormProvider>
	);
};
