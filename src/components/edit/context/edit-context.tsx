import { ReactNode, createContext } from "react";

type EditState = {
	submitHandler: (data: any) => void;
	submitDraftHandler: (data: any) => void;
	submitDebugHandler?: (data: any) => void;
	saveAsTemplateHandler?: (data: any) => void;
};

type EditInterface = {};

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
};

export const EditContextProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value: EditState;
}) => {
	return (
		<EditContext.Provider value={{ ...value }}>{children}</EditContext.Provider>
	);
};

export const EditContext = createContext({ ...initialState });
