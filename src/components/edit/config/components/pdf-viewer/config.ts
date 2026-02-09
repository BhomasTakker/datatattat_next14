import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const PDF_VIEWER_CONFIG: InputListProps = {
	id: "pdfViewer",
	type: EditInputs.inputList,
	label: "PDF Viewer",
	inputs: [
		{
			id: "pdfViewerTitle",
			type: EditInputs.title,
			title: "PDF Viewer",
		},
		{
			id: "pdfUrl",
			type: EditInputs.url,
			label: "PDF URL",
			required: true,
		},
		{
			id: "pageNumber",
			type: EditInputs.number,
			label: "Initial Page Number",
			defaultValue: 1,
			min: 1,
		},
	],
};
