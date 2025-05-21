import React from "react";

const GoldenSpiralLoader = () => {
  const spiralPath = `
    M 75 75
    L 75 25
    A 50 50 0 0 1 125 75
    L 125 125
    A 30 30 0 0 0 95 95
    L 95 60
    A 18 18 0 0 1 113 78
    L 113 113
    A 10 10 0 0 0 103 103
    L 103 85
    A 5 5 0 0 1 108 90
    L 108 108
  `;

  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        margin: "auto",
        transformOrigin: "50% 50%",
      }}
      className="golden-spiral-loader"
    >
      <path
        d={spiralPath}
        stroke="#DAA520"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="400"
        strokeDashoffset="400"
        style={{ animation: "drawBackAndForth 4s linear infinite alternate" }}
      />
      <style>{`
        @keyframes drawBackAndForth {
          0% {
            stroke-dashoffset: 400;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
};

export default GoldenSpiralLoader;
