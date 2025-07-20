import React, { useRef } from "react";
import styles from "./styles.module.scss";
import { checkLetterInWord } from "../utils";

type propTypes = {
  word: string[];
};

const Game = ({ word }: propTypes) => {
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(null))
  );
  const divRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));

  const handleInput = (letter: string, row: number, col: number) => {
    if (letter && col < 5) {
      const nextInput = inputRefs.current[row - 1][col];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (e.key === "Backspace") {
      const currentInput = inputRefs.current[row - 1][col - 1];
      if (currentInput) {
        currentInput.value = "";
      }
      if (col > 1) {
        const prevInput = inputRefs.current[row - 1][col - 2];
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  // Track which rows are disabled
  const [disabledRows, setDisabledRows] = React.useState<number[]>([]);

  const checkRow = (row: number) => {
    let correctLetters = 0;
    [1, 2, 3, 4, 5].map((col) => {
      const title = divRefs.current[col - 1];
      const input = inputRefs.current[row - 1][col - 1];

      if (title && input && word[col - 1] === input.value.toUpperCase()) {
        input.style.border = "5px solid green";
        title.textContent = word[col - 1];
        correctLetters = correctLetters + 1;
      } else if (
        input &&
        checkLetterInWord(input.value.toUpperCase(), word.toString())
      ) {
        input.style.border = "5px solid yellow";
      } else if (input && word[col - 1] !== input.value.toUpperCase()) {
        input.style.border = "5px solid red";
      }
      if (correctLetters === 5) {
        alert("You Win!");
        setDisabledRows([1, 2, 3, 4, 5, 6]);
      }
    });
    // Disable the current row after checking
    setDisabledRows((prev) => [...prev, row]);
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (row < 6 && col === 5 && e.key === "Enter") {
      const nextInput = inputRefs.current[row][0];
      if (nextInput) {
        nextInput.focus();
      }
      checkRow(row);
    } else if (row === 6 && col === 5 && e.key === "Enter") {
      checkRow(row);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.letterGrid}>
        {[1, 2, 3, 4, 5, 6].map((row) => {
          return (
            <div key={row} className={styles.word}>
              {[1, 2, 3, 4, 5].map((col) => {
                if (row === 1)
                  return (
                    <div
                      ref={(el) => {
                        divRefs.current[col - 1] = el;
                      }}
                      key={(row + col).toString()}
                      className={styles.placeholder}
                    >
                      -
                    </div>
                  );
                else
                  return (
                    <input
                      id={(row + col).toString()}
                      key={col}
                      type="text"
                      maxLength={1}
                      disabled={disabledRows.includes(row)}
                      ref={(el) => {
                        inputRefs.current[row - 1][col - 1] = el;
                      }}
                      onInput={(e) => {
                        handleInput(
                          (e.target as HTMLInputElement).value,
                          row,
                          col
                        );
                      }}
                      onKeyDown={(e) => {
                        handleKeyDown(e, row, col);
                        handleEnter(e, row, col);
                      }}
                    />
                  );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
