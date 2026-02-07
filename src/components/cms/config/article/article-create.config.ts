import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { AVATAR } from "./avatar.config";
import { DETAILS } from "./details.config";
import { MANAGEMENT } from "./management.config";
import { MEDIA } from "./media.config";
import { ARTICLE_VARIANT } from "./variant/variant.config";

export const ARTICLE_CREATE_CONFIG: InputListProps = {
	id: "createArticle",
	type: EditInputs.inputList,
	label: "Create Article",
	createObject: false,
	inputs: [
		{
			id: "ArticleCreateTitle",
			type: EditInputs.title,
			title: "Create New Article",
		},
		{
			id: "title",
			type: EditInputs.text,
			label: "Title",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "description",
			type: EditInputs.text,
			label: "Description",
			required: false,
		},
		{
			id: "src",
			type: EditInputs.url,
			label: "Source URL",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "guid",
			type: EditInputs.text,
			label: "GUID",
			required: false,
		},
		ARTICLE_VARIANT,
		{
			id: "provider",
			type: EditInputs.text,
			label: "Provider ID",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "feed",
			type: EditInputs.text,
			label: "Source Feed ID",
			required: false,
		},
		...DETAILS,
		...AVATAR,
		...MEDIA,
		...MANAGEMENT,
	],
};
