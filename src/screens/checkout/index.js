"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "@/actions/stripeActions";
import { useProductContext } from "@/components/productContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function CheckoutClient() {
  const router = useRouter();
  const { cartItems, customerData } = useProductContext();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (!cartItems?.length || !customerData?.id) {
      router.push("/");
      return;
    }
    let alive = true;
    (async () => {
      const session = await createCheckoutSession(cartItems, customerData);
      if (alive) setClientSecret(session.clientSecret);
    })();
    return () => {
      alive = false;
    };
  }, [cartItems, customerData?.id, router]);

  const options = useMemo(() => (clientSecret ? { clientSecret } : undefined), [clientSecret]);

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return <div>Stripe n’est pas configuré (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquante).</div>;
  }

  return (
    <div className="ml-24">
      {options && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <div className="my-10 rounded-xl border bg-white shadow border-gray-200 p-8">
            <EmbeddedCheckout />
          </div>
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
