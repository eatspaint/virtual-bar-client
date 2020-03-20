import React from "react";
import styled from "styled-components";
import { Layout, flexCentered } from "./styles";

const { layoutBottomLeft } = Layout;

const PerformerContainer = styled.div`
  ${layoutBottomLeft};
  ${flexCentered};
`;

const Performer = () => {
  return (
    <PerformerContainer>
      <p>Performer</p>
    </PerformerContainer>
  );
};

export default Performer;
