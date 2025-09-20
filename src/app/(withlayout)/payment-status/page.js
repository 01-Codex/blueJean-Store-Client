import { Suspense } from "react";
import { getCheckoutSession, updateCheckoutData } from "@/actions/stripeActions";
import PaymentStatus from "@/screens/payment-status";
import { useI18n } from "@/components/I18nProvider";

export const dynamic = "force-dynamic";

export default async function PaymentStatusPage({ searchParams }) {
  const { t } = useI18n();

  const session_id = Array.isArray(searchParams?.session_id)
    ? searchParams.session_id[0]
    : searchParams?.session_id;

  if (!session_id) {
    return (
      <Suspense fallback={<div>{t("PaymentStatus.Loading")}</div>}>
        <PaymentStatus status="Session inconnue." />
      </Suspense>
    );
  }

  const session = await getCheckoutSession(session_id);
  const updatedResObj = {
    address: session?.shipping_details?.address?.line1,
    city: session?.shipping_details?.address?.city,
    customerId: session?.metadata?.customerId,
    customerEmail: session?.customer_email,
    SODateTime: session?.created,
    grandTotalPrice: session?.amount_total / 100,
    paymentMode: session?.payment_method_types?.[0],
    products: session?.metadata?.products ? JSON.parse(session.metadata.products) : [],
  };

  const response = await updateCheckoutData(updatedResObj);

  return (
    <Suspense fallback={<div>{t("PaymentStatus.Loading")}</div>}>
      <PaymentStatus status={response?.message || t("PaymentStatus.Paymentvalidated")} />
    </Suspense>
  );
}
