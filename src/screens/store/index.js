"use client";

import { Suspense } from "react";
import FilterSection from "./filterSection";
import ProductCard from "./productCard";
import { useI18n } from "@/components/I18nProvider";

const StoreScreen = ({ searchParams, products, productTypes }) => {
  const { t } = useI18n();

  const list = Array.isArray(products?.data) ? products.data.filter(Boolean) : [];

  return (
    <div className="my-6 px-4 sm:px-8 lg:pl-24">
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Suspense fallback={<div>{t("Store.filterCharge")}</div>}>
            <FilterSection searchParams={searchParams} productTypes={productTypes} />
          </Suspense>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {list.length > 0 ? (
            list.map((product, i) => (
              <ProductCard key={product.id ?? product._id ?? i} product={product} />
            ))
          ) : (
            <p className="col-span-full opacity-70 text-sm">{t("Store.noProduct")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreScreen;
