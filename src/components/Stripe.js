import StripeCheckout from "react-stripe-checkout";

const STRIPE_PUBLISHABLE =
  "pk_test_51JhY3ZSGXiJf0VkcrQDoXtHOoks7UeXDutS2wPHhXZbjDQEr3O2dTgAKe9nsKzWsCd5D5psS8hdT6R33vPg9qaAp00TfN3LDKR";

const onToken = (user, checkout) => (token) => checkout(user, token.id);

export const Checkout = ({ amount, user, checkout }) => (
  <StripeCheckout
    amount={amount * 100}
    token={onToken(user, checkout)}
    currency="INR"
    stripeKey={STRIPE_PUBLISHABLE}
  />
);
