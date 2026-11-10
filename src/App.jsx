import { useState, useEffect } from "react";
import { CITIES } from "../data/cities.js";

// The Archive API serves historical data (not the forecast one).
// Comma-separated coordinates = all 20 cities in ONE request.
const url =
  "https://archive-api.open-meteo.com/v1/archive" +
  "?latitude=" +
  CITIES.map((c) => c.lat).join(",") +
  "&longitude=" +
  CITIES.map((c) => c.lon).join(",") +
  "&start_date=2025-01-01&end_date=2025-12-31" +
  "&daily=temperature_2m_mean&timezone=auto";

export default function App() {
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      // Pedagogical delay so the loading state is visible
      await new Promise((r) => setTimeout(r, 1500));
      setCity(json.prices);
      setIsLoading(false);
    };
    fetchWeatherData();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      {isLoading && <p style={{ color: "#6b7280", margin: 0 }}>Loading...</p>}
      {!isLoading && city && <Heatmap data={city} width={480} height={280} />}
    </div>
  );
}
