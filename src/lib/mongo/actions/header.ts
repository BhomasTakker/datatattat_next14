import Header from "@/models/Header";
import { HeaderType } from "@/types/header";

const EMPTY_HEADER: HeaderType = {
	route: "",
	nav: [],
};

export const getHeader = async (route: string) => {
	return (await Header.findOne({ route }).lean()) || EMPTY_HEADER;
};
