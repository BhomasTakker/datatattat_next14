import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	GenericInput,
	TextInputProps,
	TitleInputProps,
} from "@/types/edit/inputs/inputs";

const regionTitle: TitleInputProps = {
	id: "regionInputsTitle",
	type: EditInputs.title,
	title: "Region Filters",
	size: "large",
};

export const andRegion: TextInputProps = {
	id: "region",
	type: EditInputs.text,
	label: "Select Region (This AND This)",
	required: false,
};

export const orRegion: TextInputProps = {
	id: "orRegion",
	type: EditInputs.text,
	label: "Select Region (This OR This)",
};

const excludeRegions: TextInputProps = {
	id: "excludeRegions",
	type: EditInputs.text,
	label: "Exclude Regions",
};

export const regionInputs: GenericInput[] = [
	regionTitle,
	andRegion,
	orRegion,
	excludeRegions,
];
