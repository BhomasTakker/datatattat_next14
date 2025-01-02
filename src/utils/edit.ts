import { FieldValues } from "react-hook-form";

/**
 * @param id - edit object id path - diliminated by '.'
 * @returns - The parent object path of the given object id
 */
export const getParentId = (id: string) => {
	const idAsArray = id.split(".");
	const newIdAsArray = idAsArray.splice(0, idAsArray.length - 1);
	return newIdAsArray.join(".");
};
// Just simple math random uuid?
export const randomKeyGenerator = () => {
	return Math.random().toString(36).substring(7);
};

////////////////
// form utils?
export const createLinks = (header: FieldValues) => {
	const headerKeys = Object.keys(header);
	const labels = headerKeys.filter((key) => key.includes("label"));
	const routes = headerKeys.filter((key) => key.includes("route"));

	// Again copilot is being a bit too helpful here
	return labels.map((label, index) => ({
		label: header[label],
		route: header[routes[index]],
	}));
};
