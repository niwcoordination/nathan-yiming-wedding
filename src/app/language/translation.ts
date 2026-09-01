// translations.ts
import { en } from './EN-Copy';
import { zh } from './CN-Copy';
import type { Translation } from './Language-Types';

export const languageFiles: Record<'en' | 'zh', Translation> = { en, zh };
const searchParams = new URLSearchParams(window.location.search);

// Synchronously read the active key directly from local storage
export function getActiveLanguage(): 'en' | 'zh' {
  const qsLangauge = searchParams.get("lang");
  const stored = qsLangauge?.toLowerCase() || localStorage.getItem('language')?.toLocaleLowerCase();
  return stored === 'zh' ? 'zh' : 'en';
}

// Helper function to return the full translation object
export function getTranslations(): Translation {
  const currentLang = getActiveLanguage();
  return languageFiles[currentLang];
}

// Helper function to interpolate placeholders in FAQs
export function getFAQsWithInterpolation(
  faqs: Translation['FAQS'],
  replacements: Record<string, string>
) {
  return faqs.map(faq => ({
    ...faq,
    answer: Object.entries(replacements).reduce(
      (answer, [key, value]) => answer.replace(key, value),
      faq.answer
    ),
  }));
}
