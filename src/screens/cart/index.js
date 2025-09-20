"use client";

import { useProductContext } from "@/components/productContext";
import Button from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useI18n } from "@/components/I18nProvider";

const Cart = () => {
  const { t } = useI18n();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    totalAmount,
    customerData,
  } = useProductContext();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const router = useRouter();

  const handleCheckout = () => {
    if (customerData?.id) router.push("/checkout");
    else router.push("/login");
  };

  const lines = useMemo(
    () =>
      cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        lineTotal: Number(item.sellPrice * item.quantity).toFixed(2),
      })),
    [cartItems]
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6 sm:space-y-10">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-2xl sm:rounded-[40px] px-4 sm:px-8 md:px-10 py-5 sm:py-7"
            >
              <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-4 sm:gap-8">
                <div className="shrink-0 rounded-full bg-white p-2 sm:p-3 ring-4 sm:ring-8 ring-white/70 shadow-sm">
                  <Image
                    src={`${BASE_URL}/${item?.image}`}
                    alt={item?.name || "product"}
                    width={96}
                    height={96}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[22px] sm:text-[32px] md:text-[42px] leading-snug font-bold text-slate-900 tracking-tight">
                    {item?.name}
                  </h3>

                  <div className="mt-2 sm:mt-3 flex items-center gap-3 sm:gap-5">
                    <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white text-xs sm:text-[15px] font-black uppercase ring-2 ring-white">
                      {(item.size?.[0] || "s")}
                    </span>

                    <span className="text-[18px] sm:text-[24px] font-semibold text-slate-900 tabular-nums">
                      ${item?.sellPrice}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center justify-start sm:justify-center gap-4 sm:gap-6 text-slate-900 mt-4 sm:mt-0">
                  <Button
                    className="p-0 bg-transparent hover:opacity-70"
                    onClick={() => item.quantity > 1 && decreaseQuantity(item.id)}
                    disabled={item.quantity === 1}
                    aria-label="Decrease quantity"
                  >
                    <FontAwesomeIcon className="text-[18px] sm:text-[20px]" icon={faMinus} />
                  </Button>

                  <span className="text-[18px] sm:text-[20px] font-bold tabular-nums">
                    {item.quantity}
                  </span>

                  <Button
                    className="p-0 bg-transparent hover:opacity-70"
                    onClick={() => increaseQuantity(item.id)}
                    disabled={item.quantity === item[item.size]}
                    aria-label="Increase quantity"
                  >
                    <FontAwesomeIcon className="text-[18px] sm:text-[20px]" icon={faPlus} />
                  </Button>
                </div>

                <div className="hidden sm:flex justify-end">
                  <Button
                    className="p-0 bg-transparent text-red-500 hover:text-red-600"
                    onClick={() => removeProductFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FontAwesomeIcon className="text-[20px] sm:text-[22px]" icon={faTrash} />
                  </Button>
                </div>
              </div>

              <div className="flex sm:hidden justify-end mt-3">
                <Button
                  className="p-0 bg-transparent text-red-500 hover:text-red-600"
                  onClick={() => removeProductFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <FontAwesomeIcon className="text-[20px]" icon={faTrash} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <aside className="sticky top-4 h-fit">
          <div className="bg-white rounded-2xl sm:rounded-[24px] shadow-md px-5 sm:px-7 py-5 sm:py-6">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.1] text-slate-900 tracking-tight">
              {t("Cart.CartSummary")}
            </h2>
            <div className="mt-3 h-[2px] w-40 sm:w-60 bg-slate-200 rounded-full" />

            <div className="mt-6 space-y-3 sm:space-y-5">
              {lines.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center justify-between text-[16px] sm:text-[20px] text-slate-800"
                >
                  <span className="truncate">{l.name}</span>
                  <span className="font-semibold tabular-nums">${l.lineTotal}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 h-[2px] w-full bg-slate-200 rounded-full" />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[20px] sm:text-[24px] md:text-[28px] font-extrabold text-slate-900">
                {t("Cart.Totalamount")}
              </span>
              <span className="text-[26px] sm:text-[32px] md:text-[36px] font-extrabold text-slate-900 tabular-nums">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            className="mt-3 bg-amber-400 text-black font-semibold rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 w-full sm:w-auto hover:bg-amber-500"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            {customerData?.id ? t("Cart.Checkout") : t("Cart.LogintoCheckout")}
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
