import styled from 'styled-components/macro'

export const FooterStyled = styled.div`
  height: 50px;

  > a:nth-child(1) {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  > a:nth-child(2) {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  @media (max-width: 900px) {
    > a:nth-child(1) {
      display: none;
    }
  }
`

export const FooterCredits = styled.div`
  text-align: center;
  position: absolute;
  width: 100vw;
  bottom: 10px;
  left: 0;
  font-size: 12px;
  line-height: 14px;
  color: #08658b;

  a,
  a:visited {
    display: inline-block;
    color: #08658b;
    text-decoration: underline;
  }

  @media (max-width: 900px) {
    display: none;
  }
`
