'use client';

import { useState, useEffect } from "react";

import { Separator } from "@/components/ui/separator"
import { Homemade_Apple, Splash, Cabin_Sketch } from "next/font/google";
import DartScoreboardCell from "../DartScoreboardCell";
import { start } from "repl";

const splashFont = Splash({ weight: "400", subsets: ["latin"], });


export default function FiveOhOne(
  { startingScore = 501, player1Name = "Player 1", player2Name = "Player 2" }:
  { startingScore?: number; player1Name?: string; player2Name?: string; }
) {
  const [roundScores, setRoundScores] = useState<{ player: number; roundScores: number[] }[]>([
    { player: 1, roundScores: [] },
    { player: 2, roundScores: [] }
  ]);
  const [player1Throws, setPlayer1Throws] = useState<number[]>([0]);
  const [player2Throws, setPlayer2Throws] = useState<number[]>([0]);
  const [player1Score, setPlayer1Score] = useState(startingScore);
  const [player2Score, setPlayer2Score] = useState(startingScore);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentThrow, setCurrentThrow] = useState(0);
  const [showRemovePopup, setShowRemovePopup] = useState<{ player: number; index: number } | null>(null);

  const handlePlayerThrows = (player: number, value: number, operation = "Add") => {
    const throws = player === 1 ? player1Throws : player2Throws;
    const setThrows = player === 1 ? setPlayer1Throws : setPlayer2Throws;

    const updatedThrows = [...throws];
    if (operation === "Remove") {
      updatedThrows.splice(updatedThrows.length - 1, 1); // remove the last throw
      handlePlayerScore(player, value, "Remove");
    } else {
      const remainingScore = (player === 1 ? player1Score : player2Score) - value;
      if (value > (player === 1 ? player1Score : player2Score) || remainingScore === 1) {
        updatedThrows.push(0);
      } else {
        updatedThrows.push(value);
        handlePlayerScore(player, value);
      }
    }
    setThrows(updatedThrows);
  };

  const handlePlayerScore = (player: number, value: number, operation = "Add") => {
    const score = player === 1 ? player1Score : player2Score;
    const setScore = player === 1 ? setPlayer1Score : setPlayer2Score;

    if (operation === "Remove") {
      setScore(score + value);
    } else {
      const newScore = score - value;
      if (newScore < 0) {
        // Bust: reset the score for the current round
        alert(`Player ${player} busted!`);
        setScore(score);
        handleNextPlayer();
      } else {
        setScore(newScore);
      }
    }
  };

  const handleNextPlayer = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setCurrentThrow(0);
  };

  const handleNextThrow = () => {
    setCurrentThrow(currentThrow + 1);
  };

  const handleRemoveThrow = (player: number, index: number) => {
    setShowRemovePopup({ player, index });
  };

  const handleConfirmRemoveThrow = () => {
    if (showRemovePopup) {
      const { player, index } = showRemovePopup;
      const throws = player === 1 ? player1Throws : player2Throws;
      const setThrows = player === 1 ? setPlayer1Throws : setPlayer2Throws;
      const score = player === 1 ? player1Score : player2Score;
      const setScore = player === 1 ? setPlayer1Score : setPlayer2Score;


      const updatedThrows = [...throws];
      updatedThrows.splice(index, 1); // remove the throw at the specified index
      setThrows(updatedThrows);

      const removedThrow = throws[index];
      setScore(score + removedThrow); // add the removed throw back to the score

      setShowRemovePopup(null);
    }
  }

  const undoLastThrows = () => {
    if (player1Throws.length === 1 && player2Throws.length === 1) {
      return;
    }
    const updatedPlayer1Throws = [...player1Throws];
    const updatedPlayer2Throws = [...player2Throws];
    const lastPlayer1Round = updatedPlayer1Throws.pop(); // remove the last throw
    const lastPlayer2Round = updatedPlayer2Throws.pop(); // remove the last throw
    setPlayer1Throws(updatedPlayer1Throws);
    setPlayer2Throws(updatedPlayer2Throws);
    // fix the score
    if (lastPlayer1Round) {
      handlePlayerScore(1, lastPlayer1Round, "Remove");
    }
    if (lastPlayer2Round) {  
      handlePlayerScore(2, lastPlayer2Round, "Remove");
    }
  };

  const resetGame = () => {
    setPlayer1Throws([0]);
    setPlayer2Throws([0]);
    setPlayer1Score(startingScore);
    setPlayer2Score(startingScore);
    setRoundScores([
      { player: 1, roundScores: [] },
      { player: 2, roundScores: [] }
    ]);
    setCurrentPlayer(1);
    setCurrentThrow(0);
  };

  type DartThrow = { score: number; type: "S" | "D" | "T" };

