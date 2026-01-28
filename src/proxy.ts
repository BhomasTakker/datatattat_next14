import { NextRequest, NextResponse } from "next/server";

// We are just sending the pathname along as a header - this was a workaround
// there will be better ways to do this probably

export function proxy(request: NextRequest) {
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
