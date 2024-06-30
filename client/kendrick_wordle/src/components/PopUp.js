import React from "react";
import images from "../img/images.js";

function PopUp({ show, onClose, song }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 shadow-lg w-80">
      <img src={images[song.album]} alt="Album Cover" className="w-full h-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="text-lg mb-2">The correct song was:</p>
        <p className="text-xl font-semibold mb-4">{song.name}</p>
        
        <button 
          onClick={onClose} 
          className="mt-4 w-full py-2 text-white rounded-md hover:bg-primary-gold transition-colors duration-150">
          Close
        </button>
      </div>
    </div>
  );
}

export default PopUp;
