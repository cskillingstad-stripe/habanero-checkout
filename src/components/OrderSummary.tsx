import Image from 'next/image';
import { IconTrash, IconPlus, IconMinus } from '@tabler/icons-react';
import { useCheckout } from '@stripe/react-stripe-js/checkout';
import { ITEMS } from '@/constants';

export default function OrderSummary() {
  const checkout = useCheckout();

  if (checkout.type !== 'success') {
    return null;
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    checkout.checkout.updateLineItemQuantity({ lineItem: itemId, quantity });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Order summary</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6 mb-8">
          {checkout.checkout.lineItems.map((item) => {
            const product = ITEMS[item.name as keyof typeof ITEMS];

            return (
              <div key={item.id} className="flex gap-4 mb-6">
                <div className="relative w-[71px] h-[100px] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col min-h-[100px] py-2">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <IconTrash size={20} />
                    </button>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <p className="text-gray-400">{item.total.amount}</p>
                    <div className="flex items-center bg-white rounded-lg border border-gray-200">
                      <button
                        className="px-2 py-2 hover:bg-gray-100"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <IconMinus size={16} />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        className="px-2 py-2 hover:bg-gray-100"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <IconPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Promo Code */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Promo code"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-base"
          />
          <button className="bg-[#222725] text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-800">
            Apply
          </button>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Summary */}
        <div className="space-y-4 text-base leading-[1.15]">
          <div className="flex justify-between font-semibold text-[#131214]">
            <span>Subtotal</span>
            <span>{checkout.checkout.total.subtotal.amount}</span>
          </div>
          <div className="flex justify-between font-semibold text-[#131214]">
            <span>Shipping</span>
            <span>{checkout.checkout.total.shippingRate.amount}</span>
          </div>
          <div className="flex justify-between font-semibold text-[#131214]">
            <span>Sales tax</span>
            <span>{checkout.checkout.total.taxExclusive.amount}</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between font-semibold text-[#131214]">
            <span>Total</span>
            <span>{checkout.checkout.total.total.amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
