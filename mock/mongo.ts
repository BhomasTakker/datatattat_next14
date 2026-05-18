import "@testing-library/jest-dom";

// Mock Mongoose
jest.mock("mongoose", () => ({
	__esModule: true,
	default: {
		Types: {
			ObjectId: jest.fn().mockImplementation((id?: string) => ({
				toString: () => id ?? "507f1f77bcf86cd799439011",
			})),
		},
		Schema: {
			Types: {
				ObjectId: String,
			},
		},
		connect: jest.fn(),
	},
	isValidObjectId: jest.fn().mockReturnValue(true),
	Types: {
		ObjectId: jest.fn().mockImplementation((id?: string) => ({
			toString: () => id ?? "507f1f77bcf86cd799439011",
		})),
	},
}));

// Mock MongoDB connection
jest.mock("../src/lib/mongo/db", () => ({
	__esModule: true,
	connectToMongoDB: jest.fn().mockResolvedValue(undefined),
}));

// Mock Mongoose Models
jest.mock("../src/models/Article", () => ({
	__esModule: true,
	default: {
		find: jest.fn(),
		findOne: jest.fn(),
		findOneAndUpdate: jest.fn(),
		create: jest.fn(),
		updateOne: jest.fn(),
		deleteOne: jest.fn(),
		collection: {
			name: "Article",
		},
	},
}));

jest.mock("../src/models/ArticleCollection", () => ({
	__esModule: true,
	default: {
		find: jest.fn(),
		findOne: jest.fn(),
		findOneAndUpdate: jest.fn(),
		create: jest.fn(),
		updateOne: jest.fn(),
		deleteOne: jest.fn(),
		collection: {
			name: "ArticleCollection",
		},
	},
}));

jest.mock("../src/models/ArticleProvider", () => ({
	__esModule: true,
	default: {
		find: jest.fn(),
		findOne: jest.fn(),
		findOneAndUpdate: jest.fn(),
		create: jest.fn(),
		updateOne: jest.fn(),
		deleteOne: jest.fn(),
		collection: {
			name: "ArticleProvider",
		},
	},
}));

jest.mock("../src/models/Header", () => ({
	__esModule: true,
	default: {
		find: jest.fn(),
		findOne: jest.fn(),
		findOneAndUpdate: jest.fn(),
		create: jest.fn(),
		updateOne: jest.fn(),
		deleteOne: jest.fn(),
		collection: {
			name: "Header",
		},
	},
}));

jest.mock("../src/models/Page", () => ({
	__esModule: true,
	default: {
		find: jest.fn(),
		findOne: jest.fn(),
		findOneAndUpdate: jest.fn(),
		create: jest.fn(),
		updateOne: jest.fn(),
		deleteOne: jest.fn(),
		collection: {
			name: "Page",
		},
	},
}));

jest.mock("../src/models/User", () => ({
	__esModule: true,
	default: {
		find: jest.fn(),
		findOne: jest.fn(),
		findOneAndUpdate: jest.fn(),
		create: jest.fn(),
		updateOne: jest.fn(),
		deleteOne: jest.fn(),
		collection: {
			name: "User",
		},
	},
}));
