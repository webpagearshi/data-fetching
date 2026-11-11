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
        stroke="white"
        strokeWidth={1}
        onMouseEnter={() => {
          const weekDate = new Date(Date.UTC(2025, 0, 1 + d.week * 7));

          const weekStart = weekDate.toLocaleDateString("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          });

          const previousWeek = data.find(
            (item) => item.city === d.city && item.week === d.week - 1,
          );

          let percentChange = null;

          if (previousWeek && previousWeek.value != null) {
            const currentKelvin = d.value + 273.15;
            const previousKelvin = previousWeek.value + 273.15;

            percentChange =
              ((currentKelvin - previousKelvin) / previousKelvin) * 100;
          }

          setHoveredCell({
            xLabel: `Week ${d.week + 1}`,
            yLabel: d.city,
            weekStart,
            xPos: x + xScale.bandwidth() + MARGIN.left,
            yPos: y + yScale.bandwidth() / 2 + MARGIN.top,
            value: Math.round(d.value * 100) / 100,
            percentChange,
          });
        }}
      />
    );
  });

  // Build the week labels
  const monthLabels = [
    { month: "Jan", week: 0 },
    { month: "Feb", week: 5 },
    { month: "Mar", week: 9 },
    { month: "Apr", week: 13 },
    { month: "May", week: 17 },
    { month: "Jun", week: 22 },
    { month: "Jul", week: 26 },
    { month: "Aug", week: 30 },
    { month: "Sep", week: 35 },
    { month: "Oct", week: 39 },
    { month: "Nov", week: 43 },
    { month: "Dec", week: 48 },
  ];

  const xLabels = monthLabels.map((d) => (
    <text
      key={d.month}
      x={xScale(String(d.week)) + xScale.bandwidth() / 2}
      y={boundsHeight + 20}
      textAnchor="middle"
      fontSize={12}
      fill="#333"
      fontFamily="Nunito, sans-serif"
    >
      {d.month}
    </text>
  ));

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
        fontSize={12}
        fontFamily="Nunito, sans-serif"
      >
        {city}
      </text>
    );
  });

  return (
    <svg
      width={width}
      height={height}
      onMouseLeave={() => setHoveredCell(null)}
    >
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
