import { SelectInputProps, SwitchInputProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";

// If a User page this will be User
// i.e. we wouldn't allow the option
export const TYPE_CONFIG: SelectInputProps = {
	id: "pageType",
	type: EditInputs.select,
	label: "Page Type",
	required: true,
	defaultValue: "Content",
	options: ["Content", "User", "Landing"],
};

export const LIVE_CONFIG: SwitchInputProps = {
	id: "live",
	type: EditInputs.switch,
	label: "Live - Is the page searchable and visible to users?",
	defaultChecked: false,
};
