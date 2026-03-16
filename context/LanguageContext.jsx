"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // "en" | "am"

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (saved === "en" || saved === "am") {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang) => {
    const next = lang === "am" ? "am" : "en";
    setLanguage(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", next);
    }
  };

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "am" : "en");
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

