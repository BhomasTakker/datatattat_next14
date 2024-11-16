import Header from "@/models/Header";
import { HeaderType } from "@/types/header";

const EMPTY_HEADER: HeaderType = {
	route: "",
	nav: [],
};

export const getHeader = async (route: string) => {
	if (!route) {
		return EMPTY_HEADER;
	}
	// findOne will return an item if passed undefined for the query
	// if passed essentially nothing it will return the first document in collection
	return (await Header.findOne({ route }).lean()) || EMPTY_HEADER;
};
