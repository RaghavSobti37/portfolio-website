import React from "react";

const GOLDEN_RATIO = 1.618;
const SIZE = 200; // SVG size

const GoldenSpiralLoader = () => {
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      style={{ display: "block", margin: "auto" }}
    >
      <path
        fill="none"
        stroke="#DAA520" // golden color
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={generateSpiralPath(SIZE / 2, SIZE / 2, 6)}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1000"
          to="0"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          values="0,1000;1000,0;0,1000"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

// Generate golden spiral path inward with n rectangles/arcs
function generateSpiralPath(cx, cy, n) {
  let path = "";
  let x = cx;
  let y = cy;
  let size = 80;
  let sign = 1;

  for (let i = 0; i < n; i++) {
    // Draw a quarter circle arc
    const r = size;
    // arc: A rx ry x-axis-rotation large-arc-flag sweep-flag x y
    // Sweep flag alternates to go inward spiral
    path += `M ${x} ${y} `;
    path += `a ${r} ${r} 0 0 ${sign > 0 ? 1 : 0} ${sign * r} ${sign * r} `;

    // Move origin for next arc inward
    x += sign * r;
    y += sign * r;

    // Reduce size by golden ratio for next arc
    size = size / GOLDEN_RATIO;
    sign = -sign; // alternate arc sweep direction
  }

  return path;
}

export default GoldenSpiralLoader;
