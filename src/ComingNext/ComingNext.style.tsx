import styled from "styled-components/macro";

export const ComingNextStyled = styled.div`
  width: calc(100vw - 40px);
  margin: 20px;
  text-align: center;
`;

export const ComingNextGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: auto;
  }
`;

export const ComingNextCell = styled.div`
  height: calc(50vh - 120px);
  background: rgba(0, 44, 69, 0.6);
  border: 1px solid #0a5688;
  padding: 10px;
  overflow: scroll;

  > img {
    height: 70%;
  }

  > h3 {
    margin-top: 0 !important;
  }

  > div {
    text-align: left;
  }

  @media (max-width: 900px) {
    width: calc(100vw - 40px);
    height: auto;

    > img {
      width: 70%;
      height: auto;
    }
  }
`;
