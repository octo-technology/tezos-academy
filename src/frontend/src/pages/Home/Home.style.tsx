import styled from 'styled-components/macro'

export const HomeStyled = styled.div``

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
  margin: 200px auto;
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
  grid-template-columns: 1fr 1fr;
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
