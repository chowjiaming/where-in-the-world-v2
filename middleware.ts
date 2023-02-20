import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname !== req.nextUrl.pathname.toLowerCase()) {
    const url = req.nextUrl.clone();
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
