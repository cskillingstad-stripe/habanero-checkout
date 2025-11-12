'use client';

import { useMemo } from 'react';
import { loadStripe, Appearance } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import OrderSummary from '@/components/OrderSummary';
import Habanero from '@/components/Habanero';

const stripePromise = loadStripe('pk_test_fEnfqkUj7brxj0AAGO5Ig8rg', {
  betas: [
    // "custom_checkout_beta_6",
    // 'custom_checkout_adaptive_pricing_2',
    // "custom_checkout_tax_id_1",
    'custom_checkout_habanero_1',
  ],
});

export default function Home() {
  const fetchClientSecret = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const data = await res.json();
    return data.clientSecret;
  };

  const appearance: Appearance = {
    theme: 'stripe',

    variables: {
      // Checkout uses 500 for medium weight (ie. in the Pay Button)
      fontWeightMedium: '500',
    },

    // Make it look like Galtee Figma
    // @ts-expect-error - condensed inputs not GA'ed yet
    inputs: 'condensed',
    labels: 'above',
  };

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret,
        elementsOptions: {
          appearance,
          savedPaymentMethod: {
            // Default is 'auto' in clover
            enableSave: 'auto',
            // Default is 'auto' in clover
            enableRedisplay: 'auto',
          },
        },
      }}
    >
      <div className="flex flex-col md:flex-row justify-center min-h-screen">
        <div className="w-full md:flex-1 md:min-h-screen bg-[#f0f0f0] flex md:justify-end justify-center">
          <div className="w-full max-w-[500px]">
            <OrderSummary />
          </div>
        </div>
        <div className="w-full md:flex-1 md:min-h-screen flex md:justify-start justify-center">
          <div className="w-full max-w-[500px]">
            <Habanero />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}
