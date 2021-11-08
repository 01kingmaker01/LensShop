import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import tw, { css } from "twin.macro";

// import StripeCheckout from "react-stripe-checkout";

import AnimationRevealPage from "assets/helpers/AnimationRevealPage.js";
import Header, { PrimaryLink } from "components/headers/light.js";
import Footer from "components/FiveColumnWithInputForm.js";

import { ReactComponent as CartIcon } from "assets/svgs/shopping-cart.svg";
import { ReactComponent as EmptyCartIcon } from "assets/svgs/Group12.svg";
import { ReactComponent as DeleteCartIcon } from "assets/svgs/delete.svg";

import styled from "styled-components";
import {
  addToCart,
  deleteFromCart,
  reduceFromCart,
} from "redux/actions/cartActions";
// import { Checkout } from "components/Stripe";
import { StripeCheckoutAction } from "redux/actions/orderActions";
const Title = styled.div`
  font-weight: 700;
`;

export const Cart = () => {
  const dispatch = useDispatch();
  const quantity = useRef();
  const { cartReducer, userReducer } = useSelector((state) => state);
  return (
    <AnimationRevealPage>
      <Header />
      <div className="lg:w-4/6 mx-auto">
        {!cartReducer ||
        JSON.stringify(cartReducer) === JSON.stringify([]) ||
        JSON.stringify(cartReducer?.items) === JSON.stringify([]) ? (
          <div className="flex flex-col items-center my-8  ">
            <h1 className="text-gray-700 text-2xl  font-semibold  ">
              You've Nothing in Cart
            </h1>
            <p className="text-gray-500 text-sm mt-4 mb-8 text-center ">
              Choosing specs is something really tough,
              <br />
              we understand it.
            </p>
            <EmptyCartIcon />
            <PrimaryLink css={tw`mt-8 mb-4`}>
              <NavLink to="/">LETS FILL THE CART</NavLink>
            </PrimaryLink>
          </div>
        ) : (
          <>
            <h1 className="text-gray-700  text-2xl items-center font-semibold my-4 lg:my-8 flex">
              My Cart <CartIcon className="ml-2 " />
            </h1>
            {cartReducer?.items?.map((e) => (
              <div
                className="flex border-2 rounded-xl items-center border-gray-300 mb-2 last:mb-0 "
                key={e.productId}>
                <div
                  style={{ minWidth: "7rem" }}
                  className="w-20 h-20  flex place-items-center m-2 ">
                  <img src={e.image} alt="img" />
                </div>
                <div className="flex-col py-4 space-y-4 relative w-full ">
                  <Title>{e.title}</Title>
                  <p className="font-medium text-gray-600">&#8377;{e.price}</p>
                  <div className="flex items-center text-center ">
                    <button
                      className="w-6 h-6 font-bold bg-gray-300 rounded-full"
                      onClick={() => {
                        if (parseInt(quantity?.current?.innerHTML) < 2) return;
                        return dispatch(
                          reduceFromCart(userReducer?.uid, e?.productId, 1)
                        );
                      }}>
                      &#8722;
                    </button>

                    <p className=" px-3 h-6" ref={quantity}>
                      {e.quantity}
                    </p>

                    <button
                      className="w-6 h-6 font-bold bg-gray-300 rounded-full "
                      onClick={() => {
                        return dispatch(
                          addToCart(userReducer?.uid, e?.productId, 1)
                        );
                      }}>
                      &#43;
                    </button>
                  </div>
                  <button
                    css={tw`mt-0`}
                    className=" font-bold bg-gray-300 rounded-full p-1 absolute right-3 bottom-3"
                    onClick={() => {
                      const kk = window.confirm(
                        "Do you want to delete this item"
                      );
                      if (kk === true) {
                        return dispatch(
                          deleteFromCart(userReducer?.uid, e.productId, 1)
                        );
                      }
                    }}>
                    <DeleteCartIcon />
                  </button>
                </div>
              </div>
            ))}
            <div className="text-2xl font-bold">Bill : {cartReducer?.bill}</div>

            <button
              css={tw`text-lg my-2 lg:text-sm  lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 hover:cursor-pointer lg:mx-0 px-8 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700  w-full hocus:text-gray-200 focus:shadow-outline sm:w-auto `}
              onClick={() => dispatch(StripeCheckoutAction(userReducer?.uid))}>
              Checkout 🤩
            </button>
          </>
        )}
      </div>

      <Footer />
    </AnimationRevealPage>
  );
};
// gigevip800@cyadp.com
