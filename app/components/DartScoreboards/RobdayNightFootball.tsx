'use client';

import { useState, useEffect } from "react";

import { Separator } from "@/components/ui/separator"
import { Homemade_Apple, Splash, Cabin_Sketch } from "next/font/google";
import DartScoreboardCell from "../DartScoreboardCell";


const appleFont = Homemade_Apple({ weight: "400", subsets: ["latin"], });
const splashFont = Splash({ weight: "400", subsets: ["latin"], });
const cabinFont = Cabin_Sketch({ weight: ["400", "700"], subsets: ["latin"], });


export default function RobdayNightFootballScoreboard() {
  const [robdayNightFootballValues, setRobdayNightFootballValues] = useState(["1", "-", "2", "-", "3", "-", "4", "-"])
  const [possessions, setPossessions] = useState<{ player1: number; player2: number }[]>([{ player1: 0, player2: 0 }]);
  const [currentPossesionScore, setCurrentPossesionScore] = useState({ player1: 0, player2: 0 });
  const [currentQuarter, setCurrentQuarter] = useState(1);
  const [showEditPopup, setShowEditPopup] = useState<{ player: number; index: number } | null>(null);

  const handleRNFInputChange = (e: number, player: 'player1' | 'player2') => {
    setCurrentPossesionScore({ ...currentPossesionScore, [player]: e });
    const tempCurrentPossesionScore = { ...currentPossesionScore, [player]: e };

    if (player === "player2") {
      setPossessions([...possessions, tempCurrentPossesionScore]);
      setCurrentPossesionScore({ player1: 0, player2: 0 });
      setCurrentQuarter((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setRobdayNightFootballValues(["1", "-", "2", "-", "3", "-", "4", "-"]);
    setPossessions([{ player1: 0, player2: 0 }]);
    setCurrentPossesionScore({ player1: 0, player2: 0 });
    setCurrentQuarter(1);
  };

  const handleScoreEdit = (index: number, value: number, player: 'player1' | 'player2') => {
    const tempPossessions = [...possessions];
    tempPossessions[index][player] = value;
    setPossessions(tempPossessions);
    setShowEditPopup(null);
  };

  return (
    <>
      {robdayNightFootballValues.map((value, index) => (
        <div className="grid grid-cols-5 col-span-5" key={index}>
          {currentQuarter > index + 1 ?
            (
              <>
                <div className="col-span-2 justify-center items-center self-center" onClick={() => setShowEditPopup({ player: 1, index })}>
                  {possessions[index + 1]?.player1}
                </div>
                <div className="col-span-1 justify-center items-center self-center border-x-2 h-14 flex flex-col">
                  <p className="text-center justify-center items-center self-center justify-self-center">{value}</p>
                </div>
                <div className="col-span-2 justify-center items-center self-center" onClick={() => setShowEditPopup({ player: 2, index })}>
                  {possessions[index + 1]?.player2}
                </div>
                {showEditPopup?.player === 1 && showEditPopup?.index === index &&
                  <div className="absolute top-0 left-0  bg-black bg-opacity-50 flex justify-center items-center">
                    <DartScoreboardCell
                      score={possessions[index + 1]?.player1}
                      type="Round Score"
                      onInputCallback={(score) => handleScoreEdit(index, score, "player1")}
                    />
                  </div>
                }
                {showEditPopup?.player === 2 && showEditPopup?.index === index &&
                  <div className="absolute top-0 left-0  bg-black bg-opacity-50 flex justify-center items-center">
                    <DartScoreboardCell
                      score={possessions[index + 1]?.player2}
                      type="Round Score"
                      onInputCallback={(score) => handleScoreEdit(index, score, "player2")}
                    />
                  </div>
                }
              </>
            )
            :
            (currentQuarter === index + 1) ?
              <>
                <div className="col-span-1 justify-center items-center self-center">
                  <DartScoreboardCell
                    score={""}
                    type="Round Score"
                    onInputCallback={(score) => {
                      handleRNFInputChange(score, "player1");
                    }}
                  />
                </div>
                <div className="col-span-1 justify-center items-center self-center">
                  <p className="text-center justify-center items-center self-center justify-self-center ">
                  {currentPossesionScore.player1}
                  </p>
                </div>
                <div className="col-span-1 justify-center items-center self-center border-x-2 flex flex-col h-14">
                  <p className="text-center justify-center items-center self-center justify-self-center ">
                  {value}
                  </p>
                </div>
                <div className="col-span-1 justify-center items-center self-center">
                  <DartScoreboardCell
                    score={""}
                    type="Round Score"
                    onInputCallback={(score) => {
                      handleRNFInputChange(score, "player2");
                    }}
                  />
                </div>
                <div className="col-span-1 justify-center items-center self-center">
                  {currentPossesionScore.player2}
                </div>
              </>
              :
              (
                <>
                  <div className="col-span-2 justify-center items-center self-center">
                    <p></p>
                  </div>
                  <div className="col-span-1 justify-center items-center self-center border-x-2 h-14 flex flex-col">
                    <p className="text-center justify-center items-center self-center justify-self-center ">
                    {value}
                    </p>
                  </div>
                  <div className="col-span-2 justify-center items-center self-center">
                    <p></p>
                  </div>
                </>
              )
            }

        </div>
      ))}
      <div className="grid grid-cols-5 col-span-5 ">
        <div className="col-span-5">
          <Separator className="my-2" />
        </div>
      </div>
      <div className="grid grid-cols-5 col-span-5 ">
        <div className="col-span-2 justify-center items-center self-center">
          <p>Score: {possessions.reduce((acc, curr) => acc + curr.player1, 0)}</p>
        </div>
        <div className="col-span-1 justify-center items-center self-center">
          <p>Q{currentQuarter % 2 === 0 ? (currentQuarter / 2) + .5 : Math.floor(currentQuarter / 2) + 1}</p>
        </div>
        <div className="col-span-2 justify-center items-center self-center">
          <p>Score: {possessions.reduce((acc, curr) => acc + curr.player2, 0)}</p>
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
    </>
  );
}