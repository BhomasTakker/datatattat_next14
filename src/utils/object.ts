/**
 * Clone using json parse & stringify
 *
 * @param obj Object to clone
 * @returns Cloned Object
 * @WARN Inherent issues cloning objects like this
 */

import { UnknownObject } from "@/types/utils";

// TYPE:- use type or generic - which is better
export const cloneDeepSerializable = (obj: UnknownObject | unknown[]) => {
	return JSON.parse(JSON.stringify(obj));
};

/**
 * Clone given object including all children
 * @param obj - any/unknown
 * @returns cloned object
 * @note Uses structuredClone
 * @note Fallbacks to cloneDeepSerializable if no structuredClone
 */
export const cloneDeep = (obj: UnknownObject | unknown[]) => {
	if (!obj) return obj;
	// return cloneDeepSerializable(obj);
	// node 17
	return structuredClone ? structuredClone(obj) : cloneDeepSerializable(obj);
};
