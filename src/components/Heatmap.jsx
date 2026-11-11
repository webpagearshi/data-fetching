import { useState, useMemo } from "react";
import * as d3 from "d3";
import Header from "./Header.jsx";
import { COLOR_LEGEND_HEIGHT } from "./constants.js";
import Renderer from "./Renderer.jsx";
import Tooltip from "./Tooltip.jsx";
import ColorLegend from "./ColorLegend.jsx";

export default function Heatmap({ width, height, data }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Get all valid temperature values
  const values = useMemo(
    () =>
      data.map((d) => d.value).filter((d) => d !== null && Number.isFinite(d)),
    [data],
  );

  // Find minimum and maximum temperatures
  const min = d3.min(values) ?? 0;
  const max = d3.max(values) ?? 0;

  // Create a colour scale
  const colorScale = useMemo(
    () =>
      d3
        .scaleSequential()
        .domain([min, max])
        .interpolator((t) => d3.interpolateRdYlBu(1 - t))
        .unknown("#eeeeee"),
    [min, max],
  );
  const titleColor = hoveredCell ? colorScale(hoveredCell.value) : "#111111"; // Change title color based on hovered cell

  return (
    <div style={{ position: "relative" }}>
      <Header interactionData={hoveredCell} titleColor={titleColor} />
      <Renderer
        width={width}
        height={height - COLOR_LEGEND_HEIGHT}
        data={data}
        setHoveredCell={setHoveredCell}
        colorScale={colorScale}
      />

      <Tooltip
        interactionData={hoveredCell}
        width={width}
        height={height - COLOR_LEGEND_HEIGHT}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ColorLegend
          height={COLOR_LEGEND_HEIGHT}
          width={200}
          colorScale={colorScale}
          interactionData={hoveredCell}
        />
      </div>
    </div>
  );
}
