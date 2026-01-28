import { NextRequest } from "next/server";
import { proxy } from "./proxy";

type MockRequest = {
	headers: Headers;
	nextUrl?: {
		pathname: string;
	};
};

type MockResponse = {
	request: MockRequest;
	mockedValue: boolean;
};

jest.mock("next/server", () => {
	return {
		__esModule: true,
		NextRequest: {
			next: jest.fn(),
		},
		NextResponse: {
			next: jest.fn((request?: MockResponse) => ({
				mockedValue: true,
				...request,
			})),
		},
	};
});

const headersSetMock = jest
	.spyOn(Headers.prototype, "set")
	.mockImplementation((str: string, val: string) => {
		console.log("mocked function");
	});

describe("proxy", () => {
	it("should set the x-pathname header for non-static routes", () => {
		const mockRequest = {
			headers: new Headers(),
			nextUrl: {
				pathname: "/some/route",
			},
		};

		proxy(mockRequest as NextRequest) as unknown as MockResponse;

		expect(headersSetMock).toHaveBeenCalledTimes(1);
		expect(headersSetMock).toHaveBeenCalledWith(
			"x-pathname",
			mockRequest.nextUrl.pathname,
		);
	});

	it("should return mocked response", () => {
		const mockRequest = {
			headers: new Headers(),
			nextUrl: {
				pathname: "/some/route",
			},
		};

		const response = proxy(
			mockRequest as NextRequest,
		) as unknown as MockResponse;

		expect(response.mockedValue).toBe(true);
	});

	it("should not set the x-pathname header for static routes", () => {
		const mockRequest = {
			headers: new Headers(),
			nextUrl: {
				pathname: "/_next/static/some/route",
			},
		};

		const response = proxy(mockRequest as NextRequest);

		expect(response).toEqual({
			mockedValue: true,
		});
	});
});
