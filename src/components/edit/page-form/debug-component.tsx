"use client";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { EditContext } from "../context/edit-context";

export const DebugComponent = () => {
	console.log("HOOK:FORM RENDER: DebugComponent");
	const { handleSubmit } = useFormContext();
	const { submitDebugHandler } = useContext(EditContext);

	return (
		<Button
			onClick={() => {
				console.log("HOOK:FORM How so??");
				if (submitDebugHandler) {
					handleSubmit(submitDebugHandler)();
				}
			}}
		>
			Debug
		</Button>
	);
};
