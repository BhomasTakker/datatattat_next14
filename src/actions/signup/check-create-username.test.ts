import { checkAndCreateUsername } from "./check-create-username";
import * as checkUsernameModule from "./check-username";
import * as mathUtils from "@/utils/math";

jest.mock("./check-username");
jest.mock("../../utils/math");

jest.mock("../../actions/user/get-user", () => ({
	getUser: jest.fn(),
}));

describe("checkAndCreateUsername", () => {
	const mockIsUsernameUnique =
		checkUsernameModule.isUsernameUnique as jest.Mock;
	const mockRandomThreeDigits = mathUtils.randomThreeDigits as jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns the username if it is unique", async () => {
		mockIsUsernameUnique.mockResolvedValueOnce(true);

		const result = await checkAndCreateUsername("testuser");

		expect(mockIsUsernameUnique).toHaveBeenCalledWith("testuser");
		expect(result).toBe("testuser");
	});

	it("appends random digits and retries if username is not unique", async () => {
		mockIsUsernameUnique
			.mockResolvedValueOnce(false) // first try: not unique
			.mockResolvedValueOnce(true); // second try: unique

		mockRandomThreeDigits.mockReturnValueOnce("123");

		const result = await checkAndCreateUsername("testuser");

		expect(mockIsUsernameUnique).toHaveBeenNthCalledWith(1, "testuser");
		expect(mockRandomThreeDigits).toHaveBeenCalled();
		expect(mockIsUsernameUnique).toHaveBeenNthCalledWith(2, "testuser-123");
		expect(result).toBe("testuser-123");
	});

	it("retries multiple times if needed", async () => {
		mockIsUsernameUnique
			.mockResolvedValueOnce(false) // testuser
			.mockResolvedValueOnce(false) // testuser-111
			.mockResolvedValueOnce(true); // testuser-222

		mockRandomThreeDigits.mockReturnValueOnce("111").mockReturnValueOnce("222");

		const result = await checkAndCreateUsername("testuser");

		expect(mockIsUsernameUnique).toHaveBeenNthCalledWith(1, "testuser");
		expect(mockIsUsernameUnique).toHaveBeenNthCalledWith(2, "testuser-111");
		expect(mockIsUsernameUnique).toHaveBeenNthCalledWith(3, "testuser-111-222");
		expect(result).toBe("testuser-111-222");
	});
});
