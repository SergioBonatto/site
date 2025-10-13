export type LanguageCode = 'pt-BR' | 'en' | 'es' | 'de' | 'ja' | 'it' | 'web';

export type TranslationKeys = {
  // Navigation
  'nav.home': string;
  'nav.blog': string;
  'nav.about': string;
  'nav.projects': string;
  'nav.login': string;
  'nav.experience': string;

  // About Section
  'about.title': string;
  'about.description': string;
  'about.imageAlt': string;
  'about.paragraph1': string;
  'about.paragraph2': string;
  'about.paragraph3': string;
  'about.paragraph4': string;
  'about.paragraph5': string;
  'about.paragraph6': string;

  // Blog Section
  'blog.title': string;
  'blog.description': string;
  'blog.readMore': string;
  'blog.backToBlog': string;
  'blog.postsTitle': string;
  'blog.noPosts': string;
  'blog.notFound': string;
  'blog.notFoundDescription': string;

  // Projects Section
  'projects.title': string;
  'projects.description': string;
  'projects.phi.title': string;
  'projects.phi.description': string;
  'projects.treeson.title': string;
  'projects.treeson.description': string;
  'projects.flowcash.title': string;
  'projects.flowcash.description': string;
  'projects.kind.title': string;
  'projects.kind.description': string;
  'projects.agdavim.title': string;
  'projects.agdavim.description': string;
  'projects.agoriz.title': string;
  'projects.agoriz.description': string;

  // Experience Section
  'experience.title': string;
  'experience.description': string;
  'experience.skills.title': string;
  'experience.skills.description': string;
  'experience.education.title': string;
  'experience.education.description': string;
  'experience.education.autodidact': string;
  'experience.education.subtitle': string;
  'experience.education.details': string;

  // Footer
  'footer.rights': string;
  'footer.madeWith': string;

  // Common
  'common.loading': string;
  'common.error': string;
  'common.notFound': string;

  // Theme
  'theme.light': string;
  'theme.dark': string;
  'theme.toggle': string;
};

export type Translations = {
  [K in LanguageCode]: TranslationKeys;
};
