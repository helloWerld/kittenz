"use client";

import React, { useState, useEffect } from "react";
import KittenCard from "./KittenCard";
import { getRandomKittens } from "../services";

const GameBoard = () => {
  const [numOfKittens, setNumOfKittens] = useState(6);
  const [kittens, setKittens] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [solvedKittensArray, setSolvedKittensArray] = useState([]);
  const [loading, setLoading] = useState(true);

  // New game
  const newGame = async () => {
    setLoading(true);
    setKittens([]);
    setCardOne(null);
    setCardTwo(null);
    setSolvedKittensArray([]);
    await fetchKittens();
    setLoading(false);
  };

  // Function to get kittens from API
  const fetchKittens = async () => {
    setLoading(true);
    const response = await getRandomKittens(numOfKittens);
    if (response.isError) {
      alert(response.error);
    } else {
      // Create array of random kittens with updated random id
      const randomKittens = randomizeAndDuplicateKittens(response.kittens);
      setKittens(randomKittens);
    }
    setLoading(false);
  };

  // Function to randomize and duplicate kittens (with unique IDs)
  const randomizeAndDuplicateKittens = (kittensArray) => {
    console.log("kittens array", kittensArray);
    let newArray = [];
    kittensArray.forEach((kitten, index) => {
      let kittenCopy1 = { ...kitten, id: index + "copy1" };
      let kittenCopy2 = { ...kitten, id: index + "copy2" };

      newArray.push(kittenCopy1, kittenCopy2);
    });

    newArray = newArray.sort(() => Math.random() - 0.5);
    console.log("random kittens", newArray);
    return newArray;
  };

  // Function to check matches
  useEffect(() => {
    if (cardTwo === null) return;
    const timeout = setTimeout(() => {
      if (cardOne?.url === cardTwo?.url && cardOne?.id != cardTwo?.id) {
        setSolvedKittensArray((prev) => [...prev, cardOne.url])
      }
      setCardOne(null);
      setCardTwo(null);
    }, 500)
    return () => clearTimeout(timeout)
  }, [cardTwo])

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    newGame();
  }, [numOfKittens] )

  return (
    <div className="flex flex-col item-center justify-center w-full max-w-screen-2xl">
      <div className="flex w-full items-center justify-between mx-auto p-6">
        <button
          className="btn w-fit"
          onClick={() => {
            newGame();
          }}
        >
          New Game
        </button>
        <details id="num_kittens" className="dropdown dropdown-end">
          <summary className="m-1 btn">Number of Kittens</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-300 rounded-box w-52">
            {[6, 8, 10, 12].map((number) => (
              <li
                key={number}
                onClick={() => {
                  setNumOfKittens(number);
                  document
                    .getElementById("num_kittens")
                    .removeAttribute("open");
                }}
              >
                <a>{number}</a>
              </li>
            ))}
          </ul>
        </details>
      </div>
      <div className="flex flex-row items-center justify-center flex-wrap gap-6 mb-12">
        {!loading && kittens.length > numOfKittens ? (
          kittens.map((kitten) => (
            <KittenCard
              key={kitten.id}
              kitten={kitten}
              setCardOne={setCardOne}
              setCardTwo={setCardTwo}
              cardOne={cardOne}
              cardTwo={cardTwo}
              solvedKittensArray={solvedKittensArray}
              setSolvedKittensArray={setSolvedKittensArray}
            />
          ))
        ) : (
          <p className="flex gap-2 justify-center items-center text-2xl font-bold">
            loading kittens{" "}
            <span className="loading loading-dots loading-lg"></span>
          </p>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
