import { mergeToastMaps } from "@/lib/sonner/toast";
import { ToastMessage } from "@/lib/sonner/toast";

export enum CMSToastType {
	DeleteArticle = "delete-article",
	SaveArticle = "save-article",
}

// You could have a lot?
// CMS, Edit, etc
// And save page 1,2,3,4
const ToastMessages = {
	confirmDeleteArticle: {
		id: CMSToastType.DeleteArticle,
		label: "Confirm",
		success: "Article has been deleted!",
		message: "Delete Article? This action cannot be undone.",
		duration: 5000,
		position: "top-center",
	},
	saveArticle: {
		id: CMSToastType.SaveArticle,
		loading: "Saving Article...",
		success: "Article has been updated!",
		error: "Error updating article",
	},
} as const;

// We need to assign these options to the actual toast
export const ToastMessagesMap = new Map<CMSToastType, ToastMessage>([
	[CMSToastType.DeleteArticle, ToastMessages.confirmDeleteArticle],
	[CMSToastType.SaveArticle, ToastMessages.saveArticle],
]);

// call initialise
mergeToastMaps(ToastMessagesMap);
