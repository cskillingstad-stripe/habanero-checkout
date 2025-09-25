import Header from "@/components/Header";
import OrderSummary from "@/components/OrderSummary";

export default function Home() {
  return (
    <>
      <Header />
      {/* 60% width column */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-5 py-12">
        <div className="col-span-3">Habanero</div>
        <div className="col-span-2">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
