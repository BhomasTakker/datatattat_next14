import "@testing-library/jest-dom";
import "./mock/mongo";
import "./mock/node-module-mock";

import { TextEncoder, TextDecoder } from "util";

jest.mock("./src/lib/services/intialise-services", () => {
	return {
		initialiseServices: jest.fn().mockResolvedValue(Promise.resolve()),
	};
});

Object.assign(global, { TextDecoder, TextEncoder });
