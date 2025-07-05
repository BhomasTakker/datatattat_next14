import { getPageOrNew, getCurrentHeader } from "./edit";
import * as pageActions from "../../../actions/page/page-actions";
import * as headerActions from "@/actions/header/get-header";
import * as nextAuth from "next-auth";
import { PATHS } from "@/lib/routing/paths";

jest.mock("../../../actions/page/page-actions");
jest.mock("../../../actions/header/get-header");
jest.mock("next-auth");

const mockSession = {
	user: { user_id: "test-user-id" },
};

describe("edit.ts", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(nextAuth.getServerSession as jest.Mock).mockResolvedValue(mockSession);
	});

	describe("getPageOrNew", () => {
		it("returns page if getPage succeeds", async () => {
			const pageData = { route: "/test", content: "content" };
			(pageActions.getPage as jest.Mock).mockResolvedValue(pageData);

			const result = await getPageOrNew("/test");
			expect(result).toBe(pageData);
			expect(pageActions.getPage).toHaveBeenCalledWith("/test");
		});

		it("returns new page object if getPage throws", async () => {
			(pageActions.getPage as jest.Mock).mockRejectedValue(
				new Error("Not found")
			);

			const result = await getPageOrNew("/new-route");
			expect(result).toEqual({
				creator: "test-user-id",
				route: "/new-route",
				content: undefined,
				meta: undefined,
				profile: undefined,
			});
		});
	});

	describe("getCurrentHeader", () => {
		it("returns main header if route is home", async () => {
			const mainHeader = { route: "/", nav: [] };
			(headerActions.getMainHeader as jest.Mock).mockResolvedValue(mainHeader);

			const result = await getCurrentHeader(PATHS.home());
			expect(result).toBe(mainHeader);
			expect(headerActions.getMainHeader).toHaveBeenCalled();
		});

		it("returns first subheader if header route is not empty", async () => {
			const subHeaders = [{ route: "/sub", nav: ["a"] }];
			(headerActions.getSubHeaders as jest.Mock).mockResolvedValue(subHeaders);

			const result = await getCurrentHeader("/sub");
			expect(result).toBe(subHeaders[0]);
			expect(headerActions.getSubHeaders).toHaveBeenCalledWith("/sub");
		});

		it("returns new header data if header route is empty", async () => {
			const subHeaders = [{ route: "", nav: [] }];
			(headerActions.getSubHeaders as jest.Mock).mockResolvedValue(subHeaders);

			const result = await getCurrentHeader("/empty");
			expect(result).toEqual({
				route: "/empty",
				creator: "test-user-id",
				nav: [],
			});
		});
	});
});
