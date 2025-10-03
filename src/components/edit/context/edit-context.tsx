import { PageComponent } from "@/types/page";
import { ReactNode, createContext, useState } from "react";

type EditState = {
	submitHandler: (data: any) => void;
	submitDraftHandler: (data: any) => void;
	submitDebugHandler?: (data: any) => void;
	saveAsTemplateHandler?: (data: any) => void;
};

type EditInterface = {
	componentPreviewData: PageComponent | null;
	setComponentPreviewData: (data: PageComponent | null) => void;
	saveComponentAsTemplateData: PageComponent | null;
	setSaveComponentAsTemplateData: (data: PageComponent | null) => void;
	showComponentLoadTemplateModal: boolean;
	setShowComponentLoadTemplateModal: (show: boolean) => void;
};

export type EditContextType = EditState & EditInterface;

const initialState: EditState & EditInterface = {
	submitHandler: () => {
		// Default implementation
	},
	submitDraftHandler: () => {
		// Default implementation
	},
	submitDebugHandler: () => {
		// Default implementation
	},
	saveAsTemplateHandler: () => {
		// Default implementation
	},
	// Probably have a context just for this/modals later
	componentPreviewData: null,
	setComponentPreviewData: (data: PageComponent | null) => {
		// Default implementation
	},
	saveComponentAsTemplateData: null,
	setSaveComponentAsTemplateData: (data: PageComponent | null) => {
		// Default implementation
	},
	showComponentLoadTemplateModal: false,
	setShowComponentLoadTemplateModal: (show: boolean) => {
		// Default implementation
	},
};

export const EditContextProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value: EditState;
}) => {
	const [componentPreviewData, setComponentPreviewData] =
		useState<PageComponent | null>(null);
	const [saveComponentAsTemplateData, setSaveComponentAsTemplateData] =
		useState<PageComponent | null>(null);
	const [showComponentLoadTemplateModal, setShowComponentLoadTemplateModal] =
		useState(false);

	return (
		<EditContext.Provider
			value={{
				...value,
				componentPreviewData,
				setComponentPreviewData,
				saveComponentAsTemplateData,
				setSaveComponentAsTemplateData,
				showComponentLoadTemplateModal,
				setShowComponentLoadTemplateModal,
			}}
		>
			{children}
		</EditContext.Provider>
	);
};

export const EditContext = createContext({ ...initialState });
