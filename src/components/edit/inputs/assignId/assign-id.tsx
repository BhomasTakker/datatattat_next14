import { AssignInputIdProps } from "@/types/edit/inputs/inputs";
import { InputFactory } from "../input-factory";
import { getParentId } from "@/utils/edit";

// call it subObject?
// Just a wrapper input to 'force' an id or subObject
export const AssignInputId = ({
	id,
	input,
	assignId,
	useParent,
}: AssignInputIdProps) => {
	const idToUse = useParent ? getParentId(id) : id;
	if (!input?.type) {
		return null;
	}
	return <InputFactory data={{ ...input, id: `${idToUse}.${assignId}` }} />;
};
