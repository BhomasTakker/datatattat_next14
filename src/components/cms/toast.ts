import { mergeToastMaps } from "@/lib/sonner/toast";
import { ToastMessage } from "@/lib/sonner/toast";

export enum CMSToastType {
	DeleteArticle = "delete-article",
	SaveArticle = "save-article",
	SaveArticleProvider = "save-article-provider",
	DeleteArticleProvider = "delete-article-provider",
	SaveArticleSource = "save-article-source",
	DeleteArticleSource = "delete-article-source",
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
	saveArticleProvider: {
		id: CMSToastType.SaveArticleProvider,
		loading: "Saving Article Provider...",
		success: "Article Provider has been updated!",
		error: "Error updating article provider",
	},
	confirmDeleteArticleProvider: {
		id: CMSToastType.DeleteArticleProvider,
		label: "Confirm",
		success: "Article Provider has been deleted!",
		message: "Delete Article Provider? This action cannot be undone.",
		duration: 5000,
		position: "top-center",
	},
	saveArticleSource: {
		id: CMSToastType.SaveArticleSource,
		loading: "Saving Article Source...",
		success: "Article Source has been updated!",
		error: "Error updating article source",
	},
	confirmDeleteArticleSource: {
		id: CMSToastType.DeleteArticleSource,
		label: "Confirm",
		success: "Article Source has been deleted!",
		message: "Delete Article Source? This action cannot be undone.",
		duration: 5000,
		position: "top-center",
	},
} as const;

// We need to assign these options to the actual toast
export const ToastMessagesMap = new Map<CMSToastType, ToastMessage>([
	[CMSToastType.DeleteArticle, ToastMessages.confirmDeleteArticle],
	[CMSToastType.SaveArticle, ToastMessages.saveArticle],
	[CMSToastType.SaveArticleProvider, ToastMessages.saveArticleProvider],
	[
		CMSToastType.DeleteArticleProvider,
		ToastMessages.confirmDeleteArticleProvider,
	],
	[CMSToastType.SaveArticleSource, ToastMessages.saveArticleSource],
	[CMSToastType.DeleteArticleSource, ToastMessages.confirmDeleteArticleSource],
]);

// call initialise
mergeToastMaps(ToastMessagesMap);
