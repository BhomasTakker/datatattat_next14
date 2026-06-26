import {
	GenericInput,
	InputListProps,
	TextInputProps,
	TitleInputProps,
} from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { FAV_ICON } from "./fav-icon-config";

const metaTitle: GenericInput[] = [
	{
		id: "metaPropertiesTitle",
		type: EditInputs.title,
		title: "Meta Properties",
	},
	{
		// description needs to go in/with the actual input.
		id: "metaPropertiesDescription",
		type: EditInputs.description,
		text: "Add meta properties to your page. These can be used for SEO and social media sharing.",
	},
];

const pageTitle: TextInputProps = {
	id: "pageTitle",
	type: EditInputs.text,
	label: "Page Title",
	required: false,
};

const pageDescription: TextInputProps = {
	id: "pageDescription",
	type: EditInputs.text,
	label: "Page Description",
	required: false,
};

const pageKeywords: TextInputProps = {
	id: "pageKeywords",
	type: EditInputs.text,
	label: "Page Keywords",
	required: false,
};

const pageImage: TextInputProps = {
	id: "pageImage",
	type: EditInputs.text,
	label: "Page Image",
	required: false,
};

const imageAlt: TextInputProps = {
	id: "image:alt",
	type: EditInputs.text,
	label: "Image Alt",
	required: false,
};

const local: TextInputProps = {
	id: "locale",
	type: EditInputs.text,
	label: "Locale",
	required: false,
};

const siteName: TextInputProps = {
	id: "site_name",
	type: EditInputs.text,
	label: "Site Name",
	required: false,
};

const url: TextInputProps = {
	id: "url",
	type: EditInputs.text,
	label: "Url",
	required: false,
};

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
					id: "cardDataInputList",
					type: EditInputs.inputList,
					label: "Card Data",
					createObject: false,

					inputs: [
						...metaTitle,
						{
							id: "metaTitlePropertiesGroup",
							type: EditInputs.group,
							inputs: [pageTitle, url],
						},
						{
							id: "metaPropertiesGroup",
							type: EditInputs.group,
							inputs: [pageDescription, pageKeywords],
						},
						{
							id: "metaImagePropertiesGroup",
							type: EditInputs.group,
							inputs: [pageImage, imageAlt],
						},
						{
							id: "metaLocalePropertiesGroup",
							type: EditInputs.group,
							inputs: [local, siteName],
						},
						FAV_ICON,
					],
				},
			],
		},
	],
};
