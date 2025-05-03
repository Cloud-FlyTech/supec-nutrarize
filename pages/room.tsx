import React, { useState } from 'react';

export default function Room() {
  const [joined, setJoined] = useState(false);

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Supec Room</h1>
      {joined ? (
        <p>You are now in the room. (Video/Audio features coming soon)</p>
      ) : (
        <button
          onClick={() => setJoined(true)}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Join Room
        </button>
      )}
    </div>
  );
}