'use client';

import Pride from "react-canvas-confetti/dist/presets/pride";
import confetti from "canvas-confetti"
import randomInRange from "react-canvas-confetti/dist/helpers/randomInRange";

export default function RobdayConfetti() {
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
