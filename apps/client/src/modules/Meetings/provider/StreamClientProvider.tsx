import { FC, ReactNode, useEffect, useState } from 'react';

import { StreamCall, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';

import {} from '../config/environments'; 

interface StreamVideoProviderProps {
  children: ReactNode;
}

const StreamVideoProvider: FC<StreamVideoProviderProps> = ({ children }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  const newStreamVideoClient = () => {
    const getToken = fetch('http://localhost:4500/api/v1/liveStreamingStockAuction/userProvider', {}, );

    const {apiKey, userId, secret }: {apiKey:string, userId:string, secret: string} = getToken.data;

    const client = new StreamVideoClient({
      apiKey,
      user: {

      },
      tokenProvider
    });

    setVideoClient(client);

  };

  useEffect(() => {
    
  }, []);

   
  return (
    <StreamVideo client={videoClient}>
      <StreamCall call={call}>/* My Video UI */</StreamCall>
    </StreamVideo>
  );
};

export default StreamVideoProvider;
