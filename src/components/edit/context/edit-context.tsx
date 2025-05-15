import { ReactNode, createContext, useCallback, useState } from "react";

type EditState = {
	submitHandler: (data: any) => void;
};

type EditInterface = {};

const initialState: EditState & EditInterface = {
	submitHandler: () => {
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
