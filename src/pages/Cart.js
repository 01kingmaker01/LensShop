import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import AnimationRevealPage from "assets/helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/FiveColumnWithInputForm.js";

import { ReactComponent as CartIcon } from "assets/svgs/shopping-cart.svg";

import styled from "styled-components";
import { addToCart, reduceFromCart } from "redux/actions/cartActions";
const Title = styled.div`
  font-weight: 700;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // margin: 1rem 0;
`;

export const Cart = () => {
  const dispatch = useDispatch();
  const quantity = useRef();
  // console.log({ q: parseInt(quantity.current.innerHTML) + 10 });
  const { cartReducer, userReducer } = useSelector((state) => state);

  return (
    <AnimationRevealPage>
      <Header />
      <div className="lg:w-4/6 mx-auto">
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
            <div className="flex-col py-4 space-y-4">
              <Title>{e.title}</Title>
              <p className="font-medium text-gray-600">&#8377;{e.price}</p>
              <div className="flex items-center text-center ">
                <button
                  className="w-6 h-6 font-bold bg-gray-300 rounded-full"
                  onClick={() => {
                    quantity.current.innerHTML =
                      parseInt(quantity.current.innerHTML) - 1;
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
                    quantity.current.innerHTML =
                      parseInt(quantity.current.innerHTML) + 1;
                    return dispatch(
                      addToCart(userReducer?.uid, e?.productId, 1)
                    );
                  }}>
                  &#43;
                </button>
              </div>
            </div>

            {/* <div key={e.productId}>
          <h1>{cart?.bill}</h1>
          <h1>{cart?.userId}</h1>
          <br />
          <br />
            <h1>{e.name}</h1>
            <h1>{e.price}</h1>
            <h1>{e.productId}</h1>
            <h1>{e.quantity}</h1>
            <h1>{e.image}</h1>
            <br />
          </div> */}
          </div>
        ))}
      </div>
      <Footer />
    </AnimationRevealPage>
  );
};
