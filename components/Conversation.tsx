import React from 'react';
import styled from 'styled-components';
import { flexCentered } from './styles';
import Participant from './Participant';

const ConversationContainer = styled.div`
  grid-row: top / bottom;
  grid-column: left / right;
  ${flexCentered};
`;

const Conversation = ({ localParticipant, participants }) => {
  const isYou = participant => {
    return localParticipant.identity === participant.identity;
  };

  const findGain = () => {
    if (window) {
      const params = new URLSearchParams(window.location.search);
      // default to muting
      return parseInt(params.get('gain'), 10) || 0;
    } else {
      return 0;
    }
  };

  return (
    <ConversationContainer>
      <p>Conversation</p>
      {participants.map(p => (
        <Participant
          key={p.identity}
          gain={findGain()}
          participant={p}
          isYou={isYou(p)}
        />
      ))}
    </ConversationContainer>
  );
};

export default Conversation;
