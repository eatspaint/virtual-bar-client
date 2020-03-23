import { jwt } from 'twilio';
import { connect } from 'twilio-video';

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateToken = () => {
  const twilioAccountSid = process.env.TWILIO_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;
  const token = new jwt.AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret
  );
  // @ts-ignore
  token.identity = `somebody-${getRandomIntInclusive(1, 100)}`;
  const videoGrant = new jwt.AccessToken.VideoGrant();
  token.addGrant(videoGrant);
  return token.toJwt();
}

const connectToRoom = ({ token, roomName }) => {
  return connect(token, { name: roomName });
};

export default { connectToRoom, generateToken };
