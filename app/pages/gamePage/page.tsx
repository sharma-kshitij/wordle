"use client";

import Game from "@/app/components/Game/Game";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [word, setword] = useState(["S", "L", "A", "T", "E"]);

  //   const getWord = async () => {
  //     const res = await axios.get(
  //       "https://random-word-api.herokuapp.com/word?length=5"
  //     );
  //     setword(res.data[0]);
  //   };

  //   useEffect(() => {
  //     getWord();
  //   }, []);

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        <h2>How to Play Wordle (Like a Pro Gamer)</h2>
        <ul>
          <li>
            <p>
              Type your guess into the grid. Hit Enter to lock it in. (Think of
              this like your first shot — make it count!)
            </p>
          </li>
          <li>
            <p>After each guess, the tiles change color:</p>
            <p>Green = Right letter, right spot. Let's gooo!</p>
            <p>Yellow = Right letter, wrong spot. Getting warmer...</p>
            <p>Red = Nope. Trash. Yeet that letter from your mind.</p>
          </li>
          <li>
            <p>Use the colors to strategize your next move.</p>
            <p>This isn't just luck — it's a word-based battle royale</p>
          </li>
          <li>
            <p>Tips for the Word Warriors:</p>
            <p>
              Start with a balanced word like "SLATE" or "CRANE" — high IQ
              opening strat.
            </p>
            <p>Don't rage quit if it gets tough. Clutch it out.</p>
            <p>Share your win with friends and flex those big-brain plays.</p>
          </li>
        </ul>
        <h6>
          Ready? Click that first tile and drop into the grid. Time to frag that
          mystery word. GLHF!
        </h6>
      </div>
      <div className="gameWindow">
        <Game word={word} />
      </div>
      <div className="highscore"></div>
    </div>
  );
};

export default page;
