import { ShowInputProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";

export const CARD_DATA: ShowInputProps = {
	id: "showCardData",
	type: EditInputs.show,
	label: "Create Card Data",
	inputs: [
		{
			id: "cardData",
			type: EditInputs.inputList,
			label: "Card Data",
			inputs: [
				// {
				// 	id: "twitter:card",
				// 	type: EditInputs.text,
				// 	label: "Card",
				// },
				// {
				// 	id: "twitter:creator",
				// 	type: EditInputs.text,
				// 	label: "Creator",
				// },
				{
					id: "description",
					type: EditInputs.text,
					label: "Description",
				},
				{
					id: "image",
					type: EditInputs.text,
					label: "Image",
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
					id: "title",
					type: EditInputs.text,
					label: "Title",
				},
				// {
				// 	id: "og:type",
				// 	type: EditInputs.text,
				// 	label: "Type",
				// },
				{
					id: "url",
					type: EditInputs.text,
					label: "Url",
				},
			],
		},
	],
};
