import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_SK!, {
  apiVersion: '2025-08-27.basil',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateOrderAmount = (_items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export async function POST(request: Request) {
  try {
    // const body = await request.json();
    // const { items } = body;
    const items = [];

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'custom',
      // All needed for setup mode
      // mode: "setup",
      // currency: "usd",

      // All needed for subscription mode
      // mode: "subscription",
      // line_items: [
      //   {
      //     quantity: 1,
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: "Software subscription",
      //       },
      //       unit_amount: calculateOrderAmount(items),
      //       recurring: {
      //         interval: "month",
      //       },
      //     },
      //   },
      // ],

      // All needed for payment mode
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'XL T-Shirt',
            },
            unit_amount: calculateOrderAmount(items),
          },
          quantity: 1,
        },
      ],

      return_url: `${request.headers.get('origin')}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
