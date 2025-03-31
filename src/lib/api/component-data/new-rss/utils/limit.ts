const ITEMS_LIMIT = 50;
export const filterLimit = (items: any[]) => {
	if (items.length > ITEMS_LIMIT) {
		return items.slice(0, ITEMS_LIMIT);
	}
	return items;
};
