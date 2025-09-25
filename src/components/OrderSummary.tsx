import Image from 'next/image';
import { IconTrash, IconPlus, IconMinus } from '@tabler/icons-react';

const products = [
  {
    id: 1,
    name: "Women's Galtymore Fleece",
    price: 160.0,
    image: '/products/fleece.png',
    quantity: 1,
  },
  {
    id: 2,
    name: "Men's Errigal Puffer Jacket",
    price: 315.0,
    image: '/products/puffer.png',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Croagh Sleeping Bag -40F Down',
    price: 130.0,
    image: '/products/sleeping-bag.png',
    quantity: 1,
  },
];

export default function OrderSummary() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Order summary</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="flex gap-4 mb-6">
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
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <IconTrash size={20} />
                  </button>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <p className="text-gray-400">${product.price.toFixed(2)}</p>
                  <div className="flex items-center bg-white rounded-lg border border-gray-200">
                    <button className="px-2 py-2 hover:bg-gray-100">
                      <IconMinus size={16} />
                    </button>
                    <span className="w-6 text-center">{product.quantity}</span>
                    <button className="px-2 py-2 hover:bg-gray-100">
                      <IconPlus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
            <span>$645.00</span>
          </div>
          <div className="flex justify-between font-semibold text-[#131214]">
            <span>Shipping</span>
            <span>$20.00</span>
          </div>
          <div className="flex justify-between font-semibold text-[#131214]">
            <span>Sales tax (8%)</span>
            <span>$51.60</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between font-semibold text-[#131214]">
            <span>Total</span>
            <span>$716.60</span>
          </div>
        </div>
      </div>
    </div>
  );
}
