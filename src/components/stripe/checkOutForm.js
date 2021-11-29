import { PaymentElement } from '@stripe/react-stripe-js';
import React from 'react';

const Checkoutform = () => {
  return (
    <div>
      <form>
        <PaymentElement/>
      </form>
    </div>
  );
}

export default Checkoutform;
