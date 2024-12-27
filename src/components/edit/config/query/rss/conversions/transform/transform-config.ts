import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, TitleInputProps } from "@/types/edit/inputs/inputs";

enum TransformOptions {
	toCollectionItem = "toCollectionItem",
}

const toCollectionItemProps: TitleInputProps = {
	id: "title",
	type: EditInputs.title,
	title: "To Collection Item Props",
};

type transformOptionsProps = typeof toCollectionItemProps;

const transformOptionsMap = new Map<string, transformOptionsProps>([
	// RSS -> Collection Specific
	[TransformOptions.toCollectionItem, toCollectionItemProps],
	// Transform Generic
]);

export const TRANSFORM_CONFIG: GenericInput = {
	id: "assignId",
	type: EditInputs.assignId,
	assignId: "id",
	input: {
		id: "id",
		type: EditInputs.objectSelect,
		label: "Conversion ID",
		required: true,
		defaultValue: TransformOptions.toCollectionItem,
		options: [TransformOptions.toCollectionItem],
		optionMap: transformOptionsMap,
	},
};
