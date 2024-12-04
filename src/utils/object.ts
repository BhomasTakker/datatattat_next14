/**
 * Clone using json parse & stringify
 *
 * @param obj Object to clone
 * @returns Cloned Object
 * @WARN Inherent issues cloning objects like this
 */

// TYPE:- use type or generic - which is better
export const cloneDeepSerializable = (obj: unknown) => {
	return JSON.parse(JSON.stringify(obj));
};

/**
 * Clone given object including all children
 * @param obj - any/unknown
 * @returns cloned object
 * @note Uses structuredClone
 * @note Fallbacks to cloneDeepSerializable if no structuredClone
 */
export const cloneDeep = (obj: unknown) => {
	if (!obj) return obj;
	// return cloneDeepSerializable(obj);
	// node 17
	return structuredClone ? structuredClone(obj) : cloneDeepSerializable(obj);
};

/**
 * Object Utils: get nested value
 ****
 * @param key - The nested object key using dot notation
 ****
 * @param obj - The object
 * @returns Object key value
 ****
 * @WARNING returns whole or partial object rather than null if no object key found / UPDATE return null
 */
export const getNestedValue = <T>(
	key: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	object: any,
	delim: string = "."
) => {
	if (!object) return object;

	const nestedKeys = key.split(delim);
	let value = object;
	const len = nestedKeys.length;
	for (let i = 0; i < len; i++) {
		value = value[nestedKeys[i]];
		if (!value) return null;
	}
	// This is a bit hacky
	// return could be given object
	return value as T;
};
