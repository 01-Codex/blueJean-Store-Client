import { Suspense } from "react";
import CheckoutClient from "@/screens/checkout/index";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="my-10">Chargement du checkout…</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
