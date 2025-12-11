import { toast } from "sonner";

// Create an Edit Toast file etc
export enum ToastType {
	SavePage = "save-page",
	SaveTemplate = "save-template",
	LoadTemplate = "load-template",
	ConfirmSaveTemplate = "confirm-save-template",
	SaveHeader = "save-header",
}

// You could have a lot?
// CMS, Edit, etc
// And save page 1,2,3,4
const ToastMessages = {
	savePage: {
		id: ToastType.SavePage,
		loading: "Saving...",
		success: "Page has been saved!",
		error: "Error saving page",
	},
	saveTemplate: {
		id: ToastType.SaveTemplate,
		loading: "Saving Template...",
		success: "Template has been saved!",
		error: "Error saving template",
	},
	loadTemplate: {
		id: ToastType.LoadTemplate,
		loading: "Loading Template...",
		success: "Template has been loaded!",
		error: "Template not found",
	},
	saveHeader: {
		id: ToastType.SaveHeader,
		loading: "Saving Header...",
		success: "Header has been saved!",
		error: "Error saving header",
	},
	confirmSaveTemplate: {
		id: ToastType.ConfirmSaveTemplate,
		label: "Confirm?",
		success: "Template has been confirmed!",
		message: "Template exists. Overwrite?",
		duration: 5000,
		position: "top-center",
	},
} as const;

export type ToastMessage = {
	id: string;
	loading?: string;
	success?: string;
	error?: string;
	label?: string;
	message?: string;
	duration?: number;
	position?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right"
		| "top-center"
		| "bottom-center";
};

const ToastMessagesMap = new Map<string, ToastMessage>([
	[ToastType.SavePage, ToastMessages.savePage],
	[ToastType.SaveTemplate, ToastMessages.saveTemplate],
	[ToastType.SaveHeader, ToastMessages.saveHeader],
	[ToastType.LoadTemplate, ToastMessages.loadTemplate],
	[ToastType.ConfirmSaveTemplate, ToastMessages.confirmSaveTemplate],
]);

export const mergeToastMaps = (newMap: Map<string, ToastMessage>) => {
	newMap.forEach((value, key) => {
		ToastMessagesMap.set(key, value);
	});
};

type ToastPromiseParams = {
	cb: () => Promise<any>;
	onComplete?: (res: any) => void;
	onError?: (err: any) => void;
	id: string;
};

export const initToastPromise = ({
	cb,
	onComplete,
	onError,
	id,
}: ToastPromiseParams) => {
	const promise = cb()
		.then((res) => {
			onComplete?.(res);
		})
		.catch((err) => {
			console.error(err);
			onError?.(err);
		});

	const toastMessage = ToastMessagesMap.get(id);

	if (!toastMessage) {
		console.error(`No toast message found for id: ${id}`);
		return;
	}

	toast.promise(promise, {
		loading: toastMessage.loading,
		success: toastMessage.success,
		error: toastMessage.error,
	});
};

export const createToastAction = ({
	cb,
	onComplete,
	onError,
	id,
}: ToastPromiseParams) => {
	const toastMessage = ToastMessagesMap.get(id);

	if (!toastMessage) {
		console.error(`No toast message found for id: ${id}`);
		return;
	}

	toast(toastMessage.message, {
		duration: toastMessage.duration,
		action: {
			label: toastMessage.label,
			onClick: () => {
				cb()
					.then((res) => {
						toast.success(toastMessage.success);
						onComplete?.(res);
					})
					.catch((err) => {
						toast.error(toastMessage.error);
						onError?.(err);
					});
			},
		},
		position: toastMessage.position,
	});
};
