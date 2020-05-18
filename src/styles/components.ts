import styled from "styled-components/macro";

import { fadeIn, fadeInFromLeft, fadeInFromTop, fadeInFromRight, fadeInFromBottom } from "./animations";

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const TextLight = styled.div`
  font-weight: 300;
`;

export const IconSmall = styled.img`
  width: 16px;
  height: 16px;
`;

export const Card = styled.div`
  background: rgba(0, 44, 69, 0.6);
  border: 1px solid #0a5688;
  padding: 20px;
  font-size: 14px;
  white-space: pre-wrap;
  overflow: auto;
  position: relative;
`;

export const AnimatedCard = styled.div`
  background: rgba(0, 44, 69, 0.6);
  border: 1px solid #0a5688;
  padding: 20px;
  font-size: 14px;
  white-space: pre-wrap;
  overflow: auto;
  position: relative;
  width: 800px;
  max-width: 100%;
  margin: 40px auto;
  will-change: opacity, transform;
  animation: ${fadeInFromLeft} 500ms;
`;

export const FadeIn = styled.div`
  will-change: opacity;
  animation: ${fadeIn} 500ms;
`;

export const FadeInFromTop = styled.div`
  will-change: opacity, transform;
  animation: ${fadeInFromTop} 500ms;
`;

export const FadeInFromRight = styled.div`
  will-change: opacity, transform;
  animation: ${fadeInFromRight} 500ms;
`;

export const FadeInFromBottom = styled.div`
  will-change: opacity, transform;
  animation: ${fadeInFromBottom} 500ms;
`;

export const FadeInFromLeft = styled.div`
  will-change: opacity, transform;
  animation: ${fadeInFromLeft} 500ms;
`;
