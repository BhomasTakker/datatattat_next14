import { InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { FAV_ICON } from "./fav-icon-config";

export const META_CONFIG: InputListProps = {
	// this isn't the id!!!!!!
	id: "meta",
	type: EditInputs.inputList,
	label: "Meta Object",

	inputs: [
		{
			id: "createMetaData",
			type: EditInputs.show,
			label: "Create Page Meta Data",
			inputs: [
				{
					id: "cardData",
					type: EditInputs.inputList,
					label: "Card Data",
					createObject: false,

					inputs: [
						{
							id: "metaPropertiesTitle",
							type: EditInputs.title,
							title: "Meta Properties",
						},
						{
							id: "metaPropertiesDescription",
							type: EditInputs.description,
							text: "Add meta properties to your page. These can be used for SEO and social media sharing.",
						},
						//
						{
							id: "pageTitle",
							type: EditInputs.text,
							label: "Page Title",
							required: false,
						},
						{
							id: "pageDescription",
							type: EditInputs.text,
							label: "Page Description",
							required: false,
						},
						{
							id: "pageKeywords",
							type: EditInputs.text,
							label: "Page Keywords",
							required: false,
						},
						{
							id: "pageImage",
							type: EditInputs.text,
							label: "Page Image",
							required: false,
						},
						{
							id: "image:alt",
							type: EditInputs.text,
							label: "Image Alt",
						},
						{
							id: "locale",
							type: EditInputs.text,
							label: "Locale",
						},
						{
							id: "site_name",
							type: EditInputs.text,
							label: "Site Name",
						},
						{
							id: "url",
							type: EditInputs.text,
							label: "Url",
						},
						FAV_ICON,
						// CARD_DATA,
					],
				},
			],
		},
	],
};
