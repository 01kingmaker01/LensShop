import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
// import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import { ReactComponent as SvgDotPattern } from "assets/svgs/dot-pattern.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.img(tw`rounded`);

const DecoratorBlob = styled(SvgDotPattern)((props) => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(
  SubheadingBase
)`text-center md:text-left tracking-wider text-sm font-medium`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl md:text-left leading-tight`;
const Description = tw.p`mt-12 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100  inline-block`;

const PrimaryButton = styled(PrimaryButtonBase)((props) => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`,
]);

const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

export default () => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image
            css={tw`rounded-4xl`}
            src="https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5vbnltb3VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
          />
          <DecoratorBlob
            css={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
          />
        </ImageColumn>
        <TextColumn>
          <TextContent>
            <Subheading>Established Since 2014</Subheading>
            <Heading>
              We've been serving for
              <wbr /> <HighlightedText>over 5 years.</HighlightedText>
            </Heading>
            <Description>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Description>
            <PrimaryButton as="a" href="#">
              Latest Offers
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
