export const isStringValidURL = (s: string) => {
	try {
		new URL(s);
		return true;
	} catch (err) {
		console.error("Given string is not a valid url", err);
		return false;
	}
};
