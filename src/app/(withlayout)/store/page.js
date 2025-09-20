import { getProducts, getProductTypes } from "@/actions/productActions";
import StoreScreen from "@/screens/store/index";

export const revalidate = 60;

export default async function Store({ searchParams }) {
  const products = await getProducts(searchParams, { cache: "no-store" });
  const productTypeRes = await getProductTypes({ next: { revalidate: 3600 } });

  const productTypes = [
    { label: "All", value: "all" },
    ...(productTypeRes?.data ?? []).map((item) => ({
      label: item.name,
      value: item.id,
    })),
  ];

  return (
    <main>
      <StoreScreen searchParams={searchParams} products={products} productTypes={productTypes} />
    </main>
  );
}
