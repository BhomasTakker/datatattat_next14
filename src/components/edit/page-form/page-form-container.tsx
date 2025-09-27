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
import { FormModal } from "../form-modal/modal";
import { SaveTemplateForm } from "../save-template-form/save-template-form";

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
	// set modal state - to initialise load/save
	const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
	const [showLoadTemplateModal, setShowLoadTemplateModal] = useState(false);
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
		setShowSaveTemplateModal(true);
		// initToastPromise({
		// 	cb: () => saveTemplate("example_id", update),
		// 	id: ToastType.SaveTemplate,
		// 	onComplete: (_res) => {
		// 		methods.reset(data);
		// 	},
		// 	onError: (err) => {
		// 		console.error(err);
		// 	},
		// });
	});

	const loadTemplateHandler = async (templateId: string) => {
		setShowLoadTemplateModal(true);
		// initToastPromise({
		// 	cb: () => loadTemplate(templateId),
		// 	id: ToastType.LoadTemplate,
		// 	onComplete: (template) => setTemplate(template),
		// });
	};

	const saveTemplateFormSubmitHandler = (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		const { templateId } = data;
		if (!templateId) {
			console.error("No template ID provided");
			return;
		}
		// regex test a-z - only allow letters, numbers, underscores, and hyphens

		if (typeof templateId !== "string") {
			console.error("Invalid template ID");
			return;
		}

		const validId = /^[a-zA-Z0-9_-]+$/.test(templateId);
		if (!validId) {
			console.error(
				"Invalid template ID. Only letters, numbers, underscores, and hyphens are allowed."
			);
			return;
		}
		// how to get the current form data here?
		const currentData = methods.getValues();
		const update = { ...pageData, ...currentData };
		setShowSaveTemplateModal(false);
		initToastPromise({
			// if none use dummy timeout function
			cb: () => saveTemplate(templateId, update),
			id: ToastType.SaveTemplate,
			onComplete: (_res) => {
				methods.reset(data);
			},
			onError: (err) => {
				console.error(err);
			},
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
			{/* <FormModal
				isOpen={showSaveTemplateModal}
				onClose={() => setShowSaveTemplateModal(false)}
			>
				<SaveTemplateForm submitHandler={saveTemplateFormSubmitHandler} />
			</FormModal> */}
			<FormModal
				isOpen={showSaveTemplateModal}
				onClose={() => setShowSaveTemplateModal(false)}
			>
				<SaveTemplateForm submitHandler={saveTemplateFormSubmitHandler} />
			</FormModal>
			<FormModal
				isOpen={showLoadTemplateModal}
				onClose={() => setShowLoadTemplateModal(false)}
			>
				<h2>Load Template Form</h2>
				{/* <LoadTemplateForm submitHandler={loadTemplateFormSubmitHandler} /> */}
			</FormModal>
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
