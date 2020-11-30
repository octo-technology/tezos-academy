import { jet, pew, shakes } from 'pages/Chapter/Chapter.components/Ship/Ship.style'
import styled from 'styled-components/macro'

export const HomeStyled = styled.div``

export const HomeComets = styled.div`
  position: absolute;
  top: 0;
  right: 100px;
  z-index: 0;
  width: 50%;
  height: 100vh;

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
`

export const HomeHeader = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  max-width: 1280px;
  margin: auto;

  @media (max-width: 600px) {
    height: initial;
  }
`

export const HomeHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: auto;
  }
`

export const HomeHeaderOcto = styled.div`
  margin: auto;
  text-align: center;

  @media (max-width: 1000px) {
    margin-top: -10vh;
  }

  @media (max-width: 900px) {
    display: none;
  }
`

export const HomeHeaderLeft = styled.div`
  margin: calc(50vh - 200px) 0 calc(50vh - 200px) 50px;

  > p {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    margin: calc(50vh - 200px) 20px;
  }
`

export const HomeHeaderRight = styled.div`
  position: relative;
  margin: calc(50vh - 200px) 0 calc(50vh - 200px) 100px;

  @media (max-width: 900px) {
    margin: calc(50vh - 200px) 0 calc(50vh - 200px) 20px;
  }
`

export const HomeShip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${shakes} 1s linear infinite;

  .flame {
    position: absolute;
    top: 180px;
    left: 101px;
    animation: ${jet} 0.02s ease alternate infinite;
  }

  .laser {
    position: absolute;
    top: -200px;
    left: 67px;
    animation: ${jet} 0.02s ease alternate infinite, ${pew} 10s linear alternate infinite;
  }

  @media (max-width: 600px) {
    top: -50px;
    left: calc(50% - 148px);
  }
`

export const HomeAdventure = styled.div`
  width: 100%;
  padding: 50px;
  background: rgba(0, 44, 69, 0.6);
  border-top: 1px solid rgb(10, 86, 136);
  border-bottom: 1px solid rgb(10, 86, 136);
  text-align: center;

  > h1 {
    margin-bottom: 0;
  }

  > p {
    font-size: 20px;
  }

  > img {
    width: 852px;
    max-width: 90vw;
    margin: 50px auto;
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`

export const HomeLanguage = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: 50px;
  text-align: center;

  > h1 {
    margin-bottom: 0;
  }

  > p {
    font-size: 20px;
  }
`

export const HomeLanguageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin: 50px;

  p {
    font-size: 16px;
    color: #08658b;
  }

  > div > img {
    display: block;
    margin: 30px;
    margin: 30px auto;
  }

  @media (max-width: 900px) {
    grid-template-columns: auto;
  }

  @media (max-width: 600px) {
    margin: 0;
  }
`

export const HomeEditor = styled.div`
  width: 100%;
  padding: 50px 0 0 0;
  background: rgba(0, 44, 69, 0.6);
  border-top: 1px solid rgb(10, 86, 136);
  border-bottom: 1px solid rgb(10, 86, 136);
  text-align: center;

  > h1 {
    margin-bottom: 0;
  }

  > p {
    font-size: 20px;
  }

  > img {
    width: 852px;
    max-width: 90vw;
    margin: 70px auto 0;
    display: block;
  }
`

export const HomeBadge = styled.div`
  width: 100%;
  max-width: 900px;
  margin: auto;
  padding: 50px;
  text-align: center;

  > h1 {
    margin-bottom: 0;
  }

  > p {
    font-size: 20px;
  }
`

export const HomeBadgeGrid = styled.div`
  display: grid;
  grid-template-columns: 176px auto;
  grid-gap: 60px;
  text-align: right;
  margin: 60px auto;

  > p {
    font-size: 16px;
    color: #08658b;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  @media (max-width: 600px) {
    margin: 20px auto;
    grid-template-columns: auto;
    grid-gap: 10px;

    > img {
      margin: auto;
    }
  }
`

export const HomeAlert = styled.div`
  width: 100%;
  background: rgba(0, 44, 69, 0.6);
  border-top: 1px solid rgb(10, 86, 136);
  border-bottom: 1px solid rgb(10, 86, 136);
  text-align: center;
  padding-bottom: 100px;
  position: relative;

  > img {
    width: 986px;
    max-width: 90vw;
  }

  @media (max-width: 600px) {
    padding-bottom: 20px;
  }
`

export const HomeAlertBand = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 75px;
  width: 100%;
  background-image: url('/images/under-attack.svg');
`

export const HomeAlertText = styled.div`
  margin-top: -100px;

  > div {
    display: block;
  }

  @media (max-width: 600px) {
    margin-top: -30px;
  }
`

export const HomeFooter = styled.div`
  background: #000;
  width: 100%;
`

export const HomeFooterGrid = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: 50px 0;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr;
  grid-gap: 30px;
  font-family: 'Proxima Nova';

  a {
    text-decoration: underline !important;
    display: block;
    line-height: 20px;
  }

  @media (max-width: 900px) {
    grid-template-columns: auto;
    text-align: center;

    img {
      margin: auto;
    }
  }
`
