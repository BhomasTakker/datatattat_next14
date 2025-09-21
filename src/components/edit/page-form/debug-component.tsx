"use client";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { EditContext } from "../context/edit-context";

export const DebugComponent = () => {
	const { handleSubmit } = useFormContext();
	const { submitDebugHandler } = useContext(EditContext);

	return (
		<Button
			onClick={() => {
				if (submitDebugHandler) {
					handleSubmit(submitDebugHandler)();
				}
			}}
		>
			Debug
		</Button>
	);
};
