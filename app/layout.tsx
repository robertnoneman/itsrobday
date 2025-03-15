import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import "@/app/globals.css";
import ConfigureAmplifyClientSide from "@/app/components/ConfigureAmplify";
import NavBar from "@/app/components/NavBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "It's Robday!",
  description: "Happy Robday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="[color-scheme:dark] dark h-full">
      <body
        // className={`${geistSans.variable} ${geistMono.variable}  bg-gray-950 bg-[url('/grid.svg')] antialiased`}
        className={`${geistSans.variable} ${geistMono.variable} bg-fixed bg-linear-to-tr to-sky-900 from-rose-950 antialiased h-full`}
      >
        <ConfigureAmplifyClientSide />
        <NavBar />
        <div className="text-sm/7 p-2 text-gray-300  dark:text-gray-300 sm:pt-18 h-full">
          {children}
        </div>
      </body>
      {/* <div className="relative pt-14 bg-linear-to-t from-slate-800 to-red-950 grid min-h-screen grid-cols-[1rem_1rem_auto_1rem_1rem] md:grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr]  [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10"> */}
      {/* <div className="relative  grid grid-cols-[0.5rem_auto_0.5rem] md:grid-cols-[2.5rem_2.5rem_auto_2.5rem_2.5rem] grid-rows-[1fr_1px_auto_1px_1fr]  [--pattern-fg:var(--color-gray-950)]/5  dark:[--pattern-fg:var(--color-white)]/10"> */}
      {/* <div className="relative grid min-h-screen grid-cols-[1rem_1rem_auto_1rem_1rem] md:grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr]  [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10"> */}
      {/* <div className="relative pt-14 bg-linear-to-t from-slate-800 to-red-950 min-h-screen "> */}
      {/* <div className="col-start-3 row-start-3 flex flex-col p-2 dark:bg-white/10"> */}
      {/* <div className="col-start-2 md:col-start-3 row-start-1 row-span-full flex flex-col p-2"> */}
      {/* <svg className="h-[1lh] w-150.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                <circle cx="11" cy="11" r="11" className="fill-sky-400/25" />
                <circle cx="11" cy="11" r="10.5" className="stroke-sky-400/25" />
                <path d="M8 11.5L10.5 14L14 8" className="stroke-sky-800 dark:stroke-sky-300" />
              </svg>
              Howdy! */}
      {/* </div> */}
      {/* <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div> */}
      {/* <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div> */}
      {/* <div className="relative -right-px col-start-1 md:col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div> */}
      {/* <div className="relative -left-px col-start-3 md:col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div> */}
      {/* <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div> */}
      {/* <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div> */}
      {/* </div> */}
      {/* </div> */}
    </html>
  );
}
