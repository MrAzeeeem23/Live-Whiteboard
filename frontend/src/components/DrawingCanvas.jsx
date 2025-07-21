import { useEffect, useRef } from 'react';
import socket from "../socket";

export default function DrawingCanvas({ tool, roomId }) {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 120;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctxRef.current = ctx;


    fetch(`http://localhost:3000/api/room/${roomId}`)
      .then(res => res.json())
      .then(room => {
        room.drawingData.forEach(cmd => {
          if (cmd.type === "stroke") {
            const d = cmd.data;
            drawLine(d.x1, d.y1, d.x2, d.y2, d.color, d.width);
          } else if (cmd.type === "clear") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        });
      });

    const drawLine = (x1, y1, x2, y2, color, width) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    socket.on('draw-move', (data) => {
      drawLine(data.x1, data.y1, data.x2, data.y2, data.color, data.width);
    });

    socket.on('clear-canvas', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      socket.off('draw-move');
      socket.off('clear-canvas');
    };
  }, [roomId]);

  const handleDraw = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!drawing.current) {
      drawing.current = true;
      canvas.lastX = x;
      canvas.lastY = y;
    } else {
      const data = {
        roomId,
        x1: canvas.lastX,
        y1: canvas.lastY,
        x2: x,
        y2: y,
        color: tool.color,
        width: tool.width
      };
      socket.emit('draw-move', data);
      const ctx = ctxRef.current;
      ctx.strokeStyle = tool.color;
      ctx.lineWidth = tool.width;
      ctx.beginPath();
      ctx.moveTo(data.x1, data.y1);
      ctx.lineTo(data.x2, data.y2);
      ctx.stroke();
      canvas.lastX = x;
      canvas.lastY = y;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="bg-white flex-1"
      onMouseDown={handleDraw}
      onMouseMove={(e) => drawing.current && handleDraw(e)}
      onMouseUp={() => (drawing.current = false)}
      onMouseLeave={() => (drawing.current = false)}
    />
  );
}
