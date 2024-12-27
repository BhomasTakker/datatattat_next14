import { savePage } from "@/actions/edit/update-page";
import { IPage } from "@/types/page";
import { createContext, ReactNode, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

// get from config
const ROUTE = "route";
const CREATOR = "creator";
const CONTENT = "content";
const META = "meta";
const PROFILE = "profile";

const formIds = {
	creator: CREATOR,
	content: CONTENT,
	meta: META,
	profile: PROFILE,
	route: ROUTE,
};

type PageFormContextProviderProps = {
	children: ReactNode;
	page: IPage;
	methods: UseFormReturn<FieldValues, unknown, undefined>;
};

type PageFormContextInitialState = {
	page: IPage | null;
	pageState: string | undefined;
	submitHandler: (e?: React.BaseSyntheticEvent) => Promise<void>;
	formIds: typeof formIds;
	methods: UseFormReturn<FieldValues, unknown, undefined>;
};

const initialState: PageFormContextInitialState = {
	page: null,
	pageState: undefined,
	submitHandler: async () => {},
	formIds,
	methods: {} as UseFormReturn<FieldValues, unknown, undefined>,
};

export const PageFormContextProvider = ({
	children,
	page,
	methods,
}: PageFormContextProviderProps) => {
	const [pageState, setPageState] = useState<string | undefined>(undefined);
	const { handleSubmit } = methods;

	const { route } = page;

	const submitHandler = handleSubmit(async (data) => {
		// This should be done on the server...
		// Take what's changed and merge with the page object
		const pageData = { ...page, ...data };

		// get meta value
		// get profile value
		// get content value
		// get creator_id value
		// create page object
		// save page object
		// revalidate the page path
		// set page state
		const res = await savePage(route, pageData);

		setPageState(res.message);
	});

	return (
		<PageFormContext.Provider
			value={{ page, pageState, submitHandler, formIds, methods }}
		>
			{children}
		</PageFormContext.Provider>
	);
};

export const PageFormContext = createContext({ ...initialState });
