import styled from 'styled-components/macro'

export const AppStyled = styled.div`
  display: flex;
  justify-content: space-around;
`
export const AppBg = styled.div`
  min-height: calc(100vh - 80px);
  background-image: url('/images/bg2.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const AppWrapper = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  background: url('/images/grid.svg') repeat center top;
  /* height: 100vh; */
  will-change: transform, opacity;
`
