import styled from 'styled-components/macro'

export const ChapterStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  height: calc(100vh - 130px);
  margin: 0 20px;

  @media (max-width: 900px) {
    grid-template-columns: auto;
    height: initial;
    margin: 0 10px;
  }
`

export const ChapterGrid = styled.div`
  display: grid;
  grid-template-rows: 500px auto;
  grid-gap: 20px;
  overflow-y: scroll;

  @media (max-width: 900px) {
    overflow-y: initial;
    grid-template-rows: auto auto;
    margin-bottom: 20px;
  }
`

export const ChapterCourse = styled.div`
  background: rgba(0, 44, 69, 0.6);
  border: 1px solid #0a5688;
  padding: 20px;
  font-size: 14px;
  white-space: pre-wrap;
  overflow: auto;
  position: relative;
`

export const ChapterH1 = styled.div`
  font-size: 32px;
  line-height: 38px;

  @media (max-width: 900px) {
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  }
`

export const ChapterH2 = styled.div`
  font-size: 24px;
  line-height: 28px;
  margin-top: 20px;

  @media (max-width: 900px) {
    font-size: 20px;
    line-height: 24px;
  }
`

export const ChapterValidator = styled.div`
  border: 1px solid #0a5688;
  position: relative;

  &.ok {
    border-color: #12650a;
  }
`

export const ChapterValidatorInside = styled.div`
  height: calc(100% - 20px);
  padding: 16px;
  background: url('/elements/card-bg.png') repeat;
  margin: 10px;
  border: 1px solid #0e334a;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &.ok {
    border: 1px solid #124e19;
    background: url('/elements/card-bg-green.png') repeat;
  }
`

export const ChapterValidatorTitle = styled.div`
  font-size: 32px;
`

export const ChapterValidatorContent = styled.div`
  font-size: 12px;
`

export const ChapterValidatorContentWrapper = styled.div``

export const Button = styled.div`
  font-size: 14px;
  width: 200px;
  height: 40px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 20px auto 10px auto;
`

export const ButtonBorder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border: 1px solid transparent;
  border-image-source: url('/elements/button-border.svg');
  border-image-slice: 24 28 fill;
  border-image-width: 100px;
  content: '';
  z-index: 0;
`

export const ButtonText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 40px;
  z-index: 1;
  color: #fff;
  text-align: center;
`

export const ChapterMonaco = styled.div`
  border: 1px solid #0a5688;
`

export const ChapterItalic = styled.em`
  color: #42edf8 !important;
  /* text-shadow: 0px 0px 25px rgba(11, 183, 226, 0.65), 0px 0px 15px rgba(0, 112, 202, 0.6); */
  text-transform: none;
  font-style: normal;
`
