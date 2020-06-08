import styled from 'styled-components/macro'
import { bgTextColor, primaryColor, subTextColor } from 'styles'

export const HeaderStyled = styled.div`
  margin-bottom: 20px;
  position: relative;
  text-align: center;
  z-index: 1;

  .user {
    position: absolute;
    top: 8px;
    right: 10px;
  }
`

export const HeaderLogo = styled.img`
  padding: 7px;
  z-index: 1;
  margin: auto;
`

export const HeaderBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 65px;
  width: 100vw;
  display: grid;
  z-index: -1;
  grid-template-columns: 20vw 50px calc(60vw - 100px) 50px 20vw;

  .menu-top-left {
    height: 65px;
    width: 20vw;
  }
  .menu-left {
    height: 65px;
    width: 50px;
  }
  .menu-bottom {
    height: 65px;
    width: calc(60vw - 100px);
  }
  .menu-right {
    height: 65px;
    width: 50px;
  }
  .menu-top-right {
    height: 65px;
    width: 20vw;
  }

  @media (max-width: 900px) {
    grid-template-columns: 40px 50px calc(100vw - 180px) 50px 40px;

    .menu-top-left {
      height: 65px;
      width: 40px;
    }
    .menu-left {
      height: 65px;
      width: 50px;
    }
    .menu-bottom {
      height: 65px;
      width: calc(100vw - 180px);
    }
    .menu-right {
      height: 65px;
      width: 50px;
    }
    .menu-top-right {
      height: 65px;
      width: 40px;
    }
  }
`

export const HeaderLoggedOut = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
`

export const HeaderLoggedIn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  text-transform: uppercase;
`

export const HeaderMenuItem = styled.div`
  position: relative;
  color: ${subTextColor};
  line-height: 40px;
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  padding: 0 20px;

  &.login {
    background-color: ${primaryColor};
    color: ${bgTextColor};
    width: 128px;
    display: grid;
    grid-template-columns: auto 50px;
    text-align: right;

    > div {
      line-height: 40px;
    }

    > svg {
      height: 28px;
      width: 28px;
      margin: 11px;
      stroke: ${bgTextColor};
    }
  }

  @media (max-width: 1440px) {
    padding: 0 10px;
  }
`
