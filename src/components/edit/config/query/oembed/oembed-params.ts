import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

const OembedVariants = {
	twitter: "twitter",
} as const;

export const OEMBED_PARAMS: GenericInput[] = [
	{
		id: "parameters",
		type: EditInputs.title,
		title: "Oembed Query Parameters",
	},
	{
		id: "variant",
		type: EditInputs.select,
		label: "Select Provider",
		options: [OembedVariants.twitter],
		defaultValue: OembedVariants.twitter,
		required: true,
	},
];
