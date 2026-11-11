import * as d3 from "d3";
import { useEffect, useRef } from "react";

const COLOR_LEGEND_MARGIN = {
  top: 0,
  right: 0,
  bottom: 50,
  left: 0,
};

export default function ColorLegend({
  height,
  colorScale,
  width,
  interactionData,
}) {
  const canvasRef = useRef(null);

  // Calculate the available drawing area
  const boundsWidth =
    width - COLOR_LEGEND_MARGIN.right - COLOR_LEGEND_MARGIN.left;

  const boundsHeight =
    height - COLOR_LEGEND_MARGIN.top - COLOR_LEGEND_MARGIN.bottom;

  // Get the minimum and maximum temperatures
  const domain = colorScale.domain();
  const min = domain[0];
  const max = domain[domain.length - 1];

  // Create a scale that maps temperatures to horizontal positions
  const xScale = d3.scaleLinear().range([0, boundsWidth]).domain([min, max]);

  // Create the temperature tick marks
  const allTicks = xScale.ticks(4).map((tick) => {
    return (
      <g key={tick}>
        <line
          x1={xScale(tick)}
          x2={xScale(tick)}
          y1={0}
          y2={boundsHeight + 10}
          stroke="black"
        />

        <text
          x={xScale(tick)}
          y={boundsHeight + 20}
          fontSize={9}
          textAnchor="middle"
        >
          {`${tick.toFixed(0)}°C`}
        </text>
      </g>
    );
  });

  // Find the position of the currently hovered temperature
  const hoveredValue = interactionData?.value;

  const x = Number.isFinite(hoveredValue) ? xScale(hoveredValue) : null;

  const triangleWidth = 9;
  const triangleHeight = 6;

  const triangle =
    x !== null ? (
      <polygon
        points={`${x},0 ${x - triangleWidth / 2},${-triangleHeight} ${
          x + triangleWidth / 2
        },${-triangleHeight}`}
        fill="grey"
      />
    ) : null;

  // Draw the colour gradient on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) {
      return;
    }

    for (let i = 0; i < boundsWidth; i++) {
      const temperature = min + ((max - min) * i) / boundsWidth;

      context.fillStyle = colorScale(temperature);
      context.fillRect(i, 0, 1, boundsHeight);
    }
  }, [boundsWidth, boundsHeight, colorScale, min, max]);

  return (
    <div style={{ width, height }}>
      <div
        style={{
          position: "relative",
          transform: `translate(${COLOR_LEGEND_MARGIN.left}px, ${COLOR_LEGEND_MARGIN.top}px)`,
        }}
      >
        <canvas ref={canvasRef} width={boundsWidth} height={boundsHeight} />

        <svg
          width={boundsWidth}
          height={boundsHeight}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible",
          }}
        >
          {allTicks}
          {triangle}
        </svg>
      </div>
    </div>
  );
}
