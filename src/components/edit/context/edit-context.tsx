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
	componentPreviewData: null,
	setComponentPreviewData: (data: PageComponent | null) => {
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

	return (
		<EditContext.Provider
			value={{ ...value, componentPreviewData, setComponentPreviewData }}
		>
			{children}
		</EditContext.Provider>
	);
};

export const EditContext = createContext({ ...initialState });
