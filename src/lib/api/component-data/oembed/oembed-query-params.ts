export const createQueryParameters = (): string => {
	const params = new URLSearchParams();
	params.set("omit_script", "1");
	return params.toString();
};
