"use client";

import {createContext, useContext, useEffect, useMemo, useState} from "react";
import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";

const I18nContext = createContext(null);

const DICTS = { en, fr };
const DEFAULT_LOCALE = "en";

export default function I18nProvider({children}) {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [messages, setMessages] = useState(DICTS[DEFAULT_LOCALE]);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    const nextLocale = saved && DICTS[saved] ? saved : DEFAULT_LOCALE;
    setLocale(nextLocale);
    setMessages(DICTS[nextLocale]);
  }, []);

  const value = useMemo(() => {
    const t = (key, fallback) => {
      const parts = key.split(".");
      let cur = messages;
      for (const p of parts) {
        if (cur && typeof cur === "object" && p in cur) cur = cur[p];
        else return fallback ?? key;
      }
      return typeof cur === "string" ? cur : (fallback ?? key);
    };

    const changeLocale = (next) => {
      if (!DICTS[next]) return;
      setLocale(next);
      setMessages(DICTS[next]);
      if (typeof window !== "undefined") localStorage.setItem("locale", next);
    };

    return { locale, t, changeLocale };
  }, [locale, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}