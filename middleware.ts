import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname) ||
        url.pathname.startsWith('/_next') ||
        url.pathname.endsWith('.txt')  || // example = /robots.txt
        url.pathname.endsWith('.ico') ||   //example = /favicon.ico
        url.pathname.startsWith('/files')  // public files
    ){
        return NextResponse.next()
    }
    if (req.nextUrl.locale === 'default') {
        const locale = process.env.DEFAULT_LANG || 'fa'
        return NextResponse.redirect(
            new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        )
    }
    const Locale = url.locale==='default'?process.env.DEFAULT_LANG || 'fa':url.locale
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('lang', Locale)
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
    response.cookies.set('lang',Locale)
    return response
}