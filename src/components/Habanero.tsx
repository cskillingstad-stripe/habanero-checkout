import {
  useCheckout,
  PaymentFormElement,
} from '@stripe/react-stripe-js/checkout';

export default function Habanero() {
  const checkoutState = useCheckout();

  return (
    <div className="pt-6 md:pt-20 px-10 md:pl-20 md:pr-0 md:shadow-[-8px_0_16px_0_rgba(0,0,0,0.05)] min-h-screen">
      <PaymentFormElement
        onChange={(event) => {
          console.log('bblog change: ', event);
        }}
        onReady={(element) => {
          console.log('bblog ready: ', element);

          // Expose to window for debugging
          window.paymentFormElement = element;
        }}
        onFocus={(event) => {
          console.log('bblog focus: ', event);
        }}
        onBlur={(event) => {
          console.log('bblog blur: ', event);
        }}
        onEscape={(event) => {
          console.log('bblog escape: ', event);
        }}
        onLoadError={(event) => {
          console.log('bblog loaderror: ', event);
        }}
        onLoaderStart={() => {
          console.log('bblog loaderstart: ', event);
        }}
        onConfirm={(event) => {
          console.log('bblog confirm: ', event);

          if (checkoutState.type === 'success' && checkoutState.checkout) {
            const { checkout } = checkoutState;

            checkout.confirm({
              // @ts-expect-error - paymentFormConfirmEvent is not public yet
              paymentFormConfirmEvent: event,
              // Placeholder until we collect email
              // email: 'test@stripe.com',
            });
          }
        }}
      />
    </div>
  );
}
