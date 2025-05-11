import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
	const { nextUrl, auth } = req;
	const isLoggedIn = !!auth;
	const path = nextUrl.pathname;

	// Public routes that don't require authentication
	const isPublicRoute =
		path === "/" || path === "/auth/login" || path === "/auth/register";

	// Auth routes that logged in users should be redirected from
	const isAuthRoute = path === "/auth/login" || path === "/auth/register";

	// If user is logged in and trying to access auth routes, redirect to /chat
	if (isLoggedIn && isAuthRoute) {
		return NextResponse.redirect(new URL("/chat", nextUrl));
	}

	// If user is not logged in and trying to access protected routes, redirect to login
	if (!isLoggedIn && !isPublicRoute) {
		return NextResponse.redirect(new URL("/auth/login", nextUrl));
	}

	// Otherwise, allow the request to proceed
	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
