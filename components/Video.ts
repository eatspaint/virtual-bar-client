import { jwt } from 'twilio';
import { connect } from 'twilio-video';

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateToken = () => {
  const { twilio_sid, twilio_api_key, twilio_api_secret } = process.env;
  const token = new jwt.AccessToken(
    twilio_sid,
    twilio_api_key,
    twilio_api_secret
  );
  // @ts-ignore
  token.identity = `somebody-${getRandomIntInclusive(1, 100)}`;
  const videoGrant = new jwt.AccessToken.VideoGrant();
  token.addGrant(videoGrant);
  return token.toJwt();
};

const connectToRoom = ({ token, roomName }) => {
  return connect(token, {
    name: roomName,
    region: 'gll',
    preferredVideoCodecs: [{ codec: 'VP8', simulcast: false }]
  });
};

export default { connectToRoom, generateToken };
