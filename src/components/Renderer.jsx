import { useMemo } from "react";
import * as d3 from "d3";
import { MARGIN } from "./constants.js";
import styles from "./renderer.module.css";

export default function Renderer({
  width,
  height,
  data,
  setHoveredCell,
  colorScale,
}) {
  // The bounds (= area inside the margins)
  const boundsWidth = width - MARGIN.right - MARGIN.left;

  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Get all unique cities
  const allYGroups = useMemo(
    () => [...new Set(data.map((d) => d.city))],
    [data],
  );

  // Get all unique weeks
  const allXGroups = useMemo(
    () => [...new Set(data.map((d) => String(d.week)))],
    [data],
  );

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [allXGroups, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [allYGroups, boundsHeight]);

  // Build the rectangles
  const allShapes = data.map((d, i) => {
    const x = xScale(String(d.week));
    const y = yScale(d.city);

    if (d.value === null || x == null || y == null) {
      return null;
    }

    return (
      <rect
        key={i}
        className={styles.rectangle}
        x={x}
        y={y}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={colorScale(d.value)}
        rx={5}
        onMouseEnter={() => {
          setHoveredCell({
            xLabel: `Week ${d.week + 1}`,
            yLabel: d.city,
            xPos: x + xScale.bandwidth() + MARGIN.left,
            yPos: y + yScale.bandwidth() / 2 + MARGIN.top,
            value: Math.round(d.value * 100) / 100,
          });
        }}
        onMouseLeave={() => setHoveredCell(null)}
      />
    );
  });

  // Build the week labels
  const xLabels = allXGroups.map((week) => {
    const x = xScale(week);

    if (x == null) {
      return null;
    }

    return (
      <text
        key={week}
        x={x + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {Number(week) + 1}
      </text>
    );
  });

  // Build the city labels
  const yLabels = allYGroups.map((city) => {
    const y = yScale(city);

    if (y == null) {
      return null;
    }

    return (
      <text
        key={city}
        x={-5}
        y={y + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {city}
      </text>
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
      >
        {allShapes}
        {xLabels}
        {yLabels}
      </g>
    </svg>
  );
}
