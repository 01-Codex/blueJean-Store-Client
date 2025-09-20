"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

const HomeScreen = () => {
  const { t } = useI18n();

  return (
    <section className="relative isolate h-screen w-full overflow-hidden bg-[#DADADA]">
      <Image
        src="/home-bg.png"
        alt="Jeans"
        fill
        priority
        sizes="100vw"
        className="z-0 select-none"
        style={{
          objectFit: "contain",
          objectPosition: "center bottom",
          backgroundColor: "#DADADA",
        }}
      />

      <div className="relative z-10 flex flex-col items-start gap-6 px-6 pt-24
                      sm:px-8 md:px-12 lg:px-20
                      md:flex-row md:items-center md:justify-between">
        <h1 className="font-extrabold leading-[0.95] tracking-tight
                       text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px]
                       text-[#555] max-w-[90%] md:max-w-none">
          {t("Home.NEWARRIVALS")}
        </h1>

        <Link
          href="/store"
          className="rounded-full bg-black px-6 py-3 sm:px-8 sm:py-4
                     text-base sm:text-lg font-semibold text-white
                     shadow-[0_8px_22px_rgba(0,0,0,0.25)]
                     hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          {t("Home.Shopnow")}
        </Link>
      </div>

      <div className="relative z-10 px-6 mt-6 sm:px-8 md:px-12 lg:px-20 md:mt-8">
        <p className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px]
                      font-medium text-[#6A6A6A] max-w-[90%] md:max-w-none">
          {t("Home.discover")}
        </p>
      </div>
    </section>
  );
};

export default HomeScreen;
