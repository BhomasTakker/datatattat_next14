import { GenericInput } from "@/types/edit/inputs/inputs";
import { FC } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FaAccusoft, FaAirbnb } from "react-icons/fa";

export enum Ctas {
	Button1 = "button1",
	Button2 = "button2",
}

type Cta = {
	label: string;
	id: string;
	action: (
		context: GenericInput,
		methods: UseFormReturn<FieldValues, any, FieldValues>
	) => void;
	icon: FC;
};

const button1: Cta = {
	label: "Button 1",
	id: Ctas.Button1,
	action: (ctx, methods) =>
		console.log("Button 1 clicked", { ctx, example: methods.getValues() }),
	icon: FaAccusoft,
};

const button2: Cta = {
	label: "Button 2",
	id: Ctas.Button2,
	action: (ctx, methods) =>
		console.log("Button 2 clicked", { ctx, example: methods.getValues() }),
	icon: FaAirbnb,
};

const ctasMap = new Map<Ctas, Cta>([
	[Ctas.Button1, button1],
	[Ctas.Button2, button2],
]);

export const getCtaById = (id: Ctas) => {
	return ctasMap.get(id);
};
