"use client";

import { useProductContext } from "@/components/productContext";
import Button from "@/components/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useI18n } from "@/components/I18nProvider";

const Product = ({ product }) => {
  const { t } = useI18n();

  const { addProductToCart, removeProductFromCart, cartItems } =
    useProductContext();
  const isProductInCart = cartItems.some((item) => item.id === product.id);
  const [selectedSize, setSelectedSize] = useState("smallSize");

  const handleCartItems = () => {
    if (isProductInCart) removeProductFromCart(product.id);
    else
      addProductToCart({
        ...product,
        quantity: 1,
        size: selectedSize,
      });
  };

  const sizeOptions = [
    { label: "S", value: "smallSize" },
    { label: "M", value: "mediumSize" },
    { label: "L", value: "largeSize" },
  ];

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 md:py-8">
      <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(520px,1fr)_780px] items-start">
        <div className="bg-gray-100 rounded-2xl">
          <Image
            src={`${BASE_URL}/${product.image}`}
            alt={product?.name || "product"}
            width={1400}
            height={1000}
            sizes="100vw"
            className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain rounded-xl"
          />
        </div>

        <div className="relative bg-white rounded-[20px] md:rounded-[24px] shadow-sm ring-1 ring-black/5 p-6 md:p-8 lg:p-12">
          <Button
            onClick={handleCartItems}
            className={cn(
              "absolute top-4 right-4 md:top-6 md:right-6",
              "w-12 h-12 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] rounded-full",
              "bg-slate-900 text-white shadow-lg ring-4 ring-white flex items-center justify-center",
              "text-xl md:text-2xl lg:text-3xl hover:opacity-90"
            )}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>

          <h1 className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[104px] font-extrabold leading-[1.05] tracking-tight text-slate-900 pr-20 md:pr-28">
            {product?.name}
          </h1>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h6 className="text-emerald-500 text-[22px] md:text-[28px] lg:text-[40px] font-bold">
                {t("Product.Specialprice")}
              </h6>

              <div className="mt-2 flex items-center gap-4 md:gap-6">
                <span className="text-[24px] md:text-[28px] lg:text-[36px] font-extrabold text-slate-900">
                  ${product.sellPrice}
                </span>
                <span className="text-[16px] md:text-[20px] lg:text-[24px] text-slate-400 line-through">
                  ${product.mrp}
                </span>
              </div>

              <div className="mt-3 text-[14px] md:text-[18px] lg:text-[22px] text-slate-500">
                {product.currentStock} {t("Product.itemleft")}
              </div>
            </div>

            <div>
              <h6 className="text-[18px] md:text-[20px] lg:text-[28px] font-extrabold text-slate-900">
                {t("Product.Size")}
              </h6>
              <div className="mt-3 flex flex-wrap gap-3 md:gap-4">
                {sizeOptions.map((opt) => (
                  <div key={opt.value} className="relative">
                    <input
                      type="radio"
                      id={`sizes-${opt.value}`}
                      name="sizes"
                      className="peer hidden"
                      value={opt.value}
                      checked={selectedSize === opt.value}
                      onChange={() => setSelectedSize(opt.value)}
                    />
                    <label
                      htmlFor={`sizes-${opt.value}`}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full border-2 transition-colors",
                        "w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 text-xs md:text-sm font-bold uppercase",
                        "border-slate-300 text-slate-500",
                        "peer-checked:bg-slate-900 peer-checked:text-white peer-checked:border-slate-900",
                        "hover:border-slate-400"
                      )}
                    >
                      {opt.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <p className="text-[20px] md:text-[22px] lg:text-[28px] font-extrabold text-slate-900">
              Description
            </p>
            <p className="mt-2 md:mt-3 text-slate-600 text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
