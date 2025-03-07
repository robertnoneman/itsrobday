import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { Homemade_Apple, Splash, Cabin_Sketch } from "next/font/google";


const appleFont = Homemade_Apple({ weight: "400" });
const splashFont = Splash({ weight: "400" });
const cabinFont = Cabin_Sketch({ weight: ["400", "700"] });


export default function DartScoreboard() {
  return (
    <div className="flex flex-col h-full ">
      <Card className="h-full justify-center items-center">
        <CardHeader>
          <CardTitle className={`${appleFont.className} text-2xl`}>Cricket</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {/* <CardDescription>Score details will be displayed here.</CardDescription> */}
          <div className={`${cabinFont.className} text-xl grid grid-cols-5 justify-center items-center w-full text-center`}>
            <div className="col-span-2 flex flex-row w-full text-center justify-center items-center">
              <p className={splashFont.className}>ROB.N</p>
            </div>
            <div className="col-span-1">
              <p>vs</p>
            </div>
            <div className="col-span-2 flex flex-row w-full text-center justify-center items-center">
              <p className={splashFont.className}>ROB.O</p>
            </div>
            <div className="col-span-5">
              <Separator className="my-2"/>
            </div>

            
              <div className="py-4">
                <p></p>
              </div>
              <div className="py-4">
                <p></p>
              </div>
              <div className="border-x border-solid py-4">
                <p>20</p>
              </div>
              <div className="py-4">
                <p></p>
              </div>
              <div className="py-4">
                <p></p>
                </div>
            

            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="border-x border-solid py-4">
              <p>19</p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="border-x border-solid py-4">
              <p>18</p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="border-x border-solid py-4">
              <p>17</p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="border-x border-solid py-4">
              <p>16</p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="border-x border-solid py-4">
              <p>15</p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>

            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="border-x border-solid py-4">
              <p>Bull</p>
            </div>
            <div className="py-4">
              <p></p>
            </div>
            <div className="py-4">
              <p></p>
            </div>

          </div>
        </CardContent>
        <CardFooter>
          <p>Ready to start a new game!</p>
        </CardFooter>
      </Card>
    </div>
  );
}