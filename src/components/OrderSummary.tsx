'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IconBuildingStore } from '@tabler/icons-react';
import { ITEMS } from '@/constants';

export default function OrderSummary() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const items = [
    {
      id: 'fleece',
      name: 'Tunnel Vision',
      description: 'Next-gen tech.',
      price: ITEMS.fleece.price,
      image: ITEMS.fleece.image,
    },
    {
      id: 'puffer',
      name: 'Passive Thought',
      description: 'Elevate your game.',
      price: ITEMS.puffer.price,
      image: ITEMS.puffer.image,
    },
    {
      id: 'sleeping-bag',
      name: 'Cryptic Learnings',
      description: 'Savor the taste.',
      price: ITEMS['sleeping-bag'].price,
      image: ITEMS['sleeping-bag'].image,
    },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const toggleDetails = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden p-8 text-center">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center hover:opacity-70">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <IconBuildingStore
              size={20}
              stroke={1.5}
              className="text-gray-700"
            />
            <h1 className="text-sm font-medium text-gray-900">Merchant name</h1>
          </div>
          <button className="text-sm text-gray-600 flex items-center gap-1">
            Details
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="w-40 h-40 mx-auto mb-4 relative rounded-lg overflow-hidden">
          <Image
            src={items[0].image}
            alt={items[0].name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          {items[0].name}
        </h2>
        <div className="text-3xl font-semibold text-gray-900 mb-3">
          {formatPrice(subtotal)}
        </div>
        <button className="bg-[#e8e8e8] text-gray-900 text-sm font-semibold hover:bg-[#dedede] px-4 py-2 rounded-md mb-2 inline-flex items-center gap-2">
          View details
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block pt-20 pr-20 rounded-lg min-h-screen">
        <div className="flex items-center gap-2 mb-12">
          <button className="flex items-center justify-center hover:opacity-70">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <IconBuildingStore
              size={20}
              stroke={1.5}
              className="text-gray-700"
            />
            <h1 className="text-sm font-medium text-gray-900">Merchant name</h1>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-base text-gray-600 mb-1 font-medium">
            Pay Merchant
          </div>
          <div className="text-4xl font-semibold text-gray-900">
            {formatPrice(subtotal)}
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="w-10 h-10 relative flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">
                  {item.name}
                </div>
                <div className="text-xs font-normal text-gray-600">
                  {item.description}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-medium text-sm text-gray-900">
                  {formatPrice(item.price)}
                </div>
                <button
                  onClick={() => toggleDetails(item.id)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  See details
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transform transition-transform ${
                      expandedItem === item.id ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-gray-900 mb-4">
          <span className="font-medium text-sm">Subtotal</span>
          <span className="font-semibold text-sm">{formatPrice(subtotal)}</span>
        </div>

        <div className="border-t border-gray-300 pt-4 mb-4">
          <button className="bg-[#e8e8e8] text-gray-900 text-sm font-semibold hover:bg-[#dedede] px-4 py-2 rounded-md">
            Add promotion code
          </button>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between text-gray-900 font-medium text-sm">
            <span>Total due today</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
