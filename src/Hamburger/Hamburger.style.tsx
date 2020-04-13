import styled from "styled-components/macro";

import { HamburgerBottomBackward } from "./Hamburger.styles/HamburgerBottomBackward";
import { HamburgerBottomForward } from "./Hamburger.styles/HamburgerBottomForward";
import { HamburgerTopBackward } from "./Hamburger.styles/HamburgerTopBackward";
import { HamburgerTopForward } from "./Hamburger.styles/HamburgerTopForward";

export const HamburgerStyled = styled.div`
  position: absolute;
  left: 10px;
  top: 8px;
  overflow: visible;
  margin: 0;
  height: 24px;
  box-sizing: content-box;
  cursor: pointer;
  z-index: 11;
  transform: scale(0.75);
`;

export const HamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
`;

export const HamburgerInner = styled.div`
  position: absolute;
  width: 40px;
  height: 1px;
  border-radius: 1px;
  will-change: transform;
  background-color: #fff;
`;

export const HamburgerInnerTop = styled(HamburgerInner)`
  top: 0;

  &.true {
    animation: ${HamburgerTopForward} 1s linear;
    animation-fill-mode: forwards;
  }

  &.false {
    animation: ${HamburgerTopBackward} 1s linear;
    animation-fill-mode: forwards;
  }
`;

export const HamburgerInnerMiddle = styled(HamburgerInner)`
  display: block;
  top: calc(50% - 1px);
`;

export const HamburgerInnerBottom = styled(HamburgerInner)`
  bottom: 1px;

  &.true {
    animation: ${HamburgerBottomForward} 1s linear;
    animation-fill-mode: forwards;
  }

  &.false {
    animation: ${HamburgerBottomBackward} 1s linear;
    animation-fill-mode: forwards;
  }
`;
