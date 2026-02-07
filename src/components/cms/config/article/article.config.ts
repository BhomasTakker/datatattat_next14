import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { AVATAR } from "./avatar.config";
import { DETAILS } from "./details.config";
import { MANAGEMENT } from "./management.config";
import { MEDIA } from "./media.config";
import { ARTICLE_VARIANT } from "./variant/variant.config";

export const ARTICLE_CONFIG: InputListProps = {
	id: "article",
	type: EditInputs.inputList,
	label: "Article Object",
	createObject: false,
	inputs: [
		{
			id: "title",
			type: EditInputs.text,
			label: "Title",
			disabled: true,
		},
		{
			id: "description",
			type: EditInputs.text,
			label: "Description",
			disabled: true,
		},
		{
			id: "src",
			type: EditInputs.url,
			label: "Source URL",
			disabled: true,
		},
		{
			id: "guid",
			type: EditInputs.text,
			label: "GUID",
			disabled: true,
		},
		ARTICLE_VARIANT,
		{
			// there is a date time input but converting to it?
			id: "createdAt",
			type: EditInputs.text,
			label: "Created",
			disabled: true,
		},
		{
			id: "updatedAt",
			type: EditInputs.text,
			label: "Last Updated",
			disabled: true,
		},
		...DETAILS,
		...AVATAR,
		...MEDIA,
		...MANAGEMENT,
	],
};
