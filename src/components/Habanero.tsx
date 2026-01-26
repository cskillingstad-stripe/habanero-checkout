import { useEffect, useRef } from 'react';
import { useCheckout } from '@stripe/react-stripe-js/checkout';

export default function Habanero() {
  const checkoutState = useCheckout();
  const ref = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  // No <HabaneroElement exists yet, use checkout.createhHabaneroElement to hack it in
  useEffect(() => {
    if (checkoutState.type === 'success' && !didMount.current) {
      const { checkout } = checkoutState;

      window.checkout = checkout;

      const habaneroElement = checkout.createPaymentFormElement();

      // Add event logs for bug bash
      // @ts-expect-error - event not typed
      habaneroElement.on('change', (event) => {
        console.log('bblog change: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('ready', (event) => {
        console.log('bblog ready: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('focus', (event) => {
        console.log('bblog focus: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('blur', (event) => {
        console.log('bblog blur: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('escape', (event) => {
        console.log('bblog escape: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('loaderror', (event) => {
        console.log('bblog loaderror: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('loaderstart', (event) => {
        console.log('bblog loaderstart: ', event);
      });

      // @ts-expect-error - event not typed
      habaneroElement.on('confirm', (event) => {
        console.log('bblog confirm: ', event);

        checkout.confirm({
          // @ts-expect-error - paymentFormConfirmEvent is not public yet
          paymentFormConfirmEvent: event,
          // Placeholder until we collect email
          // email: 'test@stripe.com',
        });
      });

      window.habaneroElement = habaneroElement;

      habaneroElement.mount(ref.current);
      didMount.current = true;
    }
  }, [checkoutState]);

  return (
    <div
      ref={ref}
      className="pt-6 md:pt-20 px-10 md:pl-20 md:pr-0 md:shadow-[-8px_0_16px_0_rgba(0,0,0,0.05)] min-h-screen"
    />
  );
}
