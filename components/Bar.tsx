import React from 'react';
import styled from 'styled-components';
import { Layout, flexCentered } from './styles';

const { layoutBottomRight } = Layout;

const BarContainer = styled.div`
  ${layoutBottomRight};
  ${flexCentered};
`;

const Bar = () => {
  return (
    <BarContainer>
      <p>Bar</p>
    </BarContainer>
  );
};

export default Bar;
