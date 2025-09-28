import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormModal } from "../form-modal/modal";
import { LoadTemplateForm } from "../template/load-template-form";
import { SaveTemplateForm } from "../template/save-template-form";
import { IPage } from "@/types/page";
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

type ModalContainerProps = {
	methods: UseFormReturn<FieldValues, any, FieldValues>;
	pageData: IPage;
	showSaveTemplateModal: boolean;
	setShowSaveTemplateModal: (val: boolean) => void;
	showLoadTemplateModal: boolean;
	setShowLoadTemplateModal: (val: boolean) => void;
	setTemplate: (template: IPage) => void;
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
	showPreviewModal,
	setPreviewModal,
}: ModalContainerProps) => {
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
					methods.reset(formData);
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

	return (
		<>
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
				<div>Preview Modal - to be implemented</div>
			</FormModal>
		</>
	);
};
