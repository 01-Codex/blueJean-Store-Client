import { Suspense } from "react";
import Cart from "@/screens/cart/index";

export const dynamic = "force-static";

export default function Page() {

  return (
    <Suspense fallback={<div className="my-10">Chargement du panier…</div>}>
      <Cart />
    </Suspense>
  );
}
