import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

jest.mock("./src/lib/mongo/db", () => ({
	__esModule: true,
	connectToMongoDB: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("./src/models/Article", () => ({
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

jest.mock("./src/models/ArticleCollection", () => ({
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

jest.mock("./src/models/ArticleProvider", () => ({
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

jest.mock("./src/models/Header", () => ({
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

jest.mock("./src/models/Page", () => ({
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

jest.mock("./src/models/User", () => ({
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

Object.assign(global, { TextDecoder, TextEncoder });
