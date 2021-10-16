import React, { useState } from "react";
import AnimationRevealPage from "assets/helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import illustration from "assets/svgs/signup-illustration.svg";
import logo from "assets/svgs/logo.svg";
import googleIconImageSrc from "assets/images/google-icon.png";
import twitterIconImageSrc from "assets/images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "assets/svgs/user-plus.svg";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { auth, db, googleProvider } from "firebase";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { SET_USER } from "redux/constant";

const ContainerBase = tw.div`relative`;
const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.button`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
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
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export const SignUp = ({
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign Up With Google",
      url: "https://google.com",
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign Up With Twitter",
      url: "https://twitter.com",
    },
  ],
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const registerWithEmailAndPassword = async (e) => {
    try {
      e.preventDefault();

      const { displayName, email, photoURL, password } = user;

      const { user: userData } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await addDoc(collection(db, "users"), {
        displayName,
        email,
        photoURL,
        uid: userData.uid,
        authProvider: "local",
      });
      dispatch({
        type: SET_USER,
        userPayload: { displayName, email, photoURL, uid: userData.uid },
      });
      history.push("/home");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signUpGoogle = async (e) => {
    try {
      e.preventDefault();

      const {
        user: { displayName, email, photoURL, uid },
      } = await signInWithPopup(auth, googleProvider);

      const q = query(collection(db, "users"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length !== 0) {
        throw new Error("User already exist!!\nTry LogIn");
      } else {
        await addDoc(collection(db, "users"), {
          displayName,
          email,
          photoURL,
          uid,
          authProvider: "google",
        });

        dispatch({
          type: SET_USER,
          userPayload: { displayName, email, photoURL, uid },
        });
        history.push("/home");
      }
    } catch (e) {
      alert(e);
      console.error(e);
    }
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href="/home">
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>Sign Up For Treact</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  {socialButtons.map((socialButton, index) => (
                    <SocialButton onClick={signUpGoogle} key={index}>
                      <span className="iconContainer">
                        <img
                          src={socialButton.iconImageSrc}
                          className="icon"
                          alt="imgz fht"
                        />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </SocialButton>
                  ))}
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Or Sign up with your e-mail</DividerText>
                </DividerTextContainer>
                <Form>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, displayName: e.target.value })
                    }
                    value={user.displayName}
                    type="text"
                    placeholder="Name"
                  />
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
                      setUser({ ...user, photoURL: e.target.value })
                    }
                    value={user.photoURL}
                    type="url"
                    placeholder="Display Image Url"
                  />
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    value={user.password}
                    type="password"
                    placeholder="Password"
                  />

                  <SubmitButton onClick={registerWithEmailAndPassword}>
                    <SignUpIcon className="icon" />
                    <span className="text">SignUp</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by treact's{" "}
                    <a href="##" tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a href="##" tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href="##" tw="border-b border-gray-500 border-dotted">
                      Sign In
                    </a>
                  </p>
                </Form>
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
