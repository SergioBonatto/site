import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'pt-BR', 'es', 'de', 'ja', 'it'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // Tenta detectar o idioma do navegador
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim());

    for (const lang of languages) {
      // Verifica correspondência exata primeiro
      if (locales.includes(lang)) {
        return lang;
      }

      // Se não encontrou exato, tenta o idioma base
      const baseLang = lang.split('-')[0];

      // Casos especiais
      if (baseLang === 'pt') return 'pt-BR';

      // Para outros idiomas, verifica se o código base está nos locales
      const matchedLocale = locales.find(locale => {
        const localeBase = locale.split('-')[0];
        return localeBase === baseLang;
      });

      if (matchedLocale) {
        return matchedLocale;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignora arquivos estáticos e API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Se é a raiz, deixa o page.tsx lidar com o redirecionamento
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Extrai o primeiro segmento do pathname (possível locale)
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  // Verifica se o primeiro segmento é um locale (válido ou não)
  if (firstSegment) {
    // Verifica se já é um locale válido
    const isValidLocale = locales.includes(firstSegment);

    if (isValidLocale) {
      // Locale válido, continua normalmente
      return NextResponse.next();
    }

    // Se não é um locale válido, tenta mapear para um locale válido
    // Extrai o código base do idioma (ex: en-US -> en, pt-PT -> pt)
    const baseLang = firstSegment.split('-')[0].toLowerCase();

    // Casos especiais: 'pt' sempre mapeia para 'pt-BR'
    if (baseLang === 'pt') {
      const restOfPath = pathSegments.slice(1).join('/');
      const newPath = `/pt-BR${restOfPath ? '/' + restOfPath : ''}`;
      const newUrl = new URL(newPath, request.url);
      console.log(`[Middleware] Redirecting ${pathname} -> ${newPath}`);
      return NextResponse.redirect(newUrl);
    }

    // Para outros idiomas, verifica se o código base está nos locales
    const matchedLocale = locales.find(locale => {
      const localeBase = locale.split('-')[0];
      return localeBase === baseLang;
    });

    if (matchedLocale) {
      const restOfPath = pathSegments.slice(1).join('/');
      const newPath = `/${matchedLocale}${restOfPath ? '/' + restOfPath : ''}`;
      const newUrl = new URL(newPath, request.url);
      console.log(`[Middleware] Redirecting ${pathname} -> ${newPath}`);
      return NextResponse.redirect(newUrl);
    }

    // Se chegou aqui e o primeiro segmento parece ser um código de idioma
    // mas não conseguimos mapear, assume que não é um locale e adiciona um
    if (firstSegment.length === 2 || firstSegment.includes('-')) {
      // Parece ser um código de idioma inválido, adiciona o locale padrão
      const locale = getLocale(request);
      const newUrl = new URL(`/${locale}${pathname}`, request.url);
      console.log(`[Middleware] Invalid locale detected, adding default locale ${locale} to ${pathname}`);
      return NextResponse.redirect(newUrl);
    }
  }

  // Se chegou aqui, não tem nenhum locale na URL
  // Detecta o locale preferido do usuário
  const locale = getLocale(request);

  // Redireciona para a URL com o locale
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  console.log(`[Middleware] Adding locale ${locale} to ${pathname}`);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
