import React from 'react';
import styled from 'styled-components';
import { flexCentered } from './styles';
import Participant from './Participant';
import { useRouter } from 'next/router';

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
    const { query } = useRouter();

    if (query?.gain) {
      // default to muting
      return parseInt(query.gain as string, 10) || 0;
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
