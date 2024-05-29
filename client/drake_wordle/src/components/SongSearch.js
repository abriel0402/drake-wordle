import axios from "axios";
import React, { useState } from "react";
import GuessTable from "./GuessTable";

function SongSearch() {
  const [songs, setSongs] = useState([]);
  const [guesses, setGuesses] = useState([]);

  const handleInputChange = (event) => {
    const text = event.target.value;

    axios
      .post("/song-search/", { text })
      .then((response) => {
        setSongs(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleSuggestionClick = (event) => {
    const songName = event.target.innerText;
    document.getElementById("search").value = songName;
    setSongs([]);
  };

  const makeGuess = () => {
    const guess = document.getElementById("search").value;
    axios
      .post("/make-guess/", { guess })
      .then((response) => {
        console.log(response.data);
        setGuesses([...guesses, response.data]);
        document.getElementById("search").value = "";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full relative">
        <div className="flex relative">
          <input
            type="text"
            id="search"
            name="search"
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md overflow-hidden-md border border-zinc-200 bg-transparent px-4 py-2 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 pl-8 pr-8 focus:border-2 focus:border-primary-gold hover:border-primary-red transition-all duration-150 ease-out hover:ease-in"
            placeholder="Enter a Drake song..."
          />
          <button
            type="button"
            onClick={makeGuess}
            className="inline-flex items-center justify-center h-10 whitespace-nowrap overflow-hidden-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 border-zinc-200 shadow-sm hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 rounded overflow-hidden-md px-4 text-base bg-primary-white text-primary-black hover:bg-primary-gold border-0 disabled:bg-primary-white/90 transition duration-150 ease-out hover:ease-in"
          >
            Guess
          </button>
        </div>
        <div>
          <div className="absolute w-full bg-white rounded-md mt-1 overflow-hidden">
            {songs.length > 0 &&
              songs.map((song) => (
                <div
                  key={song.id}
                  className="px-4 py-2 rounded overflow-hidden-md border cursor-pointer bg-primary-black"
                  onClick={handleSuggestionClick}
                >
                  <p className="transition-colors data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800 cursor-pointer hover:bg-primary-gold/20 hover:font-bold text-lg">
                    {song.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <GuessTable guesses={guesses} />
      </div>
    </div>
  );
}

export default SongSearch;
