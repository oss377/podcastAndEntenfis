"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-full text-xs font-semibold border border-brand-700 text-brand-900 dark:text-brand-300 dark:border-brand-500 bg-white/80 dark:bg-dark-card hover:bg-brand-700 hover:text-white dark:hover:bg-brand-600 transition-colors"
      aria-label="Toggle language"
    >
      {language === "en" ? "አማ" : "EN"}
    </button>
  );
}

