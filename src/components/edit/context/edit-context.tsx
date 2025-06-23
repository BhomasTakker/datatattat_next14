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

/////////////////////////////////////////////////
// Ultimately we need this context to managhe between user and state
// We are using state as our ultimate truth
// but when we change an object select / add a component etc
// We are reading from our ultimate state
/////////////////////////////////////////////
// What we 'could' do
// is use a dummy form to act as the source of truth
// When uer updates then you save the dummy
// When a User saves - you assign the dummy value to the real value
// have both sets of hook form state available in edit context
/////////////////////////////////////////////////
export const EditContextProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value: EditState;
}) => {
	return (
		<EditContext.Provider value={{ ...value }}>
			{/* Would you add the form context provider(s) here? */}
			{children}
		</EditContext.Provider>
	);
};

export const EditContext = createContext({ ...initialState });
