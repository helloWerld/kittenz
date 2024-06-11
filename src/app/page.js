"use client";

import React, { useState } from "react";
import GameBoard from "../components/GameBoard";
import { getRandomKittens } from "../services";
import Link from "next/link";

const newKittens = async (numOfImages) => {
  const response = await getRandomKittens(numOfImages);
  if (response.isError) {
    alert(response.error);
    return null;
  } else {
    return response.kittens;
  }
};

export default function Home() {
  const [kitten, setKitten] = useState({
    breeds: [],
    id: "2ph",
    url: "https://cdn2.thecatapi.com/images/2ph.gif",
    width: 500,
    height: 333,
  });
  const [gameStart, setGameStart] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-clip">
      {!gameStart && (
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row gap-12">
            <div className="flex flex-col w-full lg:w-1/2">
              <h1 className="text-6xl font-bold text-accent">Play kittenz 🧶</h1>
              <h2 className="text-2xl font-bold mt-2">
                The Purr-fectly Ridiculous Kitten Matching Game
              </h2>
              <p className="mb-6 mt-4 font-thin">
                Think you can handle this level of cuteness? Welcome to Kittenz,
                where you'll match the fluffiest, sassiest kittens on the
                internet! Flip those cards, find those matches, and unleash a
                tsunami of adorable chaos. <br />
                <br />
                Prepare for uncontrollable giggles, endless "awwws," and a
                serious case of kitten addiction. Only the bravest can conquer
                the cute! Are you up for the challenge? Play Kittenz now and get
                ready for a purr-splosion of fun! 🐾
              </p>
              <div className="flex flex-row gap-2">
                <Link
                  href="/game"
                  className="btn btn-primary"
                  onClick={() => setGameStart(true)}
                >
                  Start New Game
                </Link>
                <button
                  className="btn btn-ghost"
                  onClick={async () => {
                    const kittens = await newKittens(1);
                    setKitten(kittens[0]);
                  }}
                >
                  Random Kitten
                </button>
              </div>
            </div>
            <img
              src={kitten?.url}
              className="mask mask-heart flex w-11/12 lg:w-1/2 hover:animate-ping rotate-12"
            />
          </div>
        </div>
      )}
      {gameStart && <GameBoard setGameStart={setGameStart} />}
    </main>
  );
}