function getCheckoutThrows(score: number): DartThrow[] | null {
    if (score < 2 || score > 170) return null; // Cannot checkout

    // Generate all double possibilities
    const doubles = Array.from({ length: 20 }, (_, i) => (i + 1) * 2).concat(50); // 50 for Bullseye

    // Find the highest possible double
    for (let i = doubles.length - 1; i >= 0; i--) {
        const doubleTarget = doubles[i];
        const remaining = score - doubleTarget;

        if (remaining < 0) continue; // Skip if the double is too high

        // Case 1: Direct finish with a double
        let displayedScore = doubleTarget / 2;
        if (doubleTarget / 2 === 25) { 
          let displayedScore = "Bull";
        }
        if (remaining === 0) return [{ score: displayedScore, type: "D" }];

        // Case 2: Two darts remaining (T20, S2, etc.)
        for (let first of getValidScores()) {
            if (first > remaining) continue;
            if (first === remaining) return [
                { score: getType(first) === "D" ? first / 2 : getType(first) === "T" ? first / 3 : first, type: getType(first) },
                { score: doubleTarget / 2, type: "D" }
            ];

            // Case 3: Three darts remaining (T20, T20, D20, etc.)
            for (let second of getValidScores()) {
                if (first + second > remaining) continue;
                if (first + second === remaining)
                    return [
                        { score: getType(first) === "D" ? first / 2 : getType(first) === "T" ? first / 3 : first, type: getType(first) },
                        { score: getType(second) === "D" ? second / 2 : getType(second) === "T" ? second / 3 : second, type: getType(second) },
                        { score: doubleTarget / 2, type: "D" },
                    ];
            }
        }
    }

    return null; // No valid checkout
}

// Get all valid dart scores (Singles, Doubles, Triples)
function getValidScores(): number[] {
    const validScores = new Set<number>();

    for (let i = 1; i <= 20; i++) {
        validScores.add(i); // Singles
        validScores.add(i * 2); // Doubles
        validScores.add(i * 3); // Triples
    }

    validScores.add(25); // Bull
    validScores.add(50); // Bullseye

    return Array.from(validScores).sort((a, b) => b - a); // Sort in descending order for optimization
}

// Determine type of dart score
function getType(score: number): "S" | "D" | "T" {
    if (score % 3 === 0 && score / 3 <= 20) return "T";
    if (score % 2 === 0 && score / 2 <= 20) return "D";
    return "S";
}

  return (
    <>
    <div className="grid grid-cols-5 col-span-5">
    <div className="col-span-2 justify-center items-center self-center">
          <p>{startingScore}</p>
        </div>
        <div className="col-span-1 justify-center items-center self-center">
          -
        </div>
        <div className="col-span-2 justify-center items-center self-center">
          <p>{startingScore}</p>
        </div>
    </div>
    {player2Throws.map((value, index) => (
      <div className="grid grid-cols-5 col-span-5" key={`player1-${index}`}>
        <div className="col-span-1 justify-center items-center self-center" onClick={() => handleRemoveThrow(1, index)}>
          {(index === player1Throws.length - 1 && player1Throws[index] !== undefined) ? (
            <DartScoreboardCell
              score={""}
              onInputCallback={(value) => handlePlayerThrows(1, value)}
              type="Round Score"
            />
          ) : (
            <p>{player1Throws[index + 1]}</p>
          )}
        </div>
        <div className="col-span-1 justify-center items-center self-center">
            <p className={index === player1Throws.length - 1 ? "hidden" : index !== player1Throws.length - 2 ? "line-through" : ""}>{startingScore - player1Throws.slice(0, index + 2).reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="col-span-1 justify-center items-center self-center">
          -
        </div>
        <div className="col-span-1 justify-center items-center self-center" onClick={() => handleRemoveThrow(2, index)}> 
          {index === player2Throws.length - 1 ? (
            <DartScoreboardCell
              score={""}
              onInputCallback={(value) => handlePlayerThrows(2, value)}
              type="Round Score"
            />
          ) : (
            <p>{player2Throws[index + 1]}</p>
          )}
        </div>
        <div className="col-span-1 justify-center items-center self-center">
            <p className={index === player2Throws.length - 1 ? "hidden" : index !== player2Throws.length - 2 ? "line-through" : ""}>{startingScore - player2Throws.slice(0, index + 2).reduce((a, b) => a + b, 0)}</p>
        </div>
      </div>
    ))}
    <div className="grid grid-cols-5 col-span-5"> 
      <div className="col-span-2 justify-center items-center self-center">
        <p>
            {`Best throws: ${getCheckoutThrows(player1Score)?.map(t => `${t.type}${t.score === 25 ? "-Bull" : t.score}`).join(", ") || "No checkout"}`}
        </p>
        </div>
        <div className="col-span-1 justify-center items-center self-center">
          <p></p>
        </div>
        <div className="col-span-2 justify-center items-center self-center">
          <p>{`Best throws: ${getCheckoutThrows(player2Score)?.map(t => `${t.type}${t.score === 25 ? "-Bull" : t.score}`).join(", ") || "No checkout"}`}</p>
        </div>
    </div>
    <div className="grid grid-cols-5 col-span-5">
      <div className="col-span-5">
        <Separator className="my-2" />
      </div>
    </div>

    <div className="grid grid-cols-5 col-span-5">
    <div className="col-span-1 justify-center items-center self-center">
      <p></p>
    </div>
    <div className="col-span-3 justify-center items-center self-center">
      <button onClick={undoLastThrows} className="bg-slate-800 text-white rounded-lg px-4 py-2">Undo Last Throws</button>
    </div>
    <div className="col-span-1 justify-center items-center self-center">
      <p></p>
    </div>
    </div>

    <div className="grid grid-cols-5 col-span-5">
    <div className="col-span-1 justify-center items-center self-center">
      <p>{player1Score}</p>
    </div>
    <div className="col-span-3 justify-center items-center self-center">
      <button onClick={resetGame} className="bg-slate-800 text-white rounded-lg px-4 py-2">Reset Game</button>
    </div>
    <div className="col-span-1 justify-center items-center self-center">
      <p>{player2Score}</p>
    </div>
    </div>
    </>
  );
}
