import { mergeToastMaps } from "@/lib/sonner/toast";
import { ToastMessage } from "@/lib/sonner/toast";
import { create } from "domain";

export enum CMSToastType {
	DeleteArticle = "delete-article",
	SaveArticle = "save-article",
	SaveArticleProvider = "save-article-provider",
	DeleteArticleProvider = "delete-article-provider",
	CreateArticleProvider = "create-article-provider",
	SaveArticleSource = "save-article-source",
	DeleteArticleSource = "delete-article-source",
	CreateArticleSource = "create-article-source",
	SaveArticleSourceList = "save-article-source-list",
	DeleteArticleSourceList = "delete-article-source-list",
	CreateArticleSourceList = "create-article-source-list",
	SaveCronJob = "save-cron-job",
	DeleteCronJob = "delete-cron-job",
	CreateCronJob = "create-cron-job",
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
	createArticleProvider: {
		id: CMSToastType.CreateArticleProvider,
		loading: "Creating Article Provider...",
		success: "Article Provider has been created!",
		error: "Error creating article provider",
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
	createArticleSource: {
		id: CMSToastType.CreateArticleSource,
		loading: "Creating Article Source...",
		success: "Article Source has been created!",
		error: "Error creating article source",
	},
	saveArticleSourceList: {
		id: CMSToastType.SaveArticleSourceList,
		loading: "Saving Article Source List...",
		success: "Article Source List has been updated!",
		error: "Error updating article source list",
	},
	confirmDeleteArticleSourceList: {
		id: CMSToastType.DeleteArticleSourceList,
		label: "Confirm",
		success: "Article Source List has been deleted!",
		message: "Delete Article Source List? This action cannot be undone.",
		duration: 5000,
		position: "top-center",
	},
	createArticleSourceList: {
		id: CMSToastType.CreateArticleSourceList,
		loading: "Creating Article Source List...",
		success: "Article Source List has been created!",
		error: "Error creating article source list",
	},
	saveCronJob: {
		id: CMSToastType.SaveCronJob,
		loading: "Saving Cron Job...",
		success: "Cron Job has been updated!",
		error: "Error updating cron job",
	},
	confirmDeleteCronJob: {
		id: CMSToastType.DeleteCronJob,
		label: "Confirm",
		success: "Cron Job has been deleted!",
		message: "Delete Cron Job? This action cannot be undone.",
		duration: 5000,
		position: "top-center",
	},
	createCronJob: {
		id: CMSToastType.CreateCronJob,
		loading: "Creating Cron Job...",
		success: "Cron Job has been created!",
		error: "Error creating cron job",
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
	[CMSToastType.CreateArticleProvider, ToastMessages.createArticleProvider],
	[CMSToastType.SaveArticleSource, ToastMessages.saveArticleSource],
	[CMSToastType.DeleteArticleSource, ToastMessages.confirmDeleteArticleSource],
	[CMSToastType.CreateArticleSource, ToastMessages.createArticleSource],
	[CMSToastType.SaveArticleSourceList, ToastMessages.saveArticleSourceList],
	[
		CMSToastType.DeleteArticleSourceList,
		ToastMessages.confirmDeleteArticleSourceList,
	],
	[CMSToastType.CreateArticleSourceList, ToastMessages.createArticleSourceList],
	[CMSToastType.SaveCronJob, ToastMessages.saveCronJob],
	[CMSToastType.DeleteCronJob, ToastMessages.confirmDeleteCronJob],
	[CMSToastType.CreateCronJob, ToastMessages.createCronJob],
]);

// call initialise
mergeToastMaps(ToastMessagesMap);
