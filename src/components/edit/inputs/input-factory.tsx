import { UnknownObject } from "@/types/utils";
import { EditInputs, inputMap } from "./inputs";

// We need to properly create types for inputs
// A whole lot of conditional types
// based on input type
type GenericInputProps = {
	type: string;
} & UnknownObject;

interface InputFactoryProps {
	data: GenericInputProps;
}

export const InputFactory = ({ data }: InputFactoryProps) => {
	const { type } = data;
	// can we pass the props type?
	const Component = inputMap.get(type as EditInputs); // Error component

	if (!Component) {
		// log warning
		return null;
	}
	// console.log("This is us", { data });
	// Need protection - incorrect type will fully blow up
	// Should perhaps pass an object?
	// @ts-expect-error - data needs typingFIX ME
	return <Component {...(data as UnknownObject)} />;
};
