"use client";

import { SearchIcon, UserIcon, CartIcon } from "@/app/icons";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Input from "./input";
import { useRouter } from "next/navigation";
import { objectToQueryString } from "@/lib/utils";
import { useProductContext } from "./productContext";
import { getCustomerData, logoutUser } from "@/actions/authActions";
import LanguageSwitcher from "./languageSwitcher";
import { useI18n } from "@/components/I18nProvider";
import Image from "next/image";

const Header = () => {
  const { t } = useI18n();

  const [search, setSearch] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      setSearch(sp.get("search") || "");
    }
  }, []);

  const router = useRouter();
  const existingSearchParams = {};
  const updateSearchParams = (newParamsArray) => {
    const updatedSearchParams = { ...existingSearchParams, search };
    newParamsArray?.forEach((param) => {
      Object.entries(param).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") delete updatedSearchParams[key];
        else updatedSearchParams[key] = value;
      });
    });
    router.push(`/store?${objectToQueryString(updatedSearchParams)}`);
  };

  const handleFilterChange = (filterType, value) => {
    setSearch(value);
    updateSearchParams([{ [filterType]: value }]);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cartItems, customerData, setCustomerData } = useProductContext();

  const toggleDropdown = () => {
    if (customerData?.id) setDropdownOpen((v) => !v);
    else router.push("/login");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getCustomerData();
      setCustomerData(res?.data);
    })();
  }, [setCustomerData]);

  const handleLogout = async () => {
    await logoutUser();
    setCustomerData({});
    setDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
                src="/logo.svg"
                alt="logo"
                width={50}
                height={50}
                draggable={false}
            />
          </Link>

          <div className="relative w-full max-w-lg hidden md:block">
            <SearchIcon className="absolute left-2 top-2 w-7 h-7" />
            <Input
              placeholder={t("Header.searchPlaceholder")}
              className="pl-10"
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link href="/cart">
              <div className="relative inline-flex items-center justify-center w-11 h-11">
                <div className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center">
                  <CartIcon className="w-6 h-6 text-white" />
                </div>

                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white
                            flex items-center justify-center text-[10px] font-bold leading-none"
                >
                  {cartItems.length}
                </span>
              </div>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button className="cursor-pointer icon-button" onClick={toggleDropdown}>
                <UserIcon className="w-7 h-7" />
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-light">{t("Header.welcome")}</p>
                    <p className="text-lg">{customerData?.customerName}</p>
                  </div>
                  <button
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={handleLogout}
                  >
                    {t("Header.logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
