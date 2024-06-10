"use client";

import React, { useState, useEffect } from "react";

const KittenCard = ({
  cardOne,
  cardTwo,
  setCardOne,
  setCardTwo,
  kitten,
  solvedKittensArray,
  setSolvedKittensArray,
}) => {

	const handleClick = () => {
		if (cardOne === null) {
			setCardOne(kitten);
			return;
		}
		if (cardTwo === null) {
			setCardTwo(kitten);
			return
		}
	};

  return (
		<button
			className={`flex items-center justify-center h-24 w-24 sm:h-40 sm:w-40 lg:h-64 lg:w-64 2xl:h-80 2xl:w-80 bg-secondary rounded-lg overflow-clip cursor-pointer`}
			onClick={handleClick}
			disabled={cardOne && cardTwo}
		>
			<p
				className={`${
					(cardOne === kitten ||
						(cardTwo === kitten || solvedKittensArray.includes(kitten.url))) &&
					'hidden'
				}`}
			>
				Click Me
			</p>
			<img
				src={kitten.url}
				className={`${
					cardOne != kitten &&
					cardTwo != kitten &&
					!solvedKittensArray.includes(kitten.url) &&
					'hidden'
				} object-cover w-full h-full`}
			/>
		</button>
	);
};

export default KittenCard;
