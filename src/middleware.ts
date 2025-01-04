import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_KEY } from "./config";

const ROUTES_WITHOUT_AUTH = new Set(["/login", "/signup", "/verify"]);

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const isPublicPath = ROUTES_WITHOUT_AUTH.has(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
