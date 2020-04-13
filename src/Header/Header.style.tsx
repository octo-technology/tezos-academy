import styled from "styled-components/macro";

export const HeaderStyled = styled.div`
  margin-bottom: 20px;
  position: relative;
  text-align: center;

  .user {
    position: absolute;
    top: 8px;
    right: 10px;
  }
`;

export const HeaderLogo = styled.img`
  padding: 7px;
  z-index: 1;
  margin: auto;
`;

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
`;
