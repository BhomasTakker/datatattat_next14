"use client";

import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { PageForm } from "./page-form";
import { IPage } from "@/types/page";
import { useEffect, useState } from "react";
import {
	loadTemplate,
	savePage,
	saveTemplate,
} from "@/actions/edit/update-page";
import { useRouter } from "next/navigation";
import { EditContextProvider } from "../context/edit-context";
import { randomKeyGenerator } from "@/utils/edit";
import { initToastPromise, ToastType } from "@/lib/sonner/toast";

export const PageFormContainer = ({ pageData }: { pageData: IPage }) => {
	const [templateData, setTemplateData] = useState({} as IPage);
	const [key, setKey] = useState(randomKeyGenerator());

	useEffect(() => {
		if (Object.keys(templateData).length > 0) {
			setKey(randomKeyGenerator());
		}
	}, [templateData]);

	const defaultData = { ...pageData, ...templateData };

	return (
		<PageFormInteractionController
			key={key}
			pageData={defaultData}
			setTemplate={setTemplateData}
		/>
	);
};

export const PageFormInteractionController = ({
	pageData,
	setTemplate,
}: {
	pageData: IPage;
	setTemplate: (data: IPage) => void;
}) => {
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

	// maybe create via a useReducer or someting
	// Draft save - For saving in local memory
	const onSaveAsDraft = (args: SubmitHandler<FieldValues>) => {};

	// DEBUG output of form data
	const debugHandler = (args: SubmitHandler<FieldValues>) => {
		console.log("HOOK:FORM DEBUG", { args });
	};

	// Main submit handler
	const submitHandler = methods.handleSubmit(async (data) => {
		// This should be done on the server...
		// Take what's changed and merge with the page object
		const update = { ...pageData, ...data };

		initToastPromise({
			cb: () => savePage(route, update),
			id: ToastType.SavePage,
			onComplete: (_res) => methods.reset(data),
			onError: (err) => console.error(err),
		});
	});

	// Save Page as template - Save all fields as a template to be loaded on request
	const saveOrCreateTemplateHandler = methods.handleSubmit(async (data) => {
		const update = { ...pageData, ...data };

		initToastPromise({
			cb: () => saveTemplate("example_id", update),
			id: ToastType.SaveTemplate,
			onComplete: (_res) => {
				methods.reset(data);
			},
			onError: (err) => {
				console.error(err);
			},
		});
	});

	const loadTemplateHandler = async (templateId: string) => {
		initToastPromise({
			cb: () => loadTemplate(templateId),
			id: ToastType.LoadTemplate,
			onComplete: (template) => setTemplate(template),
		});
	};

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
					loadTemplateHandler={loadTemplateHandler}
				/>
			</FormProvider>
		</EditContextProvider>
	);
};
