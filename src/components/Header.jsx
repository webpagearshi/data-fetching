export default function Header({ interactionData, titleColor }) {
  return (
    <header
      style={{
        width: "100%",
        textAlign: "center",
        marginBottom: "24px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          color: titleColor,
          WebkitTextStroke: "0.6px #111111",
          paintOrder: "stroke fill",
          margin: 0,
          transition: "color 200ms ease",
        }}
      >
        Temperature from Around the World in 2025
      </h1>

      {interactionData && (
        <p
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#111111",
            margin: "10px 0 0",
          }}
        >
          {interactionData.yLabel} · {interactionData.value}°C · Week of{" "}
          {interactionData.weekStart}
        </p>
      )}
    </header>
  );
}
