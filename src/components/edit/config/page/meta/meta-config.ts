import { InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { CARD_DATA } from "./card-data-config";
import { FAV_ICON } from "./fav-icon-config";

export const META_CONFIG: InputListProps = {
	id: "meta",
	type: EditInputs.inputList,
	label: "Meta Object",

	inputs: [
		{
			id: "metaPropertiesTitle",
			type: EditInputs.title,
			title: "Meta Properties",
		},

		{
			id: "pageTitle",
			type: EditInputs.text,
			label: "Page Title",
		},
		{
			id: "pageDescription",
			type: EditInputs.text,
			label: "Page Description",
		},
		{
			id: "pageKeywords",
			type: EditInputs.text,
			label: "Page Keywords",
		},
		{
			id: "pageImage",
			type: EditInputs.text,
			label: "Page Image",
		},
		FAV_ICON,
		CARD_DATA,
		// Should be created by the system
		// {
		// 	id: "pageType",
		// 	type: EditInputs.text,
		// 	label: "Page Type",
		// },
		// {
		// 	id: "pageUrl",
		// 	type: EditInputs.text,
		// 	label: "Page URL",
		// },
		// {
		// 	id: "pageAuthor",
		// 	type: EditInputs.text,
		// 	label: "Page Author",
		// },
		// {
		// 	id: "pagePublished",
		// 	type: EditInputs.text,
		// 	label: "Page Published",
		// },
		// {
		// 	id: "pageModified",
		// 	type: EditInputs.text,
		// 	label: "Page Modified",
		// },
	],
};
