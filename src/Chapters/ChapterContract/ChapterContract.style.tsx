import styled from "styled-components/macro";

export const ChapterContractStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  height: calc(100vh - 40px);
`;

export const ChapterContractGrid = styled.div`
  display: grid;
  grid-template-rows: 440px auto;
  grid-gap: 20px;
`;

export const ChapterCourse = styled.div`
  background: rgba(0, 44, 69, 0.6);
  border: 1px solid #0a5688;
  padding: 20px;
`;

export const ChapterH1 = styled.div`
  font-size: 32px;
  line-height: 38px;
`;

export const ChapterH2 = styled.div`
  font-size: 24px;
  line-height: 28px;
`;

export const ChapterContent = styled.div`
  font-size: 14px;
  white-space: pre-wrap;
`;

export const ChapterValidator = styled.div`
  border: 1px solid #0a5688;
  position: relative;
`;

export const ChapterValidatorInside = styled.div`
  height: calc(100% - 20px);
  padding: 16px;
  background: url("/elements/card-bg.png") repeat;
  margin: 10px;
  border: 1px solid #0e334a;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ChapterValidatorTitle = styled.div`
  font-size: 32px;
`;

export const ChapterValidatorContent = styled.div`
  font-size: 12px;
`;

export const ChapterValidatorContentWrapper = styled.div``;

export const Button = styled.div`
  font-size: 14px;
  width: 200px;
  height: 40px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 20px auto;
`;

export const ButtonBorder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border: 1px solid transparent;
  border-image-source: url("elements/button-border.svg");
  border-image-slice: 24 28 fill;
  border-image-width: 100px;
  content: "";
  z-index: 0;
`;

export const ButtonText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 40px;
  z-index: 1;
`;
