"use client";

import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { PageForm } from "./page-form";
import { IPage } from "@/types/page";
import { useEffect } from "react";
import { savePage, saveTemplate } from "@/actions/edit/update-page";
import { useRouter } from "next/navigation";
import { EditContextProvider } from "../context/edit-context";
import { toast } from "sonner";

export const PageFormContainer = ({ pageData }: { pageData: IPage }) => {
	const { route } = pageData;
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

	const onSaveAsDraft = (args: SubmitHandler<FieldValues>) => {};
	const debugHandler = (args: SubmitHandler<FieldValues>) => {
		console.log("HOOK:FORM DEBUG", { args });
	};

	const submitHandler = methods.handleSubmit(async (data) => {
		// This should be done on the server...
		// Take what's changed and merge with the page object
		const update = { ...pageData, ...data };

		const promise = savePage(route, update)
			.then((res) => {
				methods.reset(data);
			})
			.catch((err) => {
				console.error(err);
			});

		toast.promise(promise, {
			loading: "Saving...",
			success: `Page has been saved!`,
			error: "Error saving page",
		});
	});

	const saveOrCreateTemplateHandler = methods.handleSubmit(async (data) => {
		const update = { ...pageData, ...data };

		// saveTemplate
		const promise = saveTemplate("example_id", update)
			.then((res) => {
				methods.reset(data);
			})
			.catch((err) => {
				console.error(err);
			});

		toast.promise(promise, {
			loading: "Saving Template...",
			success: `Template has been saved!`,
			error: "Error saving template",
		});
	});

	return (
		<EditContextProvider
			value={{
				submitHandler,
				saveAsTemplateHandler: saveOrCreateTemplateHandler,
				submitDraftHandler: onSaveAsDraft,
				submitDebugHandler: debugHandler,
			}}
		>
			<FormProvider {...methods}>
				<PageForm
					submitHandler={submitHandler}
					saveAsTemplateHandler={saveOrCreateTemplateHandler}
				/>
			</FormProvider>
		</EditContextProvider>
	);
};
