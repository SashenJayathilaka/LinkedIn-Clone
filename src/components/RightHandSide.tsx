import React from "react";
import Suggestions from "./Suggestions";

type RightHandSideProps = {};

const RightHandSide: React.FC<RightHandSideProps> = () => {
  return (
    <div className="hidden xl:inline-grid md:col-span-1">
      <div
        className="absolute bg-white"
        style={{
          borderRadius: "10px",
        }}
      >
        <Suggestions />
      </div>
    </div>
  );
};
export default RightHandSide;
