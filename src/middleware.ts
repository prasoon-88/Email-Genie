import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_KEY } from "./config";

const clearCookiesAndRediect = (request: NextRequest, url: string) => {
  const response = NextResponse.redirect(new URL(url, request.url));
  return response;
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;
  if (!token) {
    return clearCookiesAndRediect(request, "/login");
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/app/:path*",
};
