import { TextInputProps } from "@/types/edit/inputs/inputs";
import { InputFactory } from "../input-factory";
import { EditInputs } from "../inputs";

export const createIdentifier = (id: string) => {
	const inputOptions: TextInputProps = {
		id: `${id}.identifier`,
		type: EditInputs.text,
		label: "",
		defaultValue: "Array Item",
	};
	return <InputFactory data={inputOptions} />;
};
