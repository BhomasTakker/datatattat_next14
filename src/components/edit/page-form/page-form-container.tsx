"use client";

import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { PageForm } from "./page-form";
import { IPage, PageComponent } from "@/types/page";
import { useEffect, useState } from "react";
import { savePage } from "@/actions/edit/update-page";
import { useRouter } from "next/navigation";
import { EditContextProvider } from "../context/edit-context";
import { randomKeyGenerator } from "@/utils/edit";
import { initToastPromise, ToastType } from "@/lib/sonner/toast";
import { ModalContainer } from "./modal-container";

export const PageFormContainer = ({ pageData }: { pageData: IPage }) => {
	const [templateData, setTemplateData] = useState({} as IPage);
	const [componentTemplateData, setComponentTemplateData] = useState(
		{} as PageComponent
	);
	const [key, setKey] = useState(randomKeyGenerator());

	///////////////////////////////////////////////////////////////
	// reset form when page template data changes
	// We should set default data - but effectively when this change default data updates
	// This will be passed in to the form etc as default values
	// Then we update the key to force a full rerender of the form
	useEffect(() => {
		// this will cause a full rerender of the form
		if (Object.keys(templateData).length > 0) {
			setKey(randomKeyGenerator());
		}
	}, [templateData]);

	// reset form when component template data changes
	useEffect(() => {
		// We need to setValues of the provided component
		// Then we need to get the form data
		// use the new page data as the tmplate data
		// update the key to force a re-render of the form

		// this will cause a full rerender of the form
		if (Object.keys(componentTemplateData).length > 0) {
			setKey(randomKeyGenerator());
		}
	}, [componentTemplateData]);

	const defaultData = { ...pageData, ...templateData };

	return (
		<PageFormInteractionController
			key={key}
			pageData={defaultData}
			setTemplate={setTemplateData}
			setComponentTemplate={setComponentTemplateData}
		/>
	);
};

export const PageFormInteractionController = ({
	pageData,
	setTemplate,
	setComponentTemplate,
}: {
	pageData: IPage;
	setTemplate: (data: IPage) => void;
	setComponentTemplate: (data: PageComponent) => void;
}) => {
	// set modal state - to initialise load/save
	const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
	const [showLoadTemplateModal, setShowLoadTemplateModal] = useState(false);
	const [showPreviewModal, setPreviewModal] = useState(false);

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

	// Form submit etc should be initialised in the context, etc
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
	});

	const loadTemplateHandler = (templateId: string) => {
		setShowLoadTemplateModal(true);
	};

	const previewHandler = (e?: React.BaseSyntheticEvent) => {
		setPreviewModal(true);
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
			<ModalContainer
				methods={methods}
				pageData={pageData}
				showSaveTemplateModal={showSaveTemplateModal}
				setShowSaveTemplateModal={setShowSaveTemplateModal}
				showLoadTemplateModal={showLoadTemplateModal}
				setShowLoadTemplateModal={setShowLoadTemplateModal}
				showPreviewModal={showPreviewModal}
				setTemplate={setTemplate}
				setComponentTemplate={setComponentTemplate}
				setPreviewModal={setPreviewModal}
			/>
			<FormProvider {...methods}>
				<PageForm
					submitHandler={submitHandler}
					saveAsTemplateHandler={saveOrCreateTemplateHandler}
					loadTemplateHandler={loadTemplateHandler}
					previewHandler={previewHandler}
				/>
			</FormProvider>
		</EditContextProvider>
	);
};
