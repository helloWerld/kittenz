import GameBoard from "@/components/GameBoard";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between overflow-x-clip">
      <GameBoard />
    </div>
  );
};

export default page;
