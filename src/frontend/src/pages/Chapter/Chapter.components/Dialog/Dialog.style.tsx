import styled from 'styled-components/macro'

export const DialogStyled = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 164px auto;
  grid-gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: auto;
  }
`

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
`

export const DialogText = styled.div``

export const DialogTextInside = styled.div`
  position: relative;
  background-image: url('/elements/dialog.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 10px 10px 30px 10px;
  margin-top: 7px;

  &.evil {
    font-family: 'Modern vulcan 1.1';
    font-size: 22px;
    background-image: url('/elements/dialog-evil.png');
  }

  @media (max-width: 900px) {
    grid-template-columns: auto;
    background-image: url('/elements/dialog-mobile.png');
    padding: 30px 10px 10px 10px;
    margin-top: -10px;

    &.evil {
      background-image: url('/elements/dialog-mobile-evil.png');
    }
  }
`
