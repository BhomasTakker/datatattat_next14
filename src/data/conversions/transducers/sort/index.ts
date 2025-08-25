// use export * from 'xxx';
// We would expect a lot maybe?

import { sortTransducer } from "../transducers";

export const createDateSortTransducer = <T>({
	id,
	type,
}: {
	id: Partial<keyof T>;
	type: "ascending" | "descending";
}) =>
	sortTransducer<T>((a, b) => {
		return type === "ascending"
			? Date.parse(String(a[id])) - Date.parse(String(b[id]))
			: Date.parse(String(b[id])) - Date.parse(String(a[id]));
	});
