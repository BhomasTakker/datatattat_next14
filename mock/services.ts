jest.mock("../src/lib/services/intialise-services", () => {
	return {
		initialiseServices: jest.fn().mockResolvedValue(Promise.resolve()),
	};
});
