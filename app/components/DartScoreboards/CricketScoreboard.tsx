'use client';

import { useState, useEffect } from "react";

import { Separator } from "@/components/ui/separator"
import { Homemade_Apple, Splash, Cabin_Sketch } from "next/font/google";
import DartScoreboardCell from "../DartScoreboardCell";


const appleFont = Homemade_Apple({ weight: "400", subsets: ["latin"], });
const splashFont = Splash({ weight: "400", subsets: ["latin"], });
const cabinFont = Cabin_Sketch({ weight: ["400", "700"], subsets: ["latin"], });


export default function CrickettScoreboard() {
  const scoreboardValues = ["20", "19", "18", "17", "16", "15", 'BULL'];
  const [player1Points, setPlayer1Points] = useState<number[]>([]);
  const [player2Points, setPlayer2Points] = useState<number[]>([]);
  const [player1Tally, setPlayer1Tally] = useState<number[]>([]);
  const [player2Tally, setPlayer2Tally] = useState<number[]>([]);
  const [showRemovePopup, setShowRemovePopup] = useState<{ player: number; index: number } | null>(null);

  const handlePlayerPoints = (player: number, index: number, value: number, operation="Add") => {
    const points = player === 1 ? player1Points : player2Points;
    const setPoints = player === 1 ? setPlayer1Points : setPlayer2Points;

    const updatedPoints = [...points];
    if (operation === "Remove") {
      updatedPoints.splice(index, 1); // remove points from the specific index
    } else {
      updatedPoints.push(value);
    }
    setPoints(updatedPoints);
  };

  const handlePlayer1Tally = (index: number, value: number) => {
    let newTally = player1Tally[index] ?? 0;
    if (newTally > 3) {
      newTally = 0;
    }
    const updatedTallies = [...player1Tally];
    updatedTallies[index] = newTally + value;
    setPlayer1Tally(updatedTallies);
  };

  const handlePlayer2Tally = (index: number, value: number) => {
    let newTally = player2Tally[index] ?? 0;
    if (newTally > 3) {
      newTally = 0;
    }
    const updatedTallies = [...player2Tally];
    updatedTallies[index] = newTally + value;
    setPlayer2Tally(updatedTallies);
  };

  const resetGame = () => {
    setPlayer1Points([]);
    setPlayer2Points([]);
    setPlayer1Tally([]);
    setPlayer2Tally([]);
  };

  const completeGame = () => {
    console.log("Game Over");
  };

  return (
    < >
      {scoreboardValues.map((value, index) => (
        <div key={index} className="grid grid-cols-5 col-span-5 ">
            <div className={`py-1 col-span-1 justify-center items-center self-center`} onClick={() => setShowRemovePopup({ player: 1, index })}>
            
            <p> {player1Points.slice(-scoreboardValues.length)[index] ?? ""} </p>
            </div>
            {showRemovePopup?.player === 1 && showRemovePopup?.index === index && (
            <div className="absolute bg-stone-900 border border-gray-900 p-2 rounded shadow-lg">
              <p>Remove?</p>
              <button onClick={() => { handlePlayerPoints(1, index, 0, "Remove"); setShowRemovePopup(null); }} className="bg-red-500 text-white px-2 py-1 rounded">Yes</button>
              <button onClick={() => setShowRemovePopup(null)} className="bg-gray-500 text-white px-2 py-1 rounded">No</button>
            </div>
            )}
          <div className={`${splashFont.className} py-1 col-span-1 justify-center items-center self-center`}>
            <DartScoreboardCell
              score={player1Tally[index] ?? ""}
              type="Tally"
              onInputCallback={(value) => handlePlayer1Tally(index, value)}
            />
          </div>
          <div className="border-x border-solid border-stone-400 py-4">
            {value}
          </div>
          <div className={`${splashFont.className} py-1 col-span-1 justify-center items-center self-center`}>
            <DartScoreboardCell score={player2Tally[index] ?? ""} type="Tally" onInputCallback={(value) => handlePlayer2Tally(index, value)} />
          </div>
          <div className={`py-1 col-span-1 justify-center items-center self-center`} onClick={() => handlePlayerPoints(2, index, 0, "Remove")}>
            <p> {player2Points.slice(-scoreboardValues.length)[index] ?? ""} </p>
          </div>
          {showRemovePopup?.player === 2 && showRemovePopup?.index === index && (
            <div className="absolute bg-stone-900 border border-gray-900 p-2 rounded shadow-lg">
              <p>Remove?</p>
              <button onClick={() => { handlePlayerPoints(2, index, 0, "Remove"); setShowRemovePopup(null); }} className="bg-red-500 text-white px-2 py-1 rounded">Yes</button>
              <button onClick={() => setShowRemovePopup(null)} className="bg-gray-500 text-white px-2 py-1 rounded">No</button>
              </div>
            )}
        </div>
      ))}

      <div className="grid grid-cols-5 col-span-5 ">
        <div className={`py-1 col-span-1 justify-center items-center self-center text-sm`}>
          <p>Add Points</p>
        </div>
        <div className={`py-1 col-span-1 justify-center items-center self-center text-sm`}>
          <p>Total Points</p>
        </div>
        <div className="col-span-1">
          <p> - </p>
        </div>
        <div className="col-span-1 justify-center items-center self-center text-sm">
          <p>Total Points</p>
        </div>
        <div className={`py-1 col-span-1 justify-center items-center self-center text-sm`}>
          <p>Add Points</p>
        </div>
      </div>

      <div className="grid grid-cols-5 col-span-5 ">
        <div className={`py-1 col-span-1 justify-center items-center self-center text-3xl`}>
          <DartScoreboardCell
            score={""}
            type="Round Score"
            onInputCallback={(value) => handlePlayerPoints(1, player1Points.length - 1, value)}
          />
        </div>
        <div className={`py-1 col-span-1 justify-center items-center self-center text-3xl`}>
          <p> {player1Points.reduce((acc, curr) => acc + curr, 0) ?? ""} </p>
        </div>
        <div className="col-span-1">
          <p> - </p>
        </div>
        <div className="col-span-1 justify-center items-center self-center text-3xl">
          <p>
            {player2Points.reduce((acc, curr) => acc + curr, 0) ?? ""}
          </p>
        </div>
        <div className={`py-1 col-span-1 justify-center items-center self-center text-3xl`}>
          <DartScoreboardCell score={""} type="Round Score" onInputCallback={(value) => handlePlayerPoints(2, player2Points.length - 1, value)} />
        </div>
      </div>
      <div className="grid grid-cols-5 col-span-5 ">
        <div className="col-span-5">
          <Separator className="my-2" />
        </div>
      </div>
      <div className="grid grid-cols-5 col-span-5 ">
        <div className="col-span-5">
          <button onClick={resetGame} className="bg-slate-800 text-white rounded-lg px-4 py-2">Reset Game</button>
        </div>
      </div>
      <div className="grid grid-cols-5 col-span-5 ">
        <div className="col-span-5">
          <Separator className="my-2" />
        </div>
      </div>
      <div className="grid grid-cols-5 col-span-5 ">
        <div className="col-span-5">
          <button onClick={completeGame} className="bg-slate-800 text-white rounded-lg px-4 py-2">Complete Game</button>
        </div>
      </div>
    </>
  );
}