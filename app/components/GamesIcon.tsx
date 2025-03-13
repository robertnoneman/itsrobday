"use client";

import { IoBaseballSharp } from "react-icons/io5";
import { IoAmericanFootballSharp } from "react-icons/io5";
import { IoTennisballSharp } from "react-icons/io5";
import { IoBowlingBallSharp } from "react-icons/io5";
import { GiDart } from "react-icons/gi";
import { GiDiscGolfBasket } from "react-icons/gi";
import { useState, useEffect } from "react";
import gsap from 'gsap';


export default function GamesIcon() {
  const [activeIcon, setActiveIcon] = useState(0);
  const icons = [
    <IoBaseballSharp key="baseball" />,
    <IoAmericanFootballSharp key="football" />,
    <IoTennisballSharp key="tennis" />,
    <IoBowlingBallSharp key="bowling" />,
    <GiDart key="darts" />,
    <GiDiscGolfBasket key="discgolf" />,
  ];
  const totalIcons = icons.length;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % totalIcons);
      
      // gsap.set('.icon', { opacity: 0 });
      gsap.set('.icon', { scale: .8 });
      // gsap.fromTo('.icon', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.inOut', yoyo: true, repeat: 1 });
      gsap.fromTo('.icon', { scale: .8 }, { scale: 1.2, duration: 1.0, ease: 'power2.inOut', yoyo: true, repeat: 1 });
    }, 1500); // Change icon every 1.5 seconds
    
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex items-center justify-center">
      <div id="Icon" className="transition-all duration-300 transform scale-200 icon">
        {icons[activeIcon]}
      </div>
    </div>
  );
}