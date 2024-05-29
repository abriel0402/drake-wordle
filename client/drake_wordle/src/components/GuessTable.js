import React from "react";
import "../index.css";

function GuessTable({ guesses }) {

  console.log(guesses)
  return (
    <div>
      <table className="w-full caption-bottom text-sm p-10 mt-20">
        <thead className="[&_tr]:border-b">
          <tr className="border-b data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800 transition-colors bg-primary-white/[0.05] hover:bg-primary-white/[0.05] hover:font-bold">
            <th className="h-10 px-2 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">
              Song Name
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">
              Album
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">
              Track Number
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">
              Track Length
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">
              Features
            </th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => (
            <tr
              key={index}
              className="border-b data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800 transition-colors bg-primary-white/[0.05] hover:bg-primary-white/[0.05] hover:font-bold"
            >
              <td className={`h-10 px-2 text-left align-middle signal-${guess.signals[0]}`}>
                {guess.name}
              </td>
              <td className={`h-10 px-2 text-left align-middle signal-${guess.signals[1]}`}>
                {guess.album}
              </td>
              <td className={`h-10 px-2 text-left align-middle signal-${guess.signals[2]}`}>
                {guess.trackNum}
              </td>
              <td className={`h-10 px-2 text-left align-middle signal-${guess.signals[3]}`}>
                {guess.trackLength}
              </td>
              <td className={`h-10 px-2 text-left align-middle signal-${guess.signals[4]}`}>
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
