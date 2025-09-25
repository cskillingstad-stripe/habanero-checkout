'use client';

import { useMemo } from 'react';
import { loadStripe, Appearance } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import Header from '@/components/Header';
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
    variables: {
      colorPrimary: '#222725',
    },
    rules: {
      '.AccordionItem': {
        backgroundColor: 'none',
        border: 'none',
        borderBottom: '1px solid #D9D9D9',
        borderRadius: '0',
        boxShadow: 'none',
        marginBottom: '0',
      },
    },
  };

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => promise,
        elementsOptions: { appearance },
      }}
    >
      <Header />
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 py-12 px-4">
        <div className="md:col-span-3">
          <Habanero />
        </div>
        <div className="md:col-span-2">
          <OrderSummary />
        </div>
      </div>
    </CheckoutProvider>
  );
}
