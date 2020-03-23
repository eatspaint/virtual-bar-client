import React from 'react';
import styled from 'styled-components';
import { Layout } from './styles';
import { Conversation, Me, Settings } from './';

const { layoutTop } = Layout;

const FocusContainer = styled.div`
  ${layoutTop};
  display: grid;
  grid-template-columns: [left] 75px [focus-left] 1fr [focus-right] 75px [right];
  grid-template-rows: [top] 75px [focus-top] 1fr [focus-bottom] 75px [bottom];
`;

const Focus = ({ localParticipant, participants }) => {
  return (
    <FocusContainer>
      <Conversation
        localParticipant={localParticipant}
        participants={participants}
      />
      <Settings />
      <Me />
    </FocusContainer>
  );
};

export default Focus;
