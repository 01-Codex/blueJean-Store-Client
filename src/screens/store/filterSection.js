"use client";

import { useMemo } from "react";
import Accordion from "@/components/accordion";
import PriceRangeSlider from "@/components/priceRangeSlider";
import { objectToQueryString } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";

const FilterSection = ({ searchParams, productTypes }) => {
  const { t } = useI18n();

  const SortByItems = [
    { label: t("FilterSection.all"), value: "all" },
    { label: t("FilterSection.priceHighToLow"), value: "-sellPrice" },
    { label: t("FilterSection.priceLowToHigh"), value: "sellPrice" },
  ];
  const RatingItems = [
    { label: t("FilterSection.all"), value: "all" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];
  const AvailabilityItems = [
    { label: t("FilterSection.all"), value: "all" },
    { label: t("FilterSection.inStock"), value: "true" },
    { label: t("FilterSection.outOfStock"), value: "false" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const productTypeId = sp.get("productTypeId") ?? searchParams?.productTypeId ?? "all";
  const sortBy       = sp.get("sortBy")       ?? searchParams?.sortBy       ?? "all";
  const rating       = sp.get("rating")       ?? searchParams?.rating       ?? "all";
  const inStock      = sp.get("inStock")      ?? searchParams?.inStock      ?? "all";
  const minPrice     = sp.get("minPrice")     ?? searchParams?.minPrice     ?? "0";
  const maxPrice     = sp.get("maxPrice")     ?? searchParams?.maxPrice     ?? "100";

  const openAccordion =
    (sp.get("openAccordion") ?? searchParams?.openAccordion ?? "")
      .split(",")
      .filter(Boolean);

  const pushQuery = (patchObj) => {
    const curr = Object.fromEntries(sp.entries());
    const next = { ...curr };

    Object.entries(patchObj).forEach(([k, v]) => {
      const s = v == null ? "" : String(v);
      if (!s || s === "all") delete next[k];
      else next[k] = s;
    });

    const qs = objectToQueryString(next);
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const resetAll = () => {
    pushQuery({
      productTypeId: "all",
      sortBy: "all",
      rating: "all",
      inStock: "all",
      minPrice: "all",
      maxPrice: "all",
    });
  };

  const handleAccordion = (value) => {
    const set = new Set(openAccordion);
    set.has(value) ? set.delete(value) : set.add(value);
    const joined = Array.from(set).join(",");
    pushQuery({ openAccordion: joined || null });
  };

  const handlePriceRangeChange = (value) => {
    pushQuery({ minPrice: value[0], maxPrice: value[1] });
  };

  const handleFilterChange = (filterType, value) => {
    if (value === "all") {
      resetAll();
      return;
    }
    pushQuery({ [filterType]: value });
  };

  const normalizedTypes = useMemo(() => {
    const seen = new Set();
    const list = (productTypes ?? [])
      .map(it => ({
        label: String(it.label ?? it.name ?? "").trim(),
        value: String(it.value ?? it.id ?? "").trim(),
      }))
      .filter(it => it.value)
      .filter(it => {
        if (it.value.toLowerCase() === "all") return false;
        if (seen.has(it.value)) return false;
        seen.add(it.value);
        return true;
      });
    return list;
  }, [productTypes]);

  return (
    <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-900">{t("FilterSection.Filters")}</h1>
        <button
          type="button"
          onClick={resetAll}
          className="text-base underline text-slate-700 hover:text-slate-900"
        >
         {t("FilterSection.clearAll")}
        </button>
      </div>

      <Accordion
        title={t("FilterSection.Category")}
        isOpened={openAccordion.includes("productTypeId")}
        type="productTypeId"
        handleAccordion={handleAccordion}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <div>
            <input
              type="checkbox"
              id="productType-all"
              className="peer hidden"
              name="productTypeId"
              value="all"
              checked={String(productTypeId) === "all"}
              onChange={() => handleFilterChange("productTypeId", "all")}
            />
            <label
              htmlFor="productType-all"
              className="inline-block cursor-pointer select-none rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-800 transition peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white"
            >
              {t("FilterSection.all")}
            </label>
          </div>

          {normalizedTypes.map((item) => (
            <div key={item.value}>
              <input
                type="checkbox"
                id={`productType-${item.value}`}
                className="peer hidden"
                name="productTypeId"
                value={item.value}
                checked={String(productTypeId) === item.value}
                onChange={() => handleFilterChange("productTypeId", item.value)}
              />
              <label
                htmlFor={`productType-${item.value}`}
                className="inline-block cursor-pointer select-none rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-800 transition hover:border-slate-400 peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion
        title={t("FilterSection.SortBy")}
        isOpened={openAccordion.includes("sortBy")}
        type="sortBy"
        handleAccordion={handleAccordion}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          {SortByItems.map((item) => (
            <div key={item.value}>
              <input
                type="checkbox"
                id={`sortBy-${item.value}`}
                className="peer hidden"
                name="sortBy"
                value={item.value}
                checked={sortBy === item.value}
                onChange={() => handleFilterChange("sortBy", item.value)}
              />
              <label
                htmlFor={`sortBy-${item.value}`}
                className="inline-block cursor-pointer select-none rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-800 transition hover:border-slate-400 peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion
        title={t("FilterSection.PriceRange")}
        isOpened={openAccordion.includes("priceRange")}
        type="priceRange"
        handleAccordion={handleAccordion}
      >
        <div className="p-3">
          <PriceRangeSlider
            range
            minValue={0}
            maxValue={100}
            value={[Number(minPrice), Number(maxPrice)]}
            handleChange={handlePriceRangeChange}
          />
        </div>
        <div className="mt-2 flex justify-between text-slate-700">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </Accordion>

      <Accordion
        title={t("FilterSection.Rating")}
        isOpened={openAccordion.includes("rating")}
        type="rating"
        handleAccordion={handleAccordion}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          {RatingItems.map((item) => (
            <div key={item.value}>
              <input
                type="checkbox"
                id={`rating-${item.value}`}
                className="peer hidden"
                name="rating"
                value={item.value}
                checked={rating === item.value}
                onChange={() => handleFilterChange("rating", item.value)}
              />
              <label
                htmlFor={`rating-${item.value}`}
                className="inline-block cursor-pointer select-none rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-800 transition hover:border-slate-400 peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion
        title={t("FilterSection.Availability")}
        isOpened={openAccordion.includes("inStock")}
        type="inStock"
        handleAccordion={handleAccordion}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          {AvailabilityItems.map((item) => (
            <div key={item.value}>
              <input
                type="checkbox"
                id={`availability-${item.value}`}
                className="peer hidden"
                name="inStock"
                value={item.value}
                checked={inStock === item.value}
                onChange={() => handleFilterChange("inStock", item.value)}
              />
              <label
                htmlFor={`availability-${item.value}`}
                className="inline-block cursor-pointer select-none rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-800 transition hover:border-slate-400 peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default FilterSection;
