import React, { createRef, useEffect, useState } from 'react';

const Participant = ({ gain, participant, isYou }) => {
  const [videoRef] = useState(createRef<HTMLVideoElement>());

  const playTrack = track => {
    if (track.kind === 'audio') {
      if (!isYou) {
        // Don't play your own audio
        var audio = new Audio();
        audio.srcObject = postProcessAudioTrack(track);
      }
    } else if (track.kind === 'video') {
      taggedLog('Creating new MediaStream');
      taggedLog('track:', track);
      const mediaStreamTrack = track.mediaStreamTrack;
      const stream = new MediaStream();
      stream.addTrack(mediaStreamTrack);
      // @ts-ignore
      videoRef.current.srcObject = stream;
    } else {
      taggedLog('non-audio or video track:', track);
    }
  };

  useEffect(() => {
    participant.tracks.forEach(publication => {
      // sometimes it passes `null` (?!), so check if it's real
      if (publication.track) {
        playTrack(publication.track);
      }
    });

    participant.on('trackSubscribed', track => {
      taggedLog(`trackSubscribed (${track.kind})`, track);
      playTrack(track);
    });
  }, [participant, videoRef.current]);

  const postProcessAudioTrack = audioTrack => {
    // Manually add the stream so that we can post-process the audio
    // @ts-ignore
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const stream = new MediaStream();
    stream.addTrack(audioTrack.mediaStreamTrack);
    const source = audioCtx.createMediaStreamSource(stream);

    // mute
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);

    // hook it all up: source -> gain -> speakers
    source.connect(gainNode).connect(audioCtx.destination);

    return stream;
  };

  const taggedLog = (...args) => {
    const identity = isYou ? 'you' : participant.identity;
    console.log(...[`[${identity}]`, ...args]);
  };

  return (
    <div>
      <h2>
        Name: {participant.identity}
        {isYou && ' (you)'}
      </h2>
      <video width="200" height="160" autoPlay playsInline ref={videoRef} />
    </div>
  );
};

export default Participant;
