import styled from "styled-components/macro";

export const LightStyled = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 32px;
  line-height: 38px;
  color: #ff0000;
  text-shadow: 0px 0px 25px #c90000;
  animation-name: opacity;
  animation-duration: 2s;
  animation-iteration-count: infinite;

  @keyframes opacity {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: auto;
    position: relative;
    margin: auto;
    text-align: center;
    top: 0px;
    right: 0px;
  }
`;
