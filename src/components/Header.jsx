export default function Header({ interactionData, titleColor }) {
  return (
    <header
      style={{
        width: "100%",
        textAlign: "center",
        marginBottom: "24px",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          color: titleColor,
          WebkitTextStroke: "1px #111111",
          paintOrder: "stroke fill",
          margin: 0,
          transition: "color 200ms ease",
        }}
      >
        Temperature from Around the World in 2025
      </h1>

      {interactionData && (
        <div
          style={{
            height: "28px",
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: 600,
            color: "#111111",
            textAlign: "center",
          }}
        >
          {interactionData
            ? `${interactionData.yLabel} · ${interactionData.value}°C · Week of ${interactionData.weekStart}`
            : ""}
        </div>
      )}
    </header>
  );
}
