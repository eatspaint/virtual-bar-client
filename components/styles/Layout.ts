import styled, { css } from "styled-components";

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: [left] 1fr [center] 1fr [right];
  grid-template-rows: [top] 1fr [center] 1fr [bottom];
  div {
    border: 1px solid black;
  }
`;

const layoutTop = css`
  grid-row: top / center;
  grid-column: left / right;
`;

const layoutBottomLeft = css`
  grid-row: center / bottom;
  grid-column: left / center;
`;

const layoutBottomRight = css`
  grid-row: center / bottom;
  grid-column: center / right;
`;

export default {
  LayoutContainer,
  layoutTop,
  layoutBottomLeft,
  layoutBottomRight,
};
