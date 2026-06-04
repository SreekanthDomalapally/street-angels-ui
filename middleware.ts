import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/welcome", "/api/auth/login", "/api/auth/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("sa_session")?.value;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = session ? "/home" : "/welcome";
    return NextResponse.redirect(url);
  }

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth/login") || pathname.startsWith("/api/auth/register")) {
    return NextResponse.next();
  }

  const isProtectedPage =
    pathname.startsWith("/home") ||
    pathname.startsWith("/emergency") ||
    pathname.startsWith("/contacts") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin");

  const isProtectedApi =
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/auth/login") &&
    !pathname.startsWith("/api/auth/register");

  if ((isProtectedPage || isProtectedApi) && !session) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/welcome";
    return NextResponse.redirect(url);
  }

  if (pathname === "/welcome" && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/welcome", "/home/:path*", "/emergency/:path*", "/contacts/:path*", "/profile/:path*", "/admin/:path*", "/api/:path*"],
};
