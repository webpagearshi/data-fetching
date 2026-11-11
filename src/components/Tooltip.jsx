import styles from "./tooltip.module.css";

export default function Tooltip({ interactionData, width, height }) {
  if (!interactionData) {
    return null;
  }

  const { percentChange } = interactionData;

  let comparison = null;

  if (percentChange !== null && Number.isFinite(percentChange)) {
    const arrow = percentChange > 0 ? "▲" : percentChange < 0 ? "▼" : "→";
    const arrowColor =
      percentChange > 0 ? "#f28e2b" : percentChange < 0 ? "#4e79a7" : "#111111";
    const sign = percentChange > 0 ? "+" : "";

    comparison = (
      <>
        <span style={{ color: arrowColor, fontWeight: 800 }}>{arrow}</span>{" "}
        {sign}
        {percentChange.toFixed(2)}%
      </>
    );
  }

  return (
    <div
      style={{
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        animation: "tooltipFadeIn 180ms ease",
      }}
    >
      <div
        className={styles.tooltip}
        style={{
          position: "absolute",
          left: interactionData.xPos,
          top: interactionData.yPos,
        }}
      >
        <span>{interactionData.yLabel}</span>
        <br />

        <span>
          Week starting: <b>{interactionData.weekStart}</b>
        </span>
        <br />

        <span>
          Temperature: <b>{interactionData.value}°C</b>
        </span>

        {comparison && (
          <>
            <br />
            <span>
              Previous week: <b>{comparison}</b>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
