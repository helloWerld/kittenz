import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img
        src={"https://cdn2.thecatapi.com/images/2ph.gif"}
        className="mask mask-heart flex w-1/2 animate-ping"
      />
    </div>
  );
};

export default loading;
