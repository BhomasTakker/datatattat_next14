import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormModal } from "../form-modal/modal";
import { LoadTemplateForm } from "../template/load-template-form";
import { SaveTemplateForm } from "../template/save-template-form";
import { IPage, PageComponent } from "@/types/page";
import {
	createToastAction,
	initToastPromise,
	ToastType,
} from "@/lib/sonner/toast";
import {
	checkTemplateNameUnique,
	loadTemplate,
	saveTemplate,
} from "@/actions/edit/template";
import { PagePreview } from "../preview/page-preview";
import { EditContext } from "../context/edit-context";
import { useContext } from "react";
import { ComponentPreview } from "../preview/component-preview";
import {
	checkComponentTemplateNameUnique,
	loadComponentTemplate,
	saveComponentAsTemplate,
} from "@/actions/edit/template/component-template";
import { LoadComponentTemplateForm } from "../template/load-component-template-form";

type ModalContainerProps = {
	methods: UseFormReturn<FieldValues, any, FieldValues>;
	pageData: IPage;
	showSaveTemplateModal: boolean;
	setShowSaveTemplateModal: (val: boolean) => void;
	showLoadTemplateModal: boolean;
	setShowLoadTemplateModal: (val: boolean) => void;
	setTemplate: (template: IPage) => void;
	setComponentTemplate: (component: PageComponent) => void;
	showPreviewModal: boolean;
	setPreviewModal: (val: boolean) => void;
};

//////////////////
// Utils

const getFormData = (el: HTMLFormElement) => {
	const formData = new FormData(el);
	return Object.fromEntries(formData.entries());
};

const getTemplateId = (el: HTMLFormElement) => {
	const data = getFormData(el);

	const { templateId } = data;
	if (!templateId) {
		console.error("No template ID provided");
		return null;
	}
	// regex test a-z - only allow letters, numbers, underscores, and hyphens

	if (typeof templateId !== "string") {
		console.error("Invalid template ID");
		return null;
	}

	return templateId;
};

const checkFormIdValid = (templateId: string | null) => {
	if (!templateId) return false;

	// regex test a-z - only allow letters, numbers, underscores, and hyphens
	const validId = /^[a-zA-Z0-9_-]+$/.test(templateId);
	if (!validId) {
		console.error(
			"Invalid template ID. Only letters, numbers, underscores, and hyphens are allowed."
		);
		return false;
	}

	return true;
};

//////////////////////

export const ModalContainer = ({
	methods,
	pageData,
	showSaveTemplateModal,
	setShowSaveTemplateModal,
	showLoadTemplateModal,
	setShowLoadTemplateModal,
	setTemplate,
	setComponentTemplate,
	showPreviewModal,
	setPreviewModal,
}: ModalContainerProps) => {
	const {
		componentPreviewData,
		setComponentPreviewData,
		saveComponentAsTemplateData,
		setSaveComponentAsTemplateData,
		showComponentLoadTemplateModal,
		setShowComponentLoadTemplateModal,
	} = useContext(EditContext);

	const loadTemplateFormSubmitHandler = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const templateId = getTemplateId(e.target as HTMLFormElement);
		if (!templateId) return;

		initToastPromise({
			cb: () => loadTemplate(templateId),
			id: ToastType.LoadTemplate,
			onComplete: (template) => setTemplate(template),
		});
	};

	const saveTemplateFormSubmitHandler = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const formData = getFormData(e.target as HTMLFormElement);
		const templateId = getTemplateId(e.target as HTMLFormElement);
		if (!templateId) return;

		if (!checkFormIdValid(templateId)) return;

		// how to get the current form data here?
		const currentData = methods.getValues();
		const update = { ...pageData, ...currentData };

		// check if unique id
		const isUniqueId = await checkTemplateNameUnique(templateId);
		if (!isUniqueId) {
			createToastAction({
				cb: async () => {
					setShowSaveTemplateModal(false);
					await saveTemplate(templateId, update);
				},
				id: ToastType.ConfirmSaveTemplate,
				onComplete: (_res) => {
					// I don't think this should be here
					// methods.reset(formData);
				},
				onError: (err) => {
					console.error(err);
				},
			});
			return;
		}

		setShowSaveTemplateModal(false);
		initToastPromise({
			// if none use dummy timeout function
			cb: () => saveTemplate(templateId, update),
			id: ToastType.SaveTemplate,
			onComplete: (_res) => {
				methods.reset(formData);
			},
			onError: (err) => {
				console.error(err);
			},
		});
	};

	const getAndSetComponentData = async (templateId: string) => {
		const component = await loadComponentTemplate(templateId);

		if (!component) {
			return null;
		}

		const id = showComponentLoadTemplateModal.templateId;
		methods.setValue(id, component);
		const formData = methods.getValues();

		return formData;
	};

	const loadComponentTemplateFormSubmitHandler = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const templateId = getTemplateId(e.target as HTMLFormElement);
		if (!templateId) return;
		initToastPromise({
			cb: () => getAndSetComponentData(templateId),
			id: ToastType.LoadTemplate,
			onComplete: (template) => setTemplate(template),
		});
	};

	const saveComponentTemplateFormSubmitHandler = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const templateId = getTemplateId(e.target as HTMLFormElement);
		if (!templateId) return;

		if (!checkFormIdValid(templateId)) return;

		if (!saveComponentAsTemplateData) {
			console.error("No component data to save as template");
			return;
		}

		// check if unique id
		const isUniqueId = await checkComponentTemplateNameUnique(templateId);
		if (!isUniqueId) {
			createToastAction({
				cb: async () => {
					setSaveComponentAsTemplateData(null);
					await saveComponentAsTemplate(
						templateId,
						saveComponentAsTemplateData
					);
				},
				id: ToastType.ConfirmSaveTemplate,
				onComplete: (_res) => {
					// methods.reset(formData);
				},
				onError: (err) => {
					console.error(err);
				},
			});
			return;
		}

		setShowSaveTemplateModal(false);
		initToastPromise({
			// if none use dummy timeout function
			cb: () => {
				saveComponentAsTemplate(templateId, saveComponentAsTemplateData);
				return Promise.resolve();
			},
			id: ToastType.SaveTemplate,
			onComplete: (_res) => {
				setSaveComponentAsTemplateData(null);
			},
			onError: (err) => {
				console.error(err);
			},
		});
	};

	return (
		<>
			{/* All modals should be initialised etc by one object */}
			{/* Just send data or id to load a modal? */}
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
				<LoadTemplateForm submitHandler={loadTemplateFormSubmitHandler} />
			</FormModal>
			<FormModal
				isOpen={showPreviewModal}
				onClose={() => setPreviewModal(false)}
			>
				<PagePreview pageData={pageData} />
			</FormModal>
			<FormModal
				isOpen={!!componentPreviewData}
				onClose={() => setComponentPreviewData(null)}
			>
				<ComponentPreview data={componentPreviewData} />
			</FormModal>
			{/*  */}
			<FormModal
				isOpen={!!saveComponentAsTemplateData}
				onClose={() => setSaveComponentAsTemplateData(null)}
			>
				<SaveTemplateForm
					submitHandler={saveComponentTemplateFormSubmitHandler}
				/>
			</FormModal>
			<FormModal
				isOpen={showComponentLoadTemplateModal.showModal}
				onClose={() =>
					setShowComponentLoadTemplateModal({
						showModal: false,
						templateId: "",
					})
				}
			>
				<LoadComponentTemplateForm
					submitHandler={loadComponentTemplateFormSubmitHandler}
				/>
			</FormModal>
		</>
	);
};
