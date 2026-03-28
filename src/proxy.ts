import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Add X-Robots-Tag: noindex, nofollow to all /p/* responses.
 * This is the HTTP-level enforcement — works even if the page metadata
 * is misconfigured, and is respected by all major crawlers.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/p/:path*"],
};
