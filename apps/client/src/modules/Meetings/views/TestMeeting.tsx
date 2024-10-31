
import { StreamCall, StreamVideo, StreamVideoClient, User, useCall, useCallStateHooks, ParticipantView } from '@stream-io/video-react-sdk';
// import { API_KEY_STREAM_CLIENT, STREAM_SECRET_KEY, STREAM_USER_ID } from '../../config/environments';

// add styles for the video UI
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { set } from 'date-fns';
import { useEffect, useState } from 'react';

const apiKey = 'mmhfdzb5evj2'; // the API key can be found in the "Credentials" section
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiR2VuZXJhbF9Dcml4X01hZGluZSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvR2VuZXJhbF9Dcml4X01hZGluZSIsImlhdCI6MTcxNDkxNTYxMSwiZXhwIjoxNzE1NTIwNDE2fQ.dXEP2DJ-FmMU18MbCxwbhZGhn6M1rhY2oq8jISmyDu8'; // the token can be found in the "Credentials" section
const userId = 'General_Crix_Madine'; // the user id can be found in the "Credentials" section
const callId = 'lwaC6PJR9sau'; // the call id can be found in the "Credentials" section

// set up the user object
const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);


const TestMeeting = () => {
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    setOpenView(true);
    call.join({ create: true });


    return () => {
      call.leave();
      setOpenView(false);
    }
  },[])

  return (
    <>
      {openView && (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <MyLivestreamUI />
          </StreamCall>
        </StreamVideo>
      )}
    </>
  )
}

export default TestMeeting

export const MyLivestreamUI = () => {
  const call = useCall();
  const {
    useIsCallLive,
    useLocalParticipant,
    useParticipantCount,
    // ... more hooks
  } = useCallStateHooks();

  const totalParticipants = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: "45vw", height: "20vh" }}>
      <div
        style={{
          alignSelf: 'flex-start',
          color: 'white',
          backgroundColor: 'blue',
          borderRadius: '8px',
          padding: '4px 6px',
        }}
      >
        Live: {totalParticipants}
      </div>
      <div style={{ flex: 1 }}>
        {localParticipant && (
          <ParticipantView
            participant={localParticipant}
            // disables the extra UI elements as such:
            // name, audio, video indicator, etc...
            ParticipantViewUI={null}
          />
        )}
      </div>
      <div style={{ alignSelf: 'center' }}>
        {isCallLive ? (
          <button onClick={() => call?.stopLive()}>Stop Livestream</button>
        ) : (
          <button onClick={() => call?.goLive()}>Start Livestream</button>
        )}
      </div>
    </div>
  );
};
