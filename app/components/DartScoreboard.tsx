'use client'

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"
import { Homemade_Apple, Splash, Cabin_Sketch } from "next/font/google";
import CrickettScoreboard from './DartScoreboards/CricketScoreboard';
import BaseballScoreboard from './DartScoreboards/BaseballScoreboard';
import FiveOhOne from './DartScoreboards/FiveOhOne';


const appleFont = Homemade_Apple({ weight: "400", subsets: ["latin"], });
const splashFont = Splash({ weight: "400", subsets: ["latin"], });
const cabinFont = Cabin_Sketch({ weight: ["400", "700"], subsets: ["latin"], });


export default function DartScoreboard() {
  const gameTypes = ["Cricket", "301", "501", "701", "Baseball", "Robday Night Football"];
  const [gameType, setGameType] = useState("Cricket");
  const [player1Name, setPlayer1Name] = useState("ROB.N");
  const [player2Name, setPlayer2Name] = useState("ROB.O");
  
  return (
    <div className="flex flex-col h-full ">
      <Card className="h-full justify-center items-center">
        <CardHeader>
          <CardTitle className={`${appleFont.className} text-2xl`}>
            <Select>
              <SelectTrigger className="w-full text-2xl">
                <SelectValue className='text-2xl'>{gameType}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                {gameTypes.map((type, index) => (
                  <SelectGroup key={index}>
                    {/* <SelectLabel>{type}</SelectLabel> */}
                    <SelectItem value={type} onClick={() => setGameType(type)}>{type}</SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            {/* {gameType} */}
            </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {/* <CardDescription>Score details will be displayed here.</CardDescription> */}
          <div className={`${cabinFont.className} text-xl grid grid-cols-5 justify-center items-center w-full text-center`}>
            <div className="col-span-2 flex flex-row w-full text-center justify-center items-center">
              <Select>
                <SelectTrigger className={`${splashFont.className} text-xl `}>
                  <SelectValue className={`${splashFont.className} text-xl`}>{player1Name}</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectItem className={`${splashFont.className} text-lg`} value="ROB.N" onClick={() => setPlayer1Name("ROB.N")}>ROB.N</SelectItem>
                    <SelectItem className={`${splashFont.className} text-lg`} value="ROB.O" onClick={() => setPlayer1Name("ROB.O")}>ROB.O</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <p className={splashFont.className}>
                {player1Name}
              </p> */}
            </div>
            <div className="col-span-1">
              <p>vs</p>
            </div>
            <div className="col-span-2 flex flex-row w-full text-center justify-center items-center">
              {/* <p className={splashFont.className}>{player2Name}</p> */}
              <Select>
                <SelectTrigger className={`${splashFont.className} text-xl `}>
                  <SelectValue className={`${splashFont.className} text-xl`}>{player2Name}</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectItem className={`${splashFont.className} text-lg`} value="ROB.N" onClick={() => setPlayer2Name("ROB.N")}>ROB.N</SelectItem>
                    <SelectItem className={`${splashFont.className} text-lg`} value="ROB.O" onClick={() => setPlayer2Name("ROB.O")}>ROB.O</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-5">
              <Separator className="my-2" />
            </div>
          {(gameType === "Cricket") && <CrickettScoreboard />}
          {(gameType === "Baseball") && <BaseballScoreboard />}
          {(gameType === "301" || gameType === "501" || gameType === "701") && <FiveOhOne startingScore={Number(gameType)} />}

          </div>
        </CardContent>
        <CardFooter>
          <p>Ready to start a new game!</p>
        </CardFooter>
      </Card>
    </div>
  );
}