import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Only redirect in production (when host is thetutorbridge.com)
  if (hostname === 'thetutorbridge.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.thetutorbridge.com';

    // Use 308 permanent redirect for non-www to www
    return NextResponse.redirect(url, { status: 308 });
  }

  return NextResponse.next();
}

// Configure which routes should be processed by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
