import styled from "styled-components/macro";

export const DialogStyled = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 164px auto;
  grid-gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: auto;
  }
`;

export const DialogCharacter = styled.div`
  position: relative;
  height: 164px;
  width: 164px;
  margin: auto;

  .character-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 164px;
    width: 164px;
  }

  .glitch {
    width: 164px;
    height: 164px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .glitch .glitch__item {
    height: 148px;
    width: 148px;
    top: 8px;
    left: 8px;
    position: absolute;
  }

  .glitch .glitch__item:nth-child(n + 2) {
    opacity: 0;
    animation-duration: var(--time-anim);
    animation-delay: var(--delay-anim);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .glitch .glitch__item:nth-child(2) {
    background-color: var(--blend-color-2);
    background-blend-mode: var(--blend-mode-2);
    animation-name: glitch-anim-2;
  }
  .glitch .glitch__item:nth-child(2) {
    background-color: var(--blend-color-3);
    background-blend-mode: var(--blend-mode-3);
    animation-name: glitch-anim-3;
  }
  .glitch .glitch__item:nth-child(4) {
    background-color: var(--blend-color-4);
    background-blend-mode: var(--blend-mode-4);
    animation-name: glitch-anim-4;
  }
  .glitch .glitch__item:nth-child(5) {
    background-color: var(--blend-color-5);
    background-blend-mode: var(--blend-mode-5);
    animation-name: glitch-anim-flash;
  }
  @keyframes glitch-anim-flash {
    0%,
    5% {
      opacity: 0.2;
      transform: translate3d(var(--glitch-horizontal), var(--glitch-height), 0);
    }
    5.5%,
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes glitch-anim-2 {
    0% {
      opacity: 1;
      transform: translate3d(var(--gap-horizontal), 0, 0);
      -webkit-clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
      clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    }
    2% {
      -webkit-clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
      clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    }
    4% {
      -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
      clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    }
    6% {
      -webkit-clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
      clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    }
    8% {
      -webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
      clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    }
    10% {
      -webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
      clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    }
    12% {
      -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
      clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    }
    14% {
      -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
      clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }
    16% {
      -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
      clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }
    18% {
      -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
      clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }
    20% {
      -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
      clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    }
    21.9% {
      opacity: 1;
      transform: translate3d(var(--gap-horizontal), 0, 0);
    }
    22%,
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
      -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }
  @keyframes glitch-anim-3 {
    0% {
      opacity: 1;
      transform: translate3d(calc(-1 * var(--gap-horizontal)), 0, 0);
      -webkit-clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
      clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
    }
    3% {
      -webkit-clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
      clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
    }
    5% {
      -webkit-clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
      clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
    }
    7% {
      -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
      clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    }
    9% {
      -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
      clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
    }
    11% {
      -webkit-clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
      clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
    }
    13% {
      -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
      clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    }
    15% {
      -webkit-clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
      clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
    }
    17% {
      -webkit-clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
      clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
    }
    19% {
      -webkit-clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
      clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
    }
    20% {
      -webkit-clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
      clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
    }
    21.9% {
      opacity: 1;
      transform: translate3d(calc(-1 * var(--gap-horizontal)), 0, 0);
    }
    22%,
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
      -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }
  @keyframes glitch-anim-4 {
    0% {
      opacity: 1;
      transform: translate3d(0, calc(-1 * var(--gap-vertical)), 0) scale3d(-1, -1, 1);
      -webkit-clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
      clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
    }
    1.5% {
      -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
      clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
    }
    2% {
      -webkit-clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
      clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
    }
    2.5% {
      -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
      clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    }
    3% {
      -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
      clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
    }
    5% {
      -webkit-clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
      clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
    }
    5.5% {
      -webkit-clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
      clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
    }
    7% {
      -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
      clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
    }
    8% {
      -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
      clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
    }
    9% {
      -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
      clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
    }
    10.5% {
      -webkit-clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
      clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
    }
    11% {
      -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
      clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
    }
    13% {
      -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
      clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
    }
    14% {
      -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
      clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
    }
    14.5% {
      -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
      clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
    }
    15% {
      -webkit-clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
      clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
    }
    16% {
      -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
      clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    }
    18% {
      -webkit-clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
      clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
    }
    20% {
      -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
      clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
    }
    21.9% {
      opacity: 1;
      transform: translate3d(0, calc(-1 * var(--gap-vertical)), 0) scale3d(-1, -1, 1);
    }
    22%,
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
      -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }
`;

export const DialogText = styled.div``;

export const DialogTextInside = styled.div`
  position: relative;
  background-image: url("/elements/dialog.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 10px 10px 30px 10px;
  margin-top: 7px;

  @media (max-width: 900px) {
    grid-template-columns: auto;
    background-image: url("/elements/dialog-mobile.png");
    padding: 30px 10px 10px 10px;
    margin-top: -10px;
  }
`;
