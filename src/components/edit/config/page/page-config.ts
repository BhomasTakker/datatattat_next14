import { GenericInput } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";
import { COMPONENT_CONFIG } from "../components/component-config";
import { PAGE_GRID_CONFIG } from "./components/page-grid";
import { PAGE_STACK_CONFIG } from "./components/stack/page-stack";

enum pageContainers {
	STACK = "Stack",
	GRID = "Grid",
}

type pageContainersProps = typeof PAGE_STACK_CONFIG | typeof PAGE_GRID_CONFIG;

const pageContainersMap = new Map<string, pageContainersProps>([
	[pageContainers.STACK, PAGE_STACK_CONFIG],
	[pageContainers.GRID, PAGE_GRID_CONFIG],
]);

export const PAGE_CONFIG: GenericInput = {
	// id used will be content
	id: "page",
	type: EditInputs.inputList,
	label: "Page",

	inputs: [
		{
			// add button here to save as page template - no we would want to save meta and page properties too no?
			// add button here to demo page
			id: "title",
			type: EditInputs.title,
			title: "Add Page interaction buttons here",
		},
		{
			id: "containerType",
			type: EditInputs.objectSelect,
			label: "Page Container",
			defaultValue: pageContainers.STACK,
			required: true,
			options: [pageContainers.STACK],
			optionMap: pageContainersMap,
			// save to/create on props object
			optionId: "props",
		},
		COMPONENT_CONFIG,
	],
};
