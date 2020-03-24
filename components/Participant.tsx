import React, { createRef, useEffect, useState } from 'react';

const Participant = ({ gain, participant, isYou }) => {
  const [videoRef] = useState(createRef<HTMLVideoElement>());
  const [audioCtx] = useState(
    // @ts-ignore
    new (window.AudioContext || window.webkitAudioContext)()
  );

  const playTrack = track => {
    switch (track.kind) {
      case 'audio':
        if (!isYou) {
          // Don't play your own audio
          var audio = new Audio();
          audio.srcObject = postProcessAudioTrack(track);
        }
        break;
      case 'video':
        taggedLog('Creating new MediaStream');
        taggedLog('track:', track);
        const { mediaStreamTrack } = track;
        const stream = new MediaStream();
        stream.addTrack(mediaStreamTrack);
        videoRef.current!.srcObject = stream;
        break;
      default:
        taggedLog('non-audio or video track:', track);
    }
  };

  useEffect(() => {
    participant.tracks.forEach(({ track }) => {
      // sometimes track is `null` (?!), so check if it's real
      track && playTrack(track);
    });

    const onTrackSubscribed = track => {
      taggedLog(`trackSubscribed (${track.kind})`, track);
      playTrack(track);
    };

    participant.on('trackSubscribed', onTrackSubscribed);
    return () => {
      audioCtx.close();
      participant.off('trackSubscribed', onTrackSubscribed);
    };
  }, [participant, videoRef.current]);

  const postProcessAudioTrack = audioTrack => {
    // Manually add the stream so that we can post-process the audio
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
