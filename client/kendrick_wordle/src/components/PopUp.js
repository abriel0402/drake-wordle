import React, { useState, useEffect } from "react";
import images from "../img/images.js";

function PopUp({ show, onClose, song }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!show) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 shadow-lg w-80">
        <img src={images[song.album]} alt="Album Cover" className="w-full h-auto mb-4" />
        <h2 className="text-2xl text-center font-bold mb-4">{song.name}</h2>
        <p className="text-center text-lg mb-2">New Song In:</p>
        <p className="text-center text-xl font-semibold mb-4">{formatTimeLeft(timeLeft)}</p>
        <button 
          onClick={onClose} 
          className="mt-4 w-full py-2 text-white rounded-md hover:bg-primary-gold transition-colors duration-150">
          Close
        </button>
      </div>
    </div>
  );
}

function calculateTimeLeft() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const difference = midnight - now;

  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function formatTimeLeft(timeLeft) {
  return `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
}

export default PopUp;
