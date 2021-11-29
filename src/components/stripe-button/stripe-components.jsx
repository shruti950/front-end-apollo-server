import { useMutation } from '@apollo/client';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
import { PostsQueries } from '../../queries/queries';
const StripeComponents = ({price}) => {
  const [addPayment]=useMutation(PostsQueries.addPayment)
  const priceForStripe = price *100;
  const publishKey = 'pk_test_51JXgciSJ5cEtd8TEOirPyf7RiYswQnSq6D4jUy6UrhdPJLWLcLTFIhE25hXkQxqT4x7qI6VEXpYbtTLzztukOosu00xiDgbzso'
  const onToken = token =>{
    addPayment({variables : {
      "paymentInput": {"amount":price,"currency":'INR',"token":token.id,"email":token.email,"name":token.card.name}
    }})
    console.log(token);
    alert('payment successful')
  }
  return (
    <div>
      <StripeCheckout
      label='Pay Now'
      name= 'federalBank'
      billingAddress
      shippingAddress
      image='https://www.google.com/search?q=federal+bank&rlz=1C5CHFA_enIN967IN967&sxsrf=AOaemvIK_nd4pXKGWhEy98YxtjHhgUGeUw:1637304326254&source=lnms&tbm=isch&sa=X&ved=2ahUKEwijjYX26aP0AhVMwzgGHfNtB6sQ_AUoA3oECAIQBQ&biw=1920&bih=888&dpr=1#imgrc=XooEucBLsiwpVM'
      description={`your total price is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      currency='INR'
      stripeKey={publishKey}

      />
    </div>
  );
}

export default StripeComponents;
