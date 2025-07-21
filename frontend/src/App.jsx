import React, { useState } from 'react';
import RoomJoin from './components/RoomJoin';
import Whiteboard from './components/Whiteboard';

function App() {
  const [roomId, setRoomId] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {roomId ? (
        <Whiteboard roomId={roomId} />
      ) : (
        <RoomJoin setRoomId={setRoomId} />
      )}
    </div>
  );
}

export default App;
