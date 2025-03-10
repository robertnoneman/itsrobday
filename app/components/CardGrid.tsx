'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const getImageUrl = (key: string) => {
    if (key.startsWith("https://")) {
      return key;
    }
    const url = `https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/${key}`;
    return url;
  }


  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Ensure 3D transforms are preserved.
    gsap.set(el, { transformStyle: 'preserve-3d' });

    // Animate in when the card enters the viewport.
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Create a timeline for the hover effect.
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(el, {
      duration: 0.3,
      scale: 1.05,
      rotationY: 10,
      rotationX: -5,
      ease: 'power2.out',
    });

    // Play and reverse the hover animation on mouse events.
    const handleMouseEnter = () => hoverTl.play();
    const handleMouseLeave = () => hoverTl.reverse();
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="card">
      <img src={getImageUrl(imageUrl)} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <style jsx>{`
        .card {
          perspective: 1000px;
          background: #333;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translate3d(0, 0, 0);
          cursor: pointer;
        }
        .card-image {
          width: 100%;
          display: block;
        }
        .card-content {
          padding: 16px;
        }
      `}</style>
    </div>
  );
};

// Define the props for each card
interface DriftingCardProps {
  title: string;
  description: string;
  imageUrl: string;
  column_start: number;
  row_start: number;
  index?: number;
  registerTimeline?: (tl: gsap.core.Timeline) => void;
}

const DriftingCard: React.FC<DriftingCardProps> = ({ title, description, imageUrl, column_start, row_start, index, registerTimeline }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const getImageUrl = (key: string) => {
    if (key.startsWith("https://")) {
      return key;
    }
    const url = `https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/${key}`;
    return url;
  }

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Prepare the card for 3D transforms.
    gsap.set(el, {
      opacity: 0,
      z: "-19000px",    // Start far away (simulate horizon)
      // scale: 1.0,  // Smaller when far away
      x: "-50%",
      y: "-50%",
    });

    // Create a timeline for the drifting effect.
    // Each card starts with a random delay so they don't all animate in sync.
    const tl = gsap.timeline({ repeat: -1, delay: (index ?? 0) * 3.333 });

    // tl.to(el, {
    //   opacity: 1,
    //   // z: 50,
    //   // Smooth z
    //   z: "-100px",
    //   // scale: 0.5,
    //   // duration: 10,
    //   ease: 'none',
    //   // ease: "elastic"
    // })
    tl.to(el, {
        keyframes: {
          // "5%": { opacity: 1, z: "-9000px"},
          "100%": { opacity: 1, z: "1000px" },
        },
        duration: 30,
        ease: 'power2.out',
      });
      // Register this timeline with the parent component (if provided)
    if (registerTimeline) {
      registerTimeline(tl);
    }

    return () => {
      tl.kill();
    };
  }, [registerTimeline]);

  return (
    <div ref={cardRef} className="card-grid">
      <div className="card">
      <img src={getImageUrl(imageUrl)} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        {/* <p>{description}</p> */}
      </div>
    </div>
      <style jsx>{`
        .card-grid {
          display: grid;
          height: 75vw;
          width: 100vw;
          left: 50%;
          top: 50%;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          position: absolute;
          gap: 20px;
        }
        .card {
          margin: 10px;
          background: #222;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          height: fit-content;
          width: fit-content;
          /* Ensure the transform origin is centered */
          transform-origin: center;
          grid-column-start: ${column_start};
          grid-row-start: ${row_start};
          justify-self: center;
          align-self: center;
          justify-content: center;
          align-content: center;
        }
        .card-image {
          width: 100%;
          display: block;
        }
        .card-content {
          padding: 2px;
          font-size: .5rem;
          text-wrap-mode: nowrap;
        }
      `}</style>
    </div>
  );
};

