"use client";

import {useI18n} from "@/components/I18nProvider";

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useI18n();

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => changeLocale(e.target.value)}
      className="border rounded-2xl border-gray-200 px-2 py-1 mr-8"
    >
      <option value="en">🇬🇧 EN</option>
      <option value="fr">🇫🇷 FR</option>
    </select>
  );
}
