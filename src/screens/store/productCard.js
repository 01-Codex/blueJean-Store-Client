"use client";

import { useProductContext } from "@/components/productContext";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const FALLBACK_IMG = "/placeholder.png";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "";

  const buildSrc = () => {
    const img = product.image ?? "";
    if (!img) return FALLBACK_IMG;
    if (/^https?:\/\//i.test(img)) return img;
    if (PUBLIC_BASE) {
      try { return new URL(img, PUBLIC_BASE).toString(); } catch {}
    }
    return img.startsWith("/") ? img : `/${img}`;
  };

  const src = buildSrc();

  const { addProductToCart, removeProductFromCart, cartItems } = useProductContext();
  const isProductInCart = cartItems.some((item) => item.id === product.id);
  const [pushing, setPushing] = useState(false);
  const pushTimer = useRef(null);
  const doPush = () => {
    if (pushTimer.current) clearTimeout(pushTimer.current);
    setPushing(true);
    pushTimer.current = setTimeout(() => setPushing(false), 150);
  };

  const handleCartItems = () => {
    addProductToCart({ ...product, quantity: 1, size: "smallSize" });
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-md overflow-hidden w-full max-w-sm">
      <div className="relative">
        <Link href={`/product/${product?.id}`} className="cursor-pointer">
          <Image
            className="w-full h-72 object-cover"
            src={src}
            alt={product.name || "product"}
            width={800}
            height={400}
            sizes="100vw"
            unoptimized
          />
        </Link>

        <button
          onClick={handleCartItems}
          onPointerDown={() => setPushing(true)}
          onPointerUp={() => setPushing(false)}
          onPointerLeave={() => setPushing(false)}
          aria-pressed={pushing}
          className={cn(
            "absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full",
            "bg-black cursor-pointer text-white shadow-md",
            "transition-transform duration-150 ease-out will-change-transform",
            "active:scale-90",
            pushing ? "scale-90" : "scale-100"
          )}
        >
          <FontAwesomeIcon icon={faPlus} className="text-lg" />
        </button>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <Link href={`/product/${product?.id}`} className="text-lg font-bold text-slate-900">
            {product?.name}
          </Link>
          <p className="text-slate-600 text-sm">{product?.description}</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full border px-3 py-1 text-sm text-slate-800">
            {product?.productType?.name ?? ""}
          </span>
          {product?.currentStock != null && (
            <span className="text-sm text-slate-900">
              <span className="font-bold">{product.currentStock}</span> left
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          {product?.sellPrice != null && (
            <span className="text-xl font-extrabold text-slate-900">
              {product.sellPrice}$
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
