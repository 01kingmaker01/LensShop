/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AnimationRevealPage from "assets/helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import illustration from "assets/svgs/login-illustration.svg";
import logo from "assets/svgs/logo.svg";
import googleIconImageSrc from "assets/images/google-icon.png";
import twitterIconImageSrc from "assets/images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "assets/svgs/log-in.svg";
import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { auth, db, googleProvider } from "firebase";
import { SET_USER } from "redux/constant";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.button`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-100 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 `;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-200 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props?.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signInGoogle = async (e) => {
    try {
      e.preventDefault();

      const {
        user: { displayName, email, photoURL, uid },
      } = await signInWithPopup(auth, googleProvider);
      const q = query(collection(db, "users"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 0) {
        throw new Error("User Not found");
      } else {
        dispatch({
          type: SET_USER,
          userPayload: { displayName, email, photoURL, uid },
        });
        history.push("/");
      }
    } catch (e) {
      alert(e);
      console.error(e);
    }
  };

  const signInEP = async (e) => {
    try {
      e.preventDefault();

      const {
        user: { uid },
      } = await signInWithEmailAndPassword(auth, user.email, user.password);

      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const { displayName, email, photoURL } = querySnapshot?.docs[0]?.data();
      dispatch({
        type: SET_USER,
        userPayload: { displayName, email, photoURL, uid },
      });

      history.push("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com",
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign In With Twitter",
      url: "https://twitter.com",
    },
  ];

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <NavLink to="/">
              <LogoImage src={logo} />
            </NavLink>
            <MainContent>
              <Heading>Sign In To LenShop</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  {socialButtons.map((socialButton, index) => (
                    <SocialButton onClick={signInGoogle} key={index}>
                      <span className="iconContainer">
                        <img
                          src={socialButton.iconImageSrc}
                          className="icon"
                          alt=""
                        />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </SocialButton>
                  ))}
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Or Sign in with your e-mail</DividerText>
                </DividerTextContainer>
                <Form>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    value={user.email}
                    type="email"
                    placeholder="Email"
                  />
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    value={user.password}
                    type="password"
                    autoComplete="true"
                    placeholder="Password"
                  />
                  <SubmitButton onClick={signInEP}>
                    <LoginIcon className="icon" />
                    <span className="text">Sign In</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a href="##" tw="border-b border-gray-500 border-dotted">
                    Forgot Password ?
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?
                  <span tw="border-b border-gray-500 border-dotted">
                    <NavLink to="/signup"> Sign Up</NavLink>
                  </span>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustration} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
