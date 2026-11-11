import styles from "./tooltip.module.css";

export default function Tooltip({ interactionData, width, height }) {
  if (!interactionData) {
    return null;
  }

  return (
    // Wrapper div: positioned over the heatmap
    <div
      style={{
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
      {/* The actual tooltip box */}
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
        <span>{interactionData.xLabel}</span>
        <span>: </span>
        <b>{interactionData.value}°C</b>
      </div>
    </div>
  );
}
