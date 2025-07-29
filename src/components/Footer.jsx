import React from "react";

export const Footer = () => {
  return (
    <div className="flex justify-center font-mono text-sm text-[#BDBDBD] bg-white pb-2 pt-2">
      <div
        className="flex hover:cursor-pointer text-[#BDBDBD]"
        onClick={() => window.open("https://github.com/loretito", "_black")}
      >
        <p>
          Forked from <span className="font-bold"> loretito </span> 
        </p>
      </div>
      <div
        className="flex hover:cursor-pointer text-[#BDBDBD]"
        onClick={() => window.open("https://github.com/jj-sm", "_black")}
      >
        <p>
        &nbsp;and with elements from <span className="font-bold"> jj-sm</span> 
        </p>
      </div>
      <div
        className="flex hover:cursor-pointer text-[#BDBDBD]"
        onClick={() => window.open("https://github.com/basy-medy", "_black")}
      >
        <p>
          .  Adapted by <span className="font-bold"> basy-medy</span>
        </p>
      </div>
    </div>
  );
};
