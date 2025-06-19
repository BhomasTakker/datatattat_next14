import "@testing-library/jest-dom";
import "./mock/mongo";

import { TextEncoder, TextDecoder } from "util";

// add these mocks to a file external to this
// and order/structure appropriately
jest.mock("cheerio", () => {
	return {
		__esModule: true,
		load: jest.fn((str) => ({
			text: jest.fn(() => str),
		})),
	};
});

jest.mock("./src/lib/services/intialise-services", () => {
	return {
		initialiseServices: jest.fn().mockResolvedValue(Promise.resolve()),
	};
});

Object.assign(global, { TextDecoder, TextEncoder });
