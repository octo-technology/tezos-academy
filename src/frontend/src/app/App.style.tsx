import styled from 'styled-components/macro'

export const AppStyled = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: calc(100vh - 80px);
  background-image: url('/images/bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const AppWrapper = styled.div`
  position: absolute;
  width: 100vw;
  /* height: 100vh; */
  will-change: transform, opacity;
`
