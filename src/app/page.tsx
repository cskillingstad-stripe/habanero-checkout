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
  const promise = useMemo(() => {
    return fetch('/api/create-checkout-session', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const appearance: Appearance = {
    theme: 'stripe',

    // Make it look like Galtee Figma
    // @ts-expect-error - condensed inputs not GA'ed yet
    inputs: 'condensed',
  };

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => promise,
        elementsOptions: { appearance },
      }}
    >
      <div className="flex flex-col md:flex-row justify-center min-h-screen">
        <div className="w-full md:flex-1 md:min-h-screen bg-[#f0f0f0] flex md:justify-end justify-center">
          <div className="w-full max-w-[460px]">
            <OrderSummary />
          </div>
        </div>
        <div className="w-full md:flex-1 md:min-h-screen flex md:justify-start justify-center">
          <div className="w-full max-w-[460px]">
            <Habanero />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}
