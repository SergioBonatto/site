# Como usar o i18n

## Configuração Inicial

### 1. Adicionar o I18nProvider no layout principal

Edite o arquivo `src/app/layout.tsx` e envolva seus componentes com o `I18nProvider`:

```tsx
import { I18nProvider } from '@/i18n';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <I18nProvider defaultLanguage="pt-BR">
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Usar traduções em componentes

#### Hook useTranslation (recomendado para componentes que só precisam de traduções)

```tsx
'use client';

import { useTranslation } from '@/i18n';

export function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>{t('about.description')}</p>
    </div>
  );
}
```

#### Hook useI18n (para componentes que precisam de mais controle)

```tsx
'use client';

import { useI18n } from '@/i18n';

export function MyComponent() {
  const { t, language, setLanguage } = useI18n();

  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <button onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}>
        {language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
      </button>
    </div>
  );
}
```

#### Hook useLanguage (apenas para controle de idioma)

```tsx
'use client';

import { useLanguage } from '@/i18n';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value as any)}>
      <option value="pt-BR">Português</option>
      <option value="en">English</option>
    </select>
  );
}
```

### 3. Traduções com parâmetros

```tsx
// Adicione na src/i18n/translations.ts:
'welcome.message': 'Olá, {{name}}! Bem-vindo ao {{site}}',

// Use no componente:
const { t } = useTranslation();
const message = t('welcome.message', { name: 'João', site: 'meu site' });
// Resultado: "Olá, João! Bem-vindo ao meu site"
```

### 4. Adicionar novas traduções

Edite `src/i18n/translations.ts`:

```tsx
export const translations: Translations = {
  'pt-BR': {
    // ... traduções existentes
    'myNew.key': 'Minha nova tradução',
  },
  en: {
    // ... traduções existentes
    'myNew.key': 'My new translation',
  },
};
```

Atualize também o tipo em `src/i18n/types.ts`:

```tsx
export type TranslationKeys = {
  // ... chaves existentes
  'myNew.key': string;
};
```

### 5. Usar o componente LanguageToggle

Adicione o botão de trocar idioma na sua navegação:

```tsx
import { LanguageToggle } from '@/components/LanguageToggle';

export function Nav() {
  return (
    <nav>
      {/* ... outros itens de navegação ... */}
      <LanguageToggle />
    </nav>
  );
}
```

## Exemplos Práticos

### Exemplo 1: Atualizar a navegação desktop

```tsx
// src/components/Nav/DesktopNav.tsx
'use client';

import React from "react";
import { useTranslation } from "@/i18n";
import { useThemeContext } from "../Theme/ThemeProvider";
import { ThemeToggle } from "../Theme/ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";

export function DesktopNav() {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const links = [
    { href: "/", label: t('nav.home') },
    { href: "/blog", label: t('nav.blog') },
    { href: "/#about", label: t('nav.about') },
    { href: "/#projects", label: t('nav.projects') },
    { href: "/login", label: t('nav.login') },
  ];

  return (
    <nav>
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
      <ThemeToggle />
      <LanguageToggle />
    </nav>
  );
}
```

### Exemplo 2: Usar no About

```tsx
// src/components/About/About.tsx
'use client';

import { useTranslation } from '@/i18n';

export function About() {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t('about.title')}</h2>
      <p>{t('about.description')}</p>
    </section>
  );
}
```

## Vantagens desta implementação

1. **Funcional e Composable**: Usa programação funcional pura com `pipe`
2. **Type-safe**: TypeScript garante que as chaves de tradução existem
3. **Performance**: Usa `useMemo` e `useCallback` para otimizar re-renders
4. **Persistência**: Salva a preferência de idioma no localStorage
5. **Server-Side Ready**: Funciona tanto no cliente quanto no servidor
6. **Extensível**: Fácil adicionar novos idiomas e traduções

## Estrutura de arquivos

```
src/
├── i18n/
│   ├── index.ts           # Exports públicos
│   ├── i18n.ts           # Classe I18n e createTranslator
│   ├── I18nContext.tsx   # Context e hooks React
│   ├── translations.ts   # Traduções pt-BR e en
│   └── types.ts          # TypeScript types
├── utils/
│   └── functional.ts     # Utilitários funcionais (pipe, compose, etc)
└── components/
    └── LanguageToggle/
        ├── index.ts
        └── LanguageToggle.tsx
```
