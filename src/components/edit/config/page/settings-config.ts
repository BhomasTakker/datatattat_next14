import { SwitchInputProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";

export const LIVE_CONFIG: SwitchInputProps = {
	id: "live",
	type: EditInputs.switch,
	label: "Live - Is the page searchable and visible to users?",
	defaultChecked: false,
};
