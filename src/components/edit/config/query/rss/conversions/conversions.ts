import { EditInputs } from "@/components/edit/inputs/inputs";
import { RESPONSE_INPUT } from "./response";
import { SUB_RESPONSE_INPUT } from "./sub-response";
import { GenericInput } from "@/types/edit/inputs/inputs";

// CONVERSIONS_CONFIG
// provider
// params . urls : []
// queryId
// conversions

// This could effectively be genric across conversions
// create a function etc to modify the base object
// It could well be that the only thing to change will be the conversionId?
// We may not even need that?
export const RSS_CONVERSIONS: GenericInput[] = [
	{
		id: "conversions",
		type: EditInputs.title,
		title: "Conversions",
		size: "large",
	},
	{
		id: "conversionId",
		type: EditInputs.text,
		label: "Conversion Id",
		defaultValue: "RSS:2.0",
		disabled: true,
	},
	RESPONSE_INPUT,
	// Should be an array of sub objects going forward
	// So we can add multiple conversions/subobjects etc
	SUB_RESPONSE_INPUT,
];
