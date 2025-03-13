import Image from "next/image";
import { AuthGetCurrentUserServer, cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import Logout from "@/app/components/Logout";
import "@/app/globals.css";
import Pride from "react-canvas-confetti/dist/presets/pride";
import confetti from "canvas-confetti"
import randomInRange from "react-canvas-confetti/dist/helpers/randomInRange";
import RobdayConfetti from "./components/RobdayConfetti.";
// import "@/styles/globals.css";


export default async function Home() {
  // const user = await AuthGetCurrentUserServer();
  // const { data: todos = [] } = await cookiesClient.models.Todo.list();
  const isRobday = new Date().getDay() === 1;
  // const sadFace = confetti.shapeFromText("😢");
  // const decorateOptions = {
  //     colors: ["#FF69B4", "#00FF00", "#FFA500"],
  //     scalar: randomInRange(0.5, 15.5),
  //     particleCount: randomInRange(1, 10),
  //     shapes: [sadFace]
  //   };
  

  async function addTodo(data: FormData) {
    "use server";
    const title = data.get("title") as string;
    const result = await cookiesClient.models.Todo.create({
      content: title,
      status: "Todo",
      isDone: false,
      notes: ["medium"],
    });
    console.log("New Todo created:", result);
    revalidatePath("/");
  }

  return (
    <div
    // className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white [--pattern-fg:var(--color-gray-950)]/15 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center justify-items-center justify-center">
        <h1 className="text-2xl font-[family-name:var(--font-manrope)] text-center sm:text-left pt-10">
          {isRobday ? "Happy Robday! 🎉" : "It's not Robday. Bummer 😢"}
        </h1>
        <RobdayConfetti />

        {/* {user && <Logout />} */}
        {/* <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold animate-spin">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
          <li> OH really? </li>
        </ol> */}
        {/* <div className="flex-col gap-4 md:p-4 justify-center items-center w-full md:w-xl  bg-gray-950 bg-[url('/grid.svg')] rounded-xl">
          <form className="space-x-6 flex" action={addTodo}>
            <input className="bg-gray-800 rounded-2xl p-2 flex-1" type="text" name="title" />
            <button className="bg-blue-800 text-gray-200 rounded-2xl p-2 hover:cursor-pointer w-20" type="submit">Add Todo</button>
          </form>
          <div className="grid grid-cols-3 gap-4 p-2">
            <ul className="bg-zinc-900 p-4 space-y-2 rounded-xl">
              <h3 className="font-bold text-center mb-1">Task</h3>
              {todos && todos.map((todo) => <li className="bg-zinc-800 p-2 animate-pulse border border-solid rounded-xl dark:border-white/[.145]" key={todo.id}>{todo.content}</li>)}
            </ul>
            <ul className="bg-zinc-900 p-4 space-y-2 rounded-xl">
              <h3 className="font-bold text-center mb-1">Priority</h3>
              {todos && todos.map((todo) => <li className="bg-zinc-800 p-2 border border-solid rounded-xl dark:border-white/[.145]" key={todo.id}>
                <h4 className="animate-pulse">
                  {todo.notes}
                </h4>
              </li>)}
            </ul>
            <ul className="bg-zinc-900 p-4 space-y-2 rounded-xl">
              <h3 className="font-bold text-center mb-1">Status</h3>
              {todos && todos.map((todo) => <li className="bg-zinc-800 p-2 animate-pulse border border-solid rounded-xl dark:border-white/[.145]" key={todo.id}>{todo.isDone ? 'Done' : 'Not Done'}</li>)}
            </ul>
          </div>
        </div> */}

        {/* <div className="flex gap-4 items-center flex-col md:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-950 text-amber-700 gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div> */}
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
