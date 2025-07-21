import React, { useEffect, useState } from 'react';
import DrawingCanvas from './DrawingCanvas';
import Toolbar from './Toolbar';
import socket from '../socket';

export default function Whiteboard({ roomId }) {
  const [users, setUsers] = useState(1);
  const [tool, setTool] = useState({ color: 'black', width: 2 });

  useEffect(() => {
    const userId = crypto.randomUUID();
    socket.emit('join-room', { roomId, userId });

    socket.on('user-count', setUsers);

    return () => {
      socket.emit('leave-room', roomId);
      socket.off('user-count');
    };
  }, [roomId]);

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <div className="flex justify-between items-center p-4 border-b bg-gray-100">
        <h1 className="text-xl font-semibold">Room: {roomId}</h1>
        <span>Active users: {users}</span>
      </div>
      <Toolbar tool={tool} setTool={setTool} roomId={roomId} />
      <DrawingCanvas tool={tool} roomId={roomId} />
    </div>
  );
}
