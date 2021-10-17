import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "assets/helpers/AnimationRevealPage.js";
import Hero from "components/TwoColumnWithVideo.js";
import Features from "components/ThreeColSimple.js";
import MainFeature from "components/TwoColWithButton.js";
import MainFeature2 from "components/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/TabCardGrid.js";
import Testimonial from "components/ThreeColumnWithProfileImage.js";
import Footer from "components/FiveColumnWithInputForm.js";

// import chefIconImageSrc from "assets/images/chef-icon.svg";
// import celebrationIconImageSrc from "assets/images/celebration-icon.svg";
// import shopIconImageSrc from "assets/images/shop-icon.svg";

const Subheading = tw.span`tracking-wider text-sm font-medium`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
// const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;

const imageCss = tw`rounded-4xl`;
export const Home = () => {
  return (
    <AnimationRevealPage>
      <Hero />
      <MainFeature />
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Checkout our <HighlightedText>menu.</HighlightedText>
          </>
        }
      />
      <Features
        heading={
          <>
            Amazing <HighlightedText>Services.</HighlightedText>
          </>
        }
        cards={[
          {
            imageSrc:
              "https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5vbnltb3VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            title: "230+ Locations",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://google.com",
          },
          {
            imageSrc:
              "https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5vbnltb3VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            title: "Professional Craftsmen",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://timerse.com",
          },
          {
            imageSrc:
              "https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5vbnltb3VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            title: "Many More",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://reddit.com",
          },
        ]}
        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
      />
      <MainFeature2
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={
          <>
            Why <HighlightedText>Choose Us ?</HighlightedText>
          </>
        }
        statistics={[
          {
            key: "Orders",
            value: "94000+",
          },
          {
            key: "Customers",
            value: "11000+",
          },
          {
            key: "Craftsman",
            value: "1500+",
          },
        ]}
        primaryButtonText="Order Now"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc="https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5vbnltb3VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <Testimonial
        subheading=""
        heading={
          <>
            Customers <HighlightedText>Love Us.</HighlightedText>
          </>
        }
      />

      <Footer />
    </AnimationRevealPage>
  );
};
