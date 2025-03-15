"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";


export default function DartScoreboardCell({
  score,
  type,
  onInputCallback,
}: {
  score: number | string;
  type: "Round Score" | "Total Score" | "Tally";
  onInputCallback?: (value: number) => void; // specify the expected value type
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [newScore, setNewScore] = useState(score);

  const handleScoreChange = (value: number) => {
    setNewScore(value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onInputCallback?.(Number(newScore));
    setNewScore("");
  }

  // useEffect(() => {
  //   if (isClicked) {
  //     const timeout = setTimeout(() => {
  //       setIsClicked(false);
  //     }, 1000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [isClicked]);

  return (
    <div>
      {type === "Round Score" &&
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e); // updated to use onInputCallback
      }}>
        <Input
          type="number"
          value={newScore}
          onChange={(e) => {
            handleScoreChange(Number(e.target.value)); // updated to use onInputCallback
          }}
          className="w-14 h-14 font-bold flex items-center justify-center justify-self-center"
        />
      </form>}
      {type === "Total Score" &&
        <Input
          type="number"
          value={score}
          onChange={(e) => {
            onInputCallback?.(Number(e.target.value)); // updated to use onInputCallback
          }}
          className="w-14 h-14 text-2xl font-bold flex items-center justify-center justify-self-center"
        />
      }
      {type === "Tally" && <button
        onClick={() => onInputCallback?.(1)} 
        className={`${isClicked ? "bg-gray-200" : "bg-none"
          } w-12 h-12 text-2xl font-bold rounded-full flex items-center justify-center justify-self-center`}
      >
        {score === 1 ? "/" : score === 2 ? "X" : score === 3 ? "O" : ""}
      </button>}
    </div>
  );
}