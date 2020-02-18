import styled from "styled-components/macro";

export const CardStyled = styled.div`
  height: 370px;
  width: 270px;
  background: #000000;
  border: 1px solid #204c7a;
  box-sizing: border-box;
  box-shadow: 0px 0px 30px rgba(139, 243, 255, 0.2);
  position: relative;

  #comets line {
    fill: none;
    z-index: 10;
    stroke: #fff;
    stroke-width: 1;
    stroke-dasharray: 150 980;
    stroke-dashoffset: 150;
    animation: cometFall 10s ease-out infinite;
  }
  @-webkit-keyframes cometFall {
    5%,
    100% {
      stroke-dashoffset: -980;
    }
  }
  @keyframes cometFall {
    5%,
    100% {
      stroke-dashoffset: -980;
    }
  }
  #comets line:nth-child(1) {
    animation-delay: 4.5s;
  }
  #comets line:nth-child(2) {
    animation-delay: 2s;
  }
  #comets line:nth-child(4) {
    animation-delay: 2.5s;
  }
  #comets line:nth-child(5) {
    animation-delay: 1.5s;
  }
  #comets line:nth-child(6) {
    animation-delay: 4.5s;
  }
  #comets line:nth-child(7) {
    animation-delay: 7.5s;
  }
  #comets line:nth-child(8) {
    animation-delay: 4.5s;
  }
  #comets line:nth-child(9) {
    animation-delay: 6.5s;
  }
  #comets line:nth-child(10) {
    animation-delay: 9s;
  }
  #comets line:nth-child(11) {
    animation-delay: 8s;
  }
  #comets line:nth-child(12) {
    animation-delay: 3.5s;
  }
  #comets line:nth-child(13) {
    animation-delay: 0s;
  }
  #comets line:nth-child(14) {
    animation-delay: 4.5s;
  }
  #comets line:nth-child(15) {
    animation-delay: 1.5s;
  }
  #comets line:nth-child(16) {
    animation-delay: 1s;
  }
  #comets line:nth-child(17) {
    animation-delay: 8.5s;
  }
  #comets line:nth-child(18) {
    animation-delay: 5.5s;
  }
  #comets line:nth-child(19) {
    animation-delay: 7s;
  }
  #comets line:nth-child(20) {
    animation-delay: 9s;
  }
  #comets line:nth-child(21) {
    animation-delay: 3s;
  }
  #comets line:nth-child(22) {
    animation-delay: 6.5s;
  }
  #comets line:nth-child(23) {
    animation-delay: 2.5s;
  }
  #comets line:nth-child(24) {
    animation-delay: 9.5s;
  }
  #comets line:nth-child(25) {
    animation-delay: 0.4s;
  }
  #comets line:nth-child(26) {
    animation-delay: 3.2s;
  }
  #comets line:nth-child(27) {
    animation-delay: 7.1s;
  }
  #comets line:nth-child(28) {
    animation-delay: 4.9s;
  }
  #comets line:nth-child(29) {
    animation-delay: 6.8s;
  }
  #comets line:nth-child(30) {
    animation-delay: 3.6s;
  }
  #comets line:nth-child(31) {
    animation-delay: 9.3s;
  }
  #comets line:nth-child(32) {
    animation-delay: 7.2s;
  }
  #comets line:nth-child(33) {
    animation-delay: 3.5s;
  }
  #comets line:nth-child(34) {
    animation-delay: 7.3s;
  }
  #comets line:nth-child(35) {
    animation-delay: 1s;
  }
  #comets line:nth-child(36) {
    animation-delay: 5.9s;
  }
  #comets line:nth-child(37) {
    animation-delay: 8.3s;
  }
  #comets line:nth-child(38) {
    animation-delay: 7.3s;
  }
  #comets line:nth-child(39) {
    animation-delay: 5.8s;
  }
  #comets line:nth-child(40) {
    animation-delay: 2.8s;
  }
  #comets line:nth-child(41) {
    animation-delay: 5.1s;
  }
  #comets line:nth-child(42) {
    animation-delay: 9.2s;
  }
  #comets line:nth-child(43) {
    animation-delay: 5.2s;
  }
  #comets line:nth-child(44) {
    animation-delay: 6.7s;
  }
  #comets line:nth-child(45) {
    animation-delay: 3.3s;
  }
  #comets line:nth-child(46) {
    animation-delay: 5.3s;
  }
  #comets line:nth-child(47) {
    animation-delay: 7.7s;
  }
`;

export const CardTitle = styled.div`
  position: absolute;
  top: -8px;
  z-index: 1;
  color: #00edff;
  width: 100%;
  height: 29px;
  text-align: center;
  background-image: url(/elements/card-top.svg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: top;
  line-height: 27px;
`;

export const CardTopCorners = styled.div`
  top: 0;
  position: absolute;
  width: 100%;
  z-index: 1;

  &:empty::before,
  &:empty::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: #00edff;
    border-style: solid;

    &.ok {
      border-color: #0ab30b;
    }
  }

  &:empty::before {
    left: 0;
    border-width: 1px 0 0 1px;
  }

  &:empty::after {
    right: 0;
    border-width: 1px 1px 0 0;
  }
`;

export const CardBottomCorners = styled.div`
  bottom: 9px;
  position: absolute;
  width: 100%;
  z-index: 1;

  &:empty::before,
  &:empty::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: #00edff;
    border-style: solid;
  }

  &:empty::before {
    left: 0;
    border-width: 0 0 1px 1px;
  }

  &:empty::after {
    right: 0;
    border-width: 0 1px 1px 0;
  }
`;
