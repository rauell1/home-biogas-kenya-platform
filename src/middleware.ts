import { NextResponse, type NextRequest } from "next/server";

/**
 * Hosts allowed to embed the application (preview and deployment platforms).
 * Everything else is still blocked by the frame-ancestors directive.
 */
const FRAME_ANCESTORS = ["'self'", "https://*.arena.site", "https://*.e2b.app", "https://*.vercel.app"].join(" ");

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(self)",
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; font-src 'self' data:; connect-src 'self' https:; " +
    `frame-ancestors ${FRAME_ANCESTORS}; base-uri 'self'; form-action 'self'`,
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("hbk_session");
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/sign-in";
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(key, value);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
