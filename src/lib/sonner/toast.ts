import { toast } from "sonner";

export enum ToastType {
	SavePage = "save-page",
	SaveTemplate = "save-template",
	LoadTemplate = "load-template",
	SaveHeader = "save-header",
}

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
} as const;

type ToastMessage = {
	id: string;
	loading: string;
	success: string;
	error: string;
};

const ToastMessagesMap = new Map<ToastType, ToastMessage>([
	[ToastType.SavePage, ToastMessages.savePage],
	[ToastType.SaveTemplate, ToastMessages.saveTemplate],
	[ToastType.SaveHeader, ToastMessages.saveHeader],
	[ToastType.LoadTemplate, ToastMessages.loadTemplate],
]);

type ToastPromiseParams = {
	cb: () => Promise<any>;
	onComplete?: (res: any) => void;
	onError?: (err: any) => void;
	id: ToastType;
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
