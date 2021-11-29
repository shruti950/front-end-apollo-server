import React from 'react';
import StripeCheckoutButton from './stripe-components';

export default function StripePayment() {
  const totalPrice = 58;
  return (
    <>
    <h1>Make Stripe Payment @ Federal</h1>
        <p>
          Pay Total of $ {totalPrice}
        </p>
        <p>
          <StripeCheckoutButton price={totalPrice} />
        </p>
    </>
  );
}
