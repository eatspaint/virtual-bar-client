import React from 'react';
import styled from 'styled-components';
import { flexCentered } from './styles';

const ConversationContainer = styled.div`
  grid-row: top / bottom;
  grid-column: left / right;
  ${flexCentered};
`;

const Conversation = () => {
  return (
    <ConversationContainer>
      <p>Conversation</p>
    </ConversationContainer>
  );
};

export default Conversation;
