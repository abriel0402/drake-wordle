import React, { useState, useEffect } from "react";
import images from "../img/images.js";

function Rules({ show, onClose }) {
    

  
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 shadow-lg w-80">
        <button 
          onClick={onClose} 
          className="mt-4 w-full py-2 text-white rounded-md hover:bg-primary-gold transition-colors duration-150">
          Close
        </button>
      </div>
    </div>
  );
}



export default Rules;
