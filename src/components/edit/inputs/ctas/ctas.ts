import { GenericInput } from "@/types/edit/inputs/inputs";
import { FC } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FaSave, FaUpload, FaCopy } from "react-icons/fa";
import { EditContextType } from "../../context/edit-context";
import { getParentId } from "@/utils/edit";

export enum Ctas {
	ComponentPreview = "componentPreview",
	SaveComponentAsTemplate = "saveComponentAsTemplate",
	LoadComponentFromTemplate = "loadComponentFromTemplate",
}

type Cta = {
	label: string;
	id: string;
	action: (
		input: GenericInput,
		methods: UseFormReturn<FieldValues, any, FieldValues>,
		context: EditContextType
	) => void;
	icon: FC;
	tooltip?: string;
};

const componentPreview: Cta = {
	label: "Component Preview",
	id: Ctas.ComponentPreview,
	tooltip: "Preview the component",
	action: (ctx, methods, context) => {
		const { setComponentPreviewData } = context;
		const { getValues } = methods;

		const parent = getParentId(ctx.id || "");
		const data = getValues(parent);

		setComponentPreviewData(data);
	},
	icon: FaCopy,
};

const saveComponentAsTemplate: Cta = {
	label: "Save Component as Template",
	id: Ctas.SaveComponentAsTemplate,
	tooltip: "Save component as template",
	action: (ctx, methods, context) => {
		const parent = getParentId(ctx.id || "");
		const { getValues } = methods;
		const data = getValues(parent);
		const { setSaveComponentAsTemplateData } = context;
		setSaveComponentAsTemplateData(data);
	},

	icon: FaSave,
};

const loadComponentFromTemplate: Cta = {
	label: "Load Component from Template",
	id: Ctas.LoadComponentFromTemplate,
	tooltip: "Load template",
	action: (ctx, methods, context) => {
		const { setShowComponentLoadTemplateModal } = context;
		setShowComponentLoadTemplateModal(true);
	},
	icon: FaUpload,
};

const ctasMap = new Map<Ctas, Cta>([
	[Ctas.ComponentPreview, componentPreview],
	[Ctas.SaveComponentAsTemplate, saveComponentAsTemplate],
	[Ctas.LoadComponentFromTemplate, loadComponentFromTemplate],
]);

export const getCtaById = (id: Ctas) => {
	return ctasMap.get(id);
};