export const CardGrid: React.FC<{ activities: DriftingCardProps[] }> = ({ activities }) => {
  // Sample card data; replace with props data
  
  let cards = activities;
  if (activities.length === 0) {
    cards = [
    {
      title: 'Make itsrobday.com v2',
      description: 'Code hackerman elite',
      imageUrl: '/RobdayIcon.png',
      column_start: 1,
      row_start: 1,
    },
    {
      title: 'Grill out somewhere',
      description: 'Its a secret!',
      imageUrl: 'https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/adjustable-grillreduced.jpg',
      column_start: 4,
      row_start: 3,
    },
    {
      title: 'Play darts',
      description: 'Throw pointy objects at a target',
      imageUrl: 'https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/IMG_1118.jpeg',
      column_start: 2,
      row_start: 1,
    },
    {
      title: 'Go Bowling',
      description: 'Throw a heavy ball down a greased alleyway',
      imageUrl: 'https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/IMG_1150.jpeg',
      column_start: 4,
      row_start: 3,
    },
    {
      title: 'Grill out somewhere',
      description: 'Its a secret!',
      imageUrl: 'https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/adjustable-grillreduced.jpg',
      column_start: 1,
      row_start: 2,
    },
    {
      title: 'Eat at a restaurant',
      description: 'Consume some calories',
      imageUrl: 'https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/00876003-Two-friends-eating-in-a-restaurant.jpg',
      column_start: 2,
      row_start: 3,
    },
    {
      title: 'Make itsrobday.com v2',
      description: 'Code hackerman elite',
      imageUrl: '/RobdayIcon.png',
      column_start: 4,
      row_start: 2,
    },
    {
      title: 'Eat at a restaurant',
      description: 'Consume some calories',
      imageUrl: 'https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/00876003-Two-friends-eating-in-a-restaurant.jpg',
      column_start: 3,
      row_start: 1,
    },
    {
      title: 'Play darts',
      description: 'Throw pointy objects at a target',
      imageUrl: 'https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/IMG_1118.jpeg',
      column_start: 1,
      row_start: 3,
    },
    {
      title: 'Go Bowling',
      description: 'Throw a heavy ball down a greased alleyway',
      imageUrl: 'https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/IMG_1150.jpeg',
      column_start: 3,
      row_start: 3,
    },
    // Add more cards as needed...
  ];
}

  // Ref to store all the card timelines.
  const cardTimelinesRef = useRef<gsap.core.Timeline[]>([]);
  // Ref to store a timeout for resetting the timeScale.
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Callback that DriftingCard components call to register their timeline.
  const registerTimeline = (tl: gsap.core.Timeline) => {
    cardTimelinesRef.current.push(tl);
  };

  // Function to smoothly reset timeScale back to 1.
  const resetTimeScaleWithMomentum = () => {
    cardTimelinesRef.current.forEach((tl) => {
      gsap.to(tl, { timeScale: 1, duration: 0.5, ease: 'power2.out' });
    });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      const sensitivity = 200;
      let newTimeScale: number;
      
      // Map the delta so that if the wheel delta is negative, we reverse the animation.
      if (delta < 0) {
        // When scrolling up, reverse the timeline.
        newTimeScale = -gsap.utils.clamp(1, 6, 1 + Math.abs(delta) / sensitivity);
      } else {
        // Scrolling down speeds up the animation.
        newTimeScale = gsap.utils.clamp(1, 6, 1 + delta / sensitivity);
      }

      // Update the timeScale for every registered timeline.
      cardTimelinesRef.current.forEach((tl) => {
        tl.timeScale(newTimeScale);
      });

      // Clear any previous reset timeout.
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      resetTimeoutRef.current = setTimeout(() => {
        resetTimeScaleWithMomentum();
      }, 50);
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  // Handle touch events.
  useEffect(() => {
    let touchStartY = 0;
    const touchSensitivity = 50; // Adjust sensitivity for touch input

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartY;
        // Calculate new timeScale: a positive delta speeds up,
        // while a negative delta sets a negative timeScale to reverse.
        const newTimeScale = gsap.utils.clamp(-3, 3, 1 + deltaY / touchSensitivity);
        cardTimelinesRef.current.forEach((tl) => tl.timeScale(newTimeScale));
        
        if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      }
    };

    const handleTouchEnd = () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => {
        resetTimeScaleWithMomentum();
      }, 50);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        card.index = index,
        <DriftingCard key={index} {...card} registerTimeline={registerTimeline}/>
      ))}
      <style jsx>{`
        .card-container {
          display: block;
          height: 80%;
          width: 100%;
          position: fixed;
          max-width: 102.4rem;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          // gap: 20px;
          // padding: 20px;
          /* Set perspective for the 3D effect */
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>

      {/* <style jsx>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }
      `}</style> */}
    </div>
  );
};

export default CardGrid;