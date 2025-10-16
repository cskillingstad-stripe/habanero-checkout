import { useEffect, useRef } from 'react';
import { useCheckout } from '@stripe/react-stripe-js/checkout';

export default function Habanero() {
  const checkout = useCheckout();
  const ref = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  // No <HabaneroElement exists yet, use checkout.createhHabaneroElement to hack it in
  useEffect(() => {
    if (checkout.type === 'success' && !didMount.current) {
      // @ts-expect-error - checkout.checkout.createHabaneroElement is not public yet
      const habaneroElement = checkout.checkout.createHabaneroElement();

      // @ts-expect-error - event not typed
      habaneroElement.on('confirm', (event) => {
        checkout.checkout.confirm({
          // @ts-expect-error - habaneroConfirmEvent is not public yet
          habaneroConfirmEvent: event,
        });
      });

      habaneroElement.mount(ref.current);
      didMount.current = true;
    }
  }, [checkout]);

  return (
    <div
      ref={ref}
      className="pt-6 md:pt-20 px-10 md:pl-20 md:pr-0 md:shadow-[-8px_0_16px_0_rgba(0,0,0,0.05)] min-h-screen"
    />
  );
}
