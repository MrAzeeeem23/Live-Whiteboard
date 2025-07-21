// src/components/Toolbar.js
import socket from "../socket";

export default function Toolbar({ tool, setTool, roomId }) {
  return (
    <div className="flex items-center space-x-4 p-2 bg-gray-200 rounded-2xl px-2">
      <label>
        <input
          type="color"
          value={tool.color}
          onChange={(e) => setTool({ ...tool, color: e.target.value })}
        />
      </label>
      <label className="flex items-center space-x-1">
      <span>Pencil</span>
        <input
          type="radio"
          checked
        />
      </label>
      <label className="flex items-center space-x-1">
        <span>Width</span>
        <input
          type="range"
          min="1"
          max="10"
          value={tool.width}
          onChange={(e) =>
            setTool({ ...tool, width: parseInt(e.target.value) })
          }
        />
      </label>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => socket.emit("clear-canvas", { roomId })}
      >
        Clear
      </button>
      <a href="/" className="bg-red-500 text-white px-3 py-1 rounded">
        Leave Room
      </a>
    </div>
  );
}
