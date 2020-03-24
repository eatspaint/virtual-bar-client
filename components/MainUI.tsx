import React, { useEffect, useState } from 'react';
import { Layout } from './styles';
import { Focus, Bar, Performer } from './';
import Video from './Video';

const { LayoutContainer } = Layout;

const MainUI = () => {
  const [participants, setParticipants] = useState([]);
  const [room, setRoom] = useState(null);
  const [localParticipant, setLocalParticipant] = useState(null);

  const addParticipant = participant => {
    console.log(`Participant "${participant.identity}" added`);
    setParticipants(previous => [...previous, participant]);
  };

  const removeParticipant = participant => {
    console.log(`Participant "${participant.identity}" REMOVED`);
    setParticipants(previous =>
      previous.filter(existing => existing.identity !== participant.identity)
    );
  };

  const prepareRoom = room => {
    setRoom(room);
    setLocalParticipant(room.localParticipant);
    window.addEventListener('beforeunload', () => room.disconnect());
    [
      ...Array.from(room.participants.values()),
      room.localParticipant
    ].forEach(participant => addParticipant(participant));
    room.on('participantConnected', participant => {
      console.log(`Participant connected: ${participant.identity}`);
      addParticipant(participant);
    });
    room.on('participantDisconnected', participant => {
      console.log(`Participant DISconnected: ${participant.identity}`);
      removeParticipant(participant);
    });
  };

  useEffect(() => {
    fetch('/api/token')
      .then(res => res.json())
      .then(data => {
        Video.connectToRoom({ token: data.token, roomName: 'cool-people-only' })
          .then(room => prepareRoom(room))
          .catch(err => console.log(err));
      });
    return () => room && room.disconnect();
  }, []);

  return (
    <LayoutContainer>
      <Focus participants={participants} localParticipant={localParticipant}
      />
      <Bar />
      <Performer />
    </LayoutContainer>
  );
};

export default MainUI;
