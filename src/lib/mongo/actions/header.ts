import Header from "@/models/Header";
import { HeaderType } from "@/types/header";

const EMPTY_HEADER: HeaderType = {
	route: "",
	nav: [],
	creator: undefined,
	createdAt: new Date(),
	updatedAt: new Date(),
};

// should return null
export const getHeader = async (route: string) => {
	if (!route) {
		return EMPTY_HEADER;
	}
	// should we decode here?
	const decodedRoute = decodeURIComponent(route);
	// findOne will return an item if passed undefined for the query
	// if passed essentially nothing it will return the first document in collection
	return (await Header.findOne({ route: decodedRoute }).lean()) || EMPTY_HEADER;
};

export const saveOrCreateHeaderByRoute = async (
	header: Omit<HeaderType, "createdAt" | "updatedAt" | "creator">,
	creator: string
) => {
	const { route, nav } = header;

	try {
		await Header.findOneAndUpdate(
			{ route }, // find
			{ route, nav, creator }, // update
			{
				// options
				new: true,
				upsert: true, // Make this update into an upsert
			}
		);
	} catch (err) {
		console.error(err);
		return { message: "Error saving header" };
	}

	return { message: "Saved Header!" };
};
