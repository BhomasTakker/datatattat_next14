import * as templateFunctions from "./template";
import { getServerSession } from "next-auth";
import { connectToMongoDB } from "@/lib/mongo/db";
import {
	getTemplateByKey,
	saveOrCreateTemplateByKey,
} from "@/lib/mongo/actions/user/user-templates";
import { getUserFromSessionId } from "../user/get-user";
import { Session } from "@/types/auth/session";
import { IPage } from "@/types/page";
import { ObjectId } from "mongoose";

const {
	saveTemplate,
	loadTemplate,
	getUserTemplates,
	checkTemplateNameUnique,
} = templateFunctions;

// Mock dependencies
jest.mock("next-auth", () => ({
	getServerSession: jest.fn(),
}));
jest.mock("../../lib/mongo/db", () => ({
	connectToMongoDB: jest.fn(),
}));
jest.mock("../../lib/mongo/actions/user/user-templates", () => ({
	getTemplateByKey: jest.fn(),
	saveOrCreateTemplateByKey: jest.fn(),
}));
jest.mock("../user/get-user", () => ({
	getUserFromSessionId: jest.fn(),
}));

describe("Template Actions", () => {
	const mockSession: Session = {
		user: { user_id: "123", name: "Test User", email: "test@test.com" },
	} as Session;

	const mockPage: IPage = {
		meta: {
			pageTitle: "Test Page",
			pageDescription: "Test Description",
			pageKeywords: "test, keywords",
			pageImage: "test-image.jpg",
			favIcons: [],
			showCardData: false,
			cardData: {
				title: "Test Card",
				description: "Test Card Description",
				image: "card-image.jpg",
				"image:alt": "Card Alt Text",
				locale: "en",
				site_name: "Test Site",
				url: "https://test.com",
			},
		},
		style: { color: "blue" },
		profile: {
			pageTitle: "Test Profile Title",
			pageTitleVariant: "h1",
			showPageTitle: true,
		},
		route: "/test",
		creator: "507f1f77bcf86cd799439011" as any,
		createdAt: new Date(),
		updatedAt: new Date(),
		content: {
			containerType: "Stack",
			props: {},
			components: [],
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(getServerSession as jest.Mock).mockResolvedValue(mockSession);
		(connectToMongoDB as jest.Mock).mockResolvedValue(undefined);
	});

	describe("saveTemplate", () => {
		it("should save a template successfully", async () => {
			const templateName = "test-template";
			const mockResult = { acknowledged: true };
			(saveOrCreateTemplateByKey as jest.Mock).mockResolvedValue(mockResult);

			const result = await saveTemplate(templateName, mockPage);

			expect(connectToMongoDB).toHaveBeenCalled();
			expect(getServerSession).toHaveBeenCalled();
			expect(saveOrCreateTemplateByKey).toHaveBeenCalledWith(
				templateName,
				mockPage,
				mockSession.user.user_id
			);
			expect(result).toBe(mockResult);
		});

		it("should handle database connection errors", async () => {
			const templateName = "test-template";
			const error = new Error("Database connection failed");
			(connectToMongoDB as jest.Mock).mockRejectedValue(error);

			await expect(saveTemplate(templateName, mockPage)).rejects.toThrow(
				"Database connection failed"
			);
		});

		it("should handle save operation errors", async () => {
			const templateName = "test-template";
			const error = new Error("Save failed");
			(saveOrCreateTemplateByKey as jest.Mock).mockRejectedValue(error);

			await expect(saveTemplate(templateName, mockPage)).rejects.toThrow(
				"Save failed"
			);
		});
	});

	describe("loadTemplate", () => {
		it("should load a template successfully", async () => {
			const templateName = "test-template";
			const mockTemplate = { ...mockPage, _id: "template-id" };
			(getTemplateByKey as jest.Mock).mockResolvedValue(mockTemplate);

			const result = await loadTemplate(templateName);

			expect(connectToMongoDB).toHaveBeenCalled();
			expect(getServerSession).toHaveBeenCalled();
			expect(getTemplateByKey).toHaveBeenCalledWith(
				templateName,
				mockSession.user.user_id
			);
			expect(result).toBe(mockTemplate);
		});

		it("should return null when template doesn't exist", async () => {
			const templateName = "non-existent-template";
			(getTemplateByKey as jest.Mock).mockResolvedValue(null);

			const result = await loadTemplate(templateName);

			expect(result).toBeNull();
		});

		it("should handle database connection errors", async () => {
			const templateName = "test-template";
			const error = new Error("Database connection failed");
			(connectToMongoDB as jest.Mock).mockRejectedValue(error);

			await expect(loadTemplate(templateName)).rejects.toThrow(
				"Database connection failed"
			);
		});

		it("should handle load operation errors", async () => {
			const templateName = "test-template";
			const error = new Error("Load failed");
			(getTemplateByKey as jest.Mock).mockRejectedValue(error);

			await expect(loadTemplate(templateName)).rejects.toThrow("Load failed");
		});
	});

	describe("getUserTemplates", () => {
		it("should return user templates successfully", async () => {
			const mockUser = {
				_id: "123",
				templates: {
					pages: {
						template1: mockPage,
						template2: { ...mockPage, meta: { title: "Template 2" } },
					},
				},
			};
			(getUserFromSessionId as jest.Mock).mockResolvedValue(mockUser);

			const result = await getUserTemplates();

			expect(connectToMongoDB).toHaveBeenCalled();
			expect(getServerSession).toHaveBeenCalled();
			expect(getUserFromSessionId).toHaveBeenCalledWith(
				mockSession.user.user_id
			);
			expect(result).toEqual(mockUser.templates);
		});

		it("should return empty object when user has no templates", async () => {
			const mockUser = {
				_id: "123",
				templates: undefined,
			};
			(getUserFromSessionId as jest.Mock).mockResolvedValue(mockUser);

			const result = await getUserTemplates();

			expect(result).toEqual({});
		});

		it("should handle user not found errors", async () => {
			const error = new Error("User not found");
			(getUserFromSessionId as jest.Mock).mockRejectedValue(error);

			await expect(getUserTemplates()).rejects.toThrow("User not found");
		});

		it("should handle database connection errors", async () => {
			const error = new Error("Database connection failed");
			(connectToMongoDB as jest.Mock).mockRejectedValue(error);

			await expect(getUserTemplates()).rejects.toThrow(
				"Database connection failed"
			);
		});
	});

	describe("checkTemplateNameUnique", () => {
		it("should return true when template name is unique", async () => {
			const mockUser = {
				_id: "123",
				templates: {
					pages: {
						"existing-template": mockPage,
					},
				},
			};
			(getUserFromSessionId as jest.Mock).mockResolvedValue(mockUser);

			const result = await checkTemplateNameUnique("new-template");

			expect(result).toBe(true);
		});

		it("should return false when template name already exists", async () => {
			const mockUser = {
				_id: "123",
				templates: {
					pages: {
						"existing-template": mockPage,
					},
				},
			};
			(getUserFromSessionId as jest.Mock).mockResolvedValue(mockUser);

			const result = await checkTemplateNameUnique("existing-template");

			expect(result).toBe(false);
		});

		it("should return true when user has no templates", async () => {
			const mockUser = {
				_id: "123",
				templates: {},
			};
			(getUserFromSessionId as jest.Mock).mockResolvedValue(mockUser);

			const result = await checkTemplateNameUnique("any-template");

			expect(result).toBe(true);
		});

		it("should return true when user has no pages in templates", async () => {
			const mockUser = {
				_id: "123",
				templates: {
					pages: undefined,
				},
			};
			(getUserFromSessionId as jest.Mock).mockResolvedValue(mockUser);

			const result = await checkTemplateNameUnique("any-template");

			expect(result).toBe(true);
		});

		it("should handle errors from getUserTemplates", async () => {
			const error = new Error("Failed to get user templates");
			(connectToMongoDB as jest.Mock).mockRejectedValue(error);

			await expect(checkTemplateNameUnique("test-template")).rejects.toThrow(
				"Failed to get user templates"
			);
		});
	});

	describe("Session handling", () => {
		it("should handle missing session", async () => {
			(getServerSession as jest.Mock).mockResolvedValue(null);

			await expect(saveTemplate("test", mockPage)).rejects.toThrow();
		});

		it("should handle invalid session structure", async () => {
			const invalidSession = { user: null };
			(getServerSession as jest.Mock).mockResolvedValue(invalidSession);

			await expect(saveTemplate("test", mockPage)).rejects.toThrow();
		});
	});

	describe("Edge cases", () => {
		it("should handle empty template name in saveTemplate", async () => {
			const mockResult = { acknowledged: true };
			(saveOrCreateTemplateByKey as jest.Mock).mockResolvedValue(mockResult);

			const result = await saveTemplate("", mockPage);

			expect(saveOrCreateTemplateByKey).toHaveBeenCalledWith(
				"",
				mockPage,
				mockSession.user.user_id
			);
			expect(result).toBe(mockResult);
		});

		it("should handle special characters in template name", async () => {
			const specialName = "test-template_123!@#";
			const mockResult = { acknowledged: true };
			(saveOrCreateTemplateByKey as jest.Mock).mockResolvedValue(mockResult);

			const result = await saveTemplate(specialName, mockPage);

			expect(saveOrCreateTemplateByKey).toHaveBeenCalledWith(
				specialName,
				mockPage,
				mockSession.user.user_id
			);
			expect(result).toBe(mockResult);
		});

		it("should handle user with empty templates object", async () => {
			const mockUser = {
				_id: "123",
				templates: {
					pages: {},
				},
			};
			(getUserFromSessionId as jest.Mock).mockResolvedValue(mockUser);

			const result = await checkTemplateNameUnique("any-name");

			expect(result).toBe(true);
		});

		it("should handle getUserFromSessionId returning user without templates property", async () => {
			const mockUser = {
				_id: "123",
				// no templates property
			};
			(getUserFromSessionId as jest.Mock).mockResolvedValue(mockUser);

			const result = await getUserTemplates();

			expect(result).toEqual({});
		});
	});
});
