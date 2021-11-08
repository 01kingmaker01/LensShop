import React, { useState } from "react";
import AnimationRevealPage from "assets/helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

// import illustration from "assets/svgs/signup-illustration.svg";
import logo from "assets/svgs/logo.svg";

import { ReactComponent as SignUpIcon } from "assets/svgs/user-plus.svg";

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

const Form = tw.form`mx-auto max-w-xs`;
const inputBase =
  "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0";
const Input = tw.input`${inputBase}`;
const TextArea = tw.textarea`${inputBase}`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-500 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
// const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
// const IllustrationImage = styled.div`
//   ${(props) => `background-image: url("${props.imageSrc}");`}
//   ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
// `;

export const Item = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();

  const [item, setItem] = useState({
    title: "",
    category: "",
    image: "",
    gender: "",
    price: "",
    description: "",
  });

  const onSubmit = async (e) => {
    try {
      await e.preventDefault();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href="/">
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>Add Item</Heading>

              <FormContainer>
                <Form>
                  <Input
                    onChange={(e) =>
                      setItem({ ...item, title: e.target.value })
                    }
                    value={item.title}
                    type="text"
                    placeholder="Title"
                  />
                  <Input
                    onChange={(e) =>
                      setItem({ ...item, category: e.target.value })
                    }
                    value={item.category}
                    type="text"
                    placeholder="Category"
                  />
                  <Input
                    onChange={(e) =>
                      setItem({ ...item, image: e.target.value })
                    }
                    value={item.image}
                    type="url"
                    placeholder="Image Url"
                  />
                  <Input
                    onChange={(e) =>
                      setItem({ ...item, price: e.target.value })
                    }
                    value={item.price}
                    type="number"
                    min="0"
                    oninput="validity.valid||(value='');"
                    placeholder="Price"
                  />
                  <Input
                    onChange={(e) =>
                      setItem({ ...item, gender: e.target.value })
                    }
                    value={item.gender}
                    type="text"
                    placeholder="Gender"
                  />
                  <TextArea
                    rows="6"
                    onChange={(e) =>
                      setItem({ ...item, description: e.target.value })
                    }
                    value={item.description}
                    type="text"
                    placeholder="Description"
                  />
                  <SubmitButton onclick={onSubmit}>
                    <SignUpIcon className="icon" />
                    <span className="text">Add Item</span>
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
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
