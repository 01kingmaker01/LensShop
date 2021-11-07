import React from "react";
import { useSelector } from "react-redux";

import AnimationRevealPage from "assets/helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/FiveColumnWithInputForm.js";

import { ReactComponent as CartIcon } from "assets/svgs/shopping-bag.svg";

import styled from "styled-components";
const Title = styled.div`
  font-weight: 700;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // margin: 1rem 0;
`;

export const Orders = () => {
  const { orderReducer } = useSelector((state) => state);

  return (
    <AnimationRevealPage>
      <Header />
      <div className="lg:w-4/6 mx-auto">
        <h1 className="text-gray-700  text-2xl items-center font-semibold my-4 lg:my-8 flex">
          My Orders <CartIcon className="ml-2 " />
        </h1>

        {orderReducer?.map((obj, i) => (
          <div key={i}>
            <span class="text-xs font-semibold inline-block py-1 px-2 rounded-full text-white bg-primary-100 opacity-95 last:mr-0 mr-1 my-4 first:mt-0  ">
              Items Ordered on {""}
              <i>
                <b>{new Date(obj?.date_added)?.toString().substr(0, 25)}</b>
              </i>
            </span>
            {obj?.items?.map((e) => (
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
                  <p className="">Quantitiy : {e.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </AnimationRevealPage>
  );
};
