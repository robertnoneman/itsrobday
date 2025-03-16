'use client';

import { useState, useEffect } from "react";

import { Separator } from "@/components/ui/separator"
import { Homemade_Apple, Splash, Cabin_Sketch } from "next/font/google";
import DartScoreboardCell from "../DartScoreboardCell";
import { set } from "date-fns";


const appleFont = Homemade_Apple({ weight: "400", subsets: ["latin"], });
const splashFont = Splash({ weight: "400", subsets: ["latin"], });
const cabinFont = Cabin_Sketch({ weight: ["400", "700"], subsets: ["latin"], });


export default function BaseballScoreboard() {
  const [player1Runs, setPlayer1Runs] = useState<number[]>([]);
  const [player2Runs, setPlayer2Runs] = useState<number[]>([]);
  const [player1Errors, setPlayer1Errors] = useState<number[]>([]);
  const [player2Errors, setPlayer2Errors] = useState<number[]>([]);
  const [innings, setInnings] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [currentInning, setCurrentInning] = useState(1);
  const [showRemovePopup, setShowRemovePopup] = useState<{ player: number; index: number } | null>(null);

  const addInning = () => {
    const newInnings = [...innings];
    newInnings.push(innings.length + 1);
    setInnings(newInnings);
    setCurrentInning(newInnings.length);
  };

  const handlePlayerRuns = (player: number, index: number, value: number, operation="Add") => {
    const runs = player === 1 ? player1Runs : player2Runs;
    const setRuns = player === 1 ? setPlayer1Runs : setPlayer2Runs;
    const updatedRuns = [...runs];
    if (operation === "Add") {
      updatedRuns[index] = (updatedRuns[index] || 0) + value;
    } else if (operation === "Remove") {
      // Remove the runs from the last inning
      if (updatedRuns[index] !== undefined) {
        updatedRuns.splice(index, 1);
      }
      setRuns(updatedRuns);
      setCurrentInning(Math.min(currentInning, index + 1));
      return;
    }
    setRuns(updatedRuns);
    if (index + 1 === currentInning) {
      if (currentInning === innings.length && (player1Runs.reduce((a, b) => a + b, 0) === player2Runs.reduce((a, b) => a + b, 0))) {
        if (player === 1) {
          if (player2Runs[index] !== undefined) {
            addInning();
          }
        }
        if (player === 2) {
          if (player1Runs[index] !== undefined) {
            addInning();
          }
        }
      }
      if (player === 1 && player2Runs[index] !== undefined) {
        setCurrentInning(currentInning + 1);
      }
      if (player === 2 && player1Runs[index] !== undefined) {
        setCurrentInning(currentInning + 1);
      }
    }
  };

  const handlePlayerErrors = (player: number, index: number, value: number, operation="Add") => {
    const errors = player === 1 ? player1Errors : player2Errors;
    const setErrors = player === 1 ? setPlayer1Errors : setPlayer2Errors;
    const updatedErrors = [...errors];
    if (operation === "Add") {
      updatedErrors[index] = (updatedErrors[index] || 0) + value;
    } else if (operation === "Remove") {
      // Remove the runs from the last inning
      if (updatedErrors[index] !== undefined) {
        updatedErrors[index] = Math.max(0, updatedErrors[index] - value);
      }
    }
    setErrors(updatedErrors);
  };

  const undoInning = (player: number) => {
    if (player === 1) {
      const newRuns = [...player1Runs];
      newRuns.pop();
      setPlayer1Runs(newRuns);
      const newErrors = [...player1Errors];
      newErrors.pop();
      setPlayer1Errors(newErrors);
    } else {
      const newRuns = [...player2Runs];
      newRuns.pop();
      setPlayer2Runs(newRuns);
      const newErrors = [...player2Errors];
      newErrors.pop();
      setPlayer2Errors(newErrors);
    }
    setCurrentInning(currentInning - 1);
    if (currentInning > 9) {
      setInnings(innings.slice(0, innings.length - 1));
    }

    if (currentInning < 1) {
      setCurrentInning(1);
    }
  };

  const resetGame = () => {
    setPlayer1Runs([]);
    setPlayer2Runs([]);
    setPlayer1Errors([]);
    setPlayer2Errors([]);
    setCurrentInning(1);
    setInnings([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  };

  const completeGame = () => {
    console.log("Game Over");
  };

  return (
    <>
      {innings.map((inning, index) => (
        <div key={index} className="grid grid-cols-5 col-span-5 ">
            <div className="py-1 col-span-1 justify-center items-center self-center">
            {player1Runs[index] === undefined && index + 1 === currentInning ? (
              <DartScoreboardCell type="Round Score" score={""} onInputCallback={(value) => handlePlayerRuns(1, index, value)} />
            ) : (
              <p onClick={() => setShowRemovePopup({ player: 1, index })}>{player1Runs[index] ?? ""}</p>
            )}
            {showRemovePopup && showRemovePopup.player === 1 && showRemovePopup.index === index && (
              <div className="absolute bg-stone-900 p-2 border rounded shadow-lg">
              <p>Change runs for this inning:</p>
              <input
                type="number"
                className="bg-stone-700 p-2 rounded"
                value={player1Runs[index] !== undefined ? player1Runs[index] || 0 : ""}
                onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                handlePlayerRuns(1, index, newValue - (player1Runs[index] || 0));
                }}
              />
              <button className="bg-stone-600 rounded p-4" onClick={() => setShowRemovePopup(null)}>Close</button>
              </div>
            )}
            </div>
          <div className="py-1 col-span-1 justify-center items-center self-center">
            {player1Errors[index] === undefined && player2Errors[index] === undefined && index + 1 === currentInning ? (
              <DartScoreboardCell type="Round Score" score={""} onInputCallback={(value) => handlePlayerErrors(1, index, value)} />
            ) : (
              <p>{player1Errors[index] ?? ""}</p>
            )}
            
          </div>
            <div className="py-1 col-span-1 justify-center items-center self-center cursor-pointer" onClick={() => setCurrentInning(inning)}>
            <p>{inning}</p>
            </div>
          <div className="py-1 col-span-1 justify-center items-center self-center">
            {player2Runs[index] === undefined && index + 1 === currentInning ? (
              <DartScoreboardCell type="Round Score" score={""} onInputCallback={(value) => handlePlayerRuns(2, index, value)} />
            ) : (
              <p onClick={() => setShowRemovePopup({ player: 2, index })}>{player2Runs[index] ?? ""}</p>
            )}
            {showRemovePopup && showRemovePopup.player === 2 && showRemovePopup.index === index && (
              <div className="absolute bg-stone-900 p-2 border rounded shadow-lg">
              <p>Remove runs for this inning?</p>
              <button className="bg-rose-800/50 rounded p-4" onClick={() => {
                handlePlayerRuns(2, index, player2Runs[index] || 0, "Remove");
                setShowRemovePopup(null);
              }}>Yes</button>
              <button className="bg-stone-600 rounded p-4" onClick={() => setShowRemovePopup(null)}>No</button>
              </div>
            )}
          </div>
          <div className="py-1 col-span-1 justify-center items-center self-center">
            {player2Errors[index] === undefined && index + 1 === currentInning ? (
              <DartScoreboardCell type="Round Score" score={""} onInputCallback={(value) => handlePlayerErrors(2, index, value)} />
            ) : (
              <p>{player2Errors[index] ?? ""}</p>
            )}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-5 col-span-5 ">
        <div className="col-span-5">
          <Separator className="my-2" />
        </div>
        <div className="grid grid-cols-5 col-span-5 ">
            <p className="col-span-2">Runs: {player1Runs.reduce((a, b) => a + b, 0)}</p>
          <p />
            <p className="col-span-2">Runs: {player2Runs.reduce((a, b) => a + b, 0)}</p>
        </div>
        {/* <div className="grid grid-cols-5 col-span-5 ">
          <button onClick={() => undoInning(1)} className="col-span-2 bg-rose-800">Undo</button>
          <p />
          <button onClick={() => undoInning(2)} className="col-span-2 bg-rose-800">Undo</button>
        </div> */}
        <div className="col-span-5">
          <Separator className="my-2" />
        </div>
        <div className="grid grid-cols-5 col-span-5 ">
        <p />
          <button onClick={resetGame} className="rounded bg-rose-600 col-span-3">Reset Game</button>
          <p />
        </div>
        <div className="col-span-5">
          <Separator className="my-2" />
        </div>
        <div className="grid grid-cols-5 col-span-5 ">
          <p />
          <button onClick={completeGame} className="rounded col-span-3 bg-green-700">End Game</button>
          <p />
        </div>
      </div>
    </>
  )
}
