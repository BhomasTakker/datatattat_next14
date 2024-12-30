"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { PageForm } from "./page-form";
import { IPage } from "@/types/page";
import { useEffect } from "react";
import { savePage } from "@/actions/edit/update-page";
import { useRouter } from "next/navigation";

let oldPageRoute = "";

export const PageFormContainer = ({ pageData }: { pageData: IPage }) => {
	const { route } = pageData;
	const methods = useForm({
		// read up on this / required for unregistering fields
		// use in conjunction with unregister
		shouldUnregister: true,
		defaultValues: pageData as FieldValues,
	});
	// We need to reload the page when the route changes
	// Otherwise form components don't know to update
	const { refresh } = useRouter();

	useEffect(() => {
		// I don' know why this is necessary
		// Route is triggering toooften...
		if (oldPageRoute !== route) {
			if (oldPageRoute !== "") {
				refresh();
				methods.reset(pageData);
			}
			oldPageRoute = route;
		}
	}, [route]);

	const submitHandler = methods.handleSubmit(async (data) => {
		// This should be done on the server...
		// Take what's changed and merge with the page object
		const update = { ...pageData, ...data };

		console.log("SAVE PAGE", pageData);

		// revalidate the page path
		// set page state
		const res = await savePage(route, update);

		// setPageState(res.message);
	});

	return (
		<FormProvider {...methods}>
			{/* <PageFormContextProvider page={pageData} methods={methods}> */}
			<PageForm submitHandler={submitHandler} />
			{/* </PageFormContextProvider> */}
		</FormProvider>
	);
};
