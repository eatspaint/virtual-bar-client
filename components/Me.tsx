import React from 'react';
import styled from 'styled-components';
import { flexCentered } from './styles';

const MeContainer = styled.div`
  grid-row: top / focus-top;
  grid-column: focus-right / right;
  ${flexCentered};
`;

const Me = () => {
  return (
    <MeContainer>
      <p>ME</p>
    </MeContainer>
  );
};

export default Me;
