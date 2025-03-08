"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export const DebugComponent = () => {
	const methods = useForm();
	const debugHandler = () => {
		console.log("HOOK:FORM DEBUG", {
			values: methods.getValues(),
		});
	};

	return <Button onClick={debugHandler}>Debug</Button>;
};
