import React from "react";
import "../index.css";
import images from "../img/images.js";

function GuessTable({ guesses }) {
  console.log(guesses);
  return (
    <div>
      <table className="w-full caption-bottom text-base p-10 mt-20 border border-zinc-200 table-fixed">
        <thead className="[&_tr]:border-b">
          <tr className="justify-content-center border-b data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800 transition-colors bg-primary-white/[0.05] hover:bg-primary-white/[0.05] hover:font-bold">
            <th className="h-12 px-2 text-center align-middle font-medium text-lg text-zinc-500 dark:text-zinc-400">
              Song Name
            </th>
            <th className="h-12 px-2 text-center align-middle font-medium text-lg text-zinc-500 dark:text-zinc-400">
              Album
            </th>
            <th className="h-12 px-2 text-center align-middle font-medium text-lg text-zinc-500 dark:text-zinc-400">
              Track Number
            </th>
            <th className="h-12 px-2 text-center align-middle font-medium text-lg text-zinc-500 dark:text-zinc-400">
              Track Length
            </th>
            <th className="h-12 px-2 text-center align-middle font-medium text-lg text-zinc-500 dark:text-zinc-400">
              Features
            </th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => (
            <tr
              key={index}
              className="border-b transition-colors data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800 cursor-pointer hover:bg-primary-red/20 hover:font-bold"
            >
              <td
                className={`h-12 px-4 text-lg text-center align-middle overflow-hidden overflow-ellipsis whitespace-nowrap signal-${guess.signals[0]}`}
              >
                {guess.name}
              </td>
              <td
                className={`h-12 px-4 text-lg text-center align-middle overflow-hidden overflow-ellipsis whitespace-nowrap signal-${guess.signals[1]}`}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <img src={images[guess.album]} style={{ height: "65px" }} />
                </div>
              </td>
              <td
                className={`h-12 px-4 text-lg text-center align-middle overflow-hidden overflow-ellipsis whitespace-nowrap signal-${guess.signals[2]}`}
              >
                {guess.trackNum}
                {guess.arrows[2] && (
                  <span style={{ marginLeft: "5px" }}>
                    {guess.arrows[2] === "^" ? "⬆️" : "⬇️"}
                  </span>
                )}
              </td>
              <td
                className={`h-12 px-4 text-lg text-center align-middle overflow-hidden overflow-ellipsis whitespace-nowrap signal-${guess.signals[3]}`}
              >
                {guess.trackLength}
                {guess.arrows[3] && (
                  <span style={{ marginLeft: "5px" }}>
                    {guess.arrows[3] === "^" ? "⬆️" : "⬇️"}
                  </span>
                )}
              </td>
              <td
                className={`h-12 px-4 text-lg text-center align-middle overflow-hidden overflow-ellipsis whitespace-nowrap signal-${guess.signals[4]}`}
              >
                {guess.features}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuessTable;
