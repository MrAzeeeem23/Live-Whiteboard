import { useState } from 'react';
import axios from 'axios';

export default function RoomJoin({ setRoomId }) {
  const [code, setCode] = useState('');
  const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

  const joinRoom = async () => {
    if (!code.trim()) return;
    await axios.post('http://localhost:3000/api/room/join', { roomId: code });
    setRoomId(code);
  };

  const generateCode = () => {
    let code = '';
    for(let i = 0; i < 5; i++){
      let random = Math.floor(Math.random() * str.length + 1)
      code += str.charAt(random);
    }
    setCode(code)
  }

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">Join Whiteboard Room</h2>
      <input
        type="text"
        placeholder="Enter Room Code"
        className="w-full border px-3 py-2 mb-4 rounded text-center"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={joinRoom}
      >
        Join Room
      </button>
      <button
        className="w-full bg-gray-600 mt-2 text-white py-2 rounded hover:bg-gray-700"
        onClick={generateCode}
      >
        Generate Room Code
      </button>
    </div>
  );
}
