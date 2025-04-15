import { InputListProps, ShowInputProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { CARD_DATA } from "./card-data-config";
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
			defaultChecked: false,
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
						FAV_ICON,
						CARD_DATA,
					],
				},
			],
		},
	],
};
