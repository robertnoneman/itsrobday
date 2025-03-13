'use client';

import Pride from "react-canvas-confetti/dist/presets/pride";
import confetti from "canvas-confetti"
import randomInRange from "react-canvas-confetti/dist/helpers/randomInRange";
import React, { useEffect, useRef } from 'react';

export default function RobdayConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRobday = new Date().getDay() === 1;
  const sadFace = confetti.shapeFromText("😢");
  const decorateOptions = {
      // particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#FF69B4", "#00FF00", "#FFA500"],
      scalar: randomInRange(0.5, 15.5),
      particleCount: randomInRange(1, 2),
      shapes: [sadFace]
    };
    const decorateOptions2 = {
      // particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#FF69B4", "#00FF00", "#FFA500"],
      scalar: randomInRange(0.5, 15.5),
      particleCount: randomInRange(1, 2),
      shapes: [sadFace]
    };
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Proceed with OffscreenCanvas and canvas operations
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (canvas) {
          const offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
          const ctx = offscreenCanvas.getContext('2d');
          if (!ctx) return;
        }
        
        // Confetti drawing logic using ctx
      }
    }, []);

  return (
    <div>
      {isRobday ? (
          <Pride autorun={{ speed: 60, duration: 5000 }} />
        ) : (
          <div>
          <Pride autorun={{ speed: 60, duration: 5000 }} decorateOptions={() => decorateOptions} />
          <Pride autorun={{ speed: 60, duration: 5000 }} decorateOptions={() => decorateOptions2} />
          </div>
        )}
    </div>
  );
}
