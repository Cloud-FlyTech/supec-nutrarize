import { useEffect, useRef, useState } from 'react';
import { Room, connect } from 'livekit-client';

export default function RoomPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [joined, setJoined] = useState(false);

  const room = useRef<Room | null>(null);

  useEffect(() => {
    if (!joined) return;

    const connectToRoom = async () => {
      const url = 'wss://your-livekit-host.livekit.cloud'; // ←ここを自分のLiveKit URLに置き換える
      const token = 'your-temporary-token'; // ←今はテスト用に手動入力でOK（後で自動化）

      room.current = await connect(url, token, {
        video: true,
        audio: true,
      });

      room.current.localParticipant.videoTracks.forEach(publication => {
        const track = publication.track;
        if (track && videoRef.current) {
          track.attach(videoRef.current);
        }
      });
    };

    connectToRoom();

    return () => {
      room.current?.disconnect();
    };
  }, [joined]);

  return (
    <div style={{ textAlign: 'center', marginTop: '5vh' }}>
      <h1>Supec Room (Live)</h1>
      {!joined ? (
        <button
          onClick={() => setJoined(true)}
          style={{ padding: '12px 24px', fontSize: '16px' }}
        >
          Join Room
        </button>
      ) : (
        <video ref={videoRef} autoPlay muted style={{ width: '80%', marginTop: '20px' }} />
      )}
    </div>
  );
}
const token = "上の文字列";
const url = "wss://supec-nutrarize-0uq1z17k.livekit.cloud";