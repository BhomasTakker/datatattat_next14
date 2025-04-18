import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	const pathname = request.nextUrl.pathname;
	const isStaticRoute = pathname.startsWith("/_next/static/");
	// const isUserRoute = pathname.startsWith("/user/");
	// filter for actual routes

	if (isStaticRoute) {
		// don't do anything for static routes
		return NextResponse.next();
	}

	requestHeaders.set("x-pathname", request.nextUrl.pathname);

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}
