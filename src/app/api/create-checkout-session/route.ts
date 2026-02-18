import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ITEMS, SHIPPING_OPTIONS } from '@/constants';

const stripe = new Stripe(process.env.STRIPE_TEST_SK!, {
  apiVersion: '2025-09-30.clover;custom_checkout_payment_form_preview=v1',
});

// const calculateOrderAmount = (_items: any) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

export async function POST(request: Request) {
  try {
    // const body = await request.json();
    // const { items } = body;
    // const items = [];

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
      // payment_method_types: ['card', 'us_bank_account', 'klarna', 'amazon_pay'],
      // Hardcode for now just one per ITEM
      line_items: Object.values(ITEMS).map((item) => ({
        price_data: {
          currency: 'cad',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
        },
      })),
      // Shipping address collection + methods
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      shipping_options: SHIPPING_OPTIONS.map((option) => ({
        shipping_rate_data: {
          display_name: option.name,
          type: 'fixed_amount',
          fixed_amount: {
            amount: option.price,
            currency: 'cad',
          },
          delivery_estimate: {
            minimum: option.min,
            maximum: option.max,
          },
        },
      })),

      // Enable billing address
      billing_address_collection: 'required',

      // Enable Tax ID collection
      tax_id_collection: {
        enabled: true,
        // TODO(cskillingstad): required not supported for ui_mode: 'custom'
        // Hopefully Guacamole supports this
        // required: 'if_supported',
      },
      // TODO(cskillingstad): name_collection not supported for ui_mode: 'custom'
      // When this is enabled, TIDE should not show business name input
      // Hopefully Guacamole supports this
      // name_collection: {
      //   business: {
      //     enabled: true,
      //   },
      // },

      // Enable custom fields
      // custom_fields: [
      //   {
      //     type: 'text',
      //     label: {
      //       type: 'custom',
      //       custom: 'Custom monogram',
      //     },
      //     key: 'custom_monogram',
      //     optional: false,
      //     text: {
      //       maximum_length: 3,
      //     },
      //   },
      //   {
      //     type: 'dropdown',
      //     label: {
      //       type: 'custom',
      //       custom: 'Gift wrapping',
      //     },
      //     key: 'gift_wrapping',
      //     optional: true,
      //     dropdown: {
      //       options: [
      //         {
      //           label: 'Eco-friendly gift box',
      //           value: 'ecogiftbox',
      //         },
      //         {
      //           label: 'Regular gift wrap',
      //           value: 'giftwrap',
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     type: 'numeric',
      //     label: {
      //       type: 'custom',
      //       custom: 'Group order code',
      //     },
      //     key: 'group_order_code',
      //     optional: true,
      //     numeric: {
      //       minimum_length: 8,
      //       maximum_length: 8,
      //     },
      //   },
      // ],

      // Enable SPM
      // customer: 'cus_TvOzXu1J5jSRw2',
      // customer_update: {
      //   name: 'auto',
      //   shipping: 'auto',
      // },
      // payment_intent_data: {
      //   setup_future_usage: 'off_session',
      // },
      // saved_payment_method_options: {
      //   payment_method_save: 'enabled',
      //   payment_method_remove: 'enabled',
      // },

      return_url: `${request.headers.get('origin')}/complete?session_id={CHECKOUT_SESSION_ID}`,
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
