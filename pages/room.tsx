// pages/room.tsx
import { useEffect, useRef } from 'react';
import { Room, connect } from 'livekit-client';

export default function RoomPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const connectToRoom = async () => {
      const url = "wss://supec-nutrarize-0uq1z17k.livekit.cloud"; // ← 君のLiveKit URL
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // ← 発行されたトークン

      const room = await connect(url, token, {
        video: true,
        audio: true,
      });

      room.localParticipant.videoTracks.forEach(publication => {
        const track = publication.track;
        if (track && videoRef.current) {
          track.attach(videoRef.current);
        }
      });
    };

    connectToRoom();
  }, []);

  return (
    <div>
      <h1>Supec Room</h1>
      <video ref={videoRef} autoPlay muted playsInline />
    </div>
  );
}