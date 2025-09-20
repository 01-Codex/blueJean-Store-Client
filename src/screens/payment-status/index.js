import Link from "next/link";

export default function PaymentStatus({ status }) {
  return (
    <div className="flex justify-center items-center">
      <div className="my-20 bg-white rounded-xl shadow-lg w-[768px] px-10 py-20">
        <div className="flex flex-col justify-center gap-y-6">
          <p className="text-center text-2xl font-semibold">{status}</p>
          <Link href="/" className="custom-btn w-fit self-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
