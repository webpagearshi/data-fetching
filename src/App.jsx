import { useState, useEffect } from "react";
import { rollups, mean } from "d3-array";
import { CITIES } from "./data/cities.js";
import Heatmap from "./components/Heatmap.jsx";

// The Archive API serves historical data.
// All 20 cities are requested in ONE API call.
const url =
  "https://archive-api.open-meteo.com/v1/archive" +
  "?latitude=" +
  CITIES.map((c) => c.lat).join(",") +
  "&longitude=" +
  CITIES.map((c) => c.lon).join(",") +
  "&start_date=2025-01-01&end_date=2025-12-31" +
  "&daily=temperature_2m_mean&timezone=auto";

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const json = await response.json();

        // Pedagogical delay so the loading state is visible
        await new Promise((r) => setTimeout(r, 1500));

        // STEP 1: Flatten daily data into individual rows

        const YEAR_START = new Date("2025-01-01");
        const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

        const daily = json.flatMap((city, i) =>
          city.daily.time.map((t, j) => ({
            city: CITIES[i].name,
            week: Math.min(
              51,
              Math.floor((new Date(t) - YEAR_START) / WEEK_MS),
            ),
            temp: city.daily.temperature_2m_mean[j],
          })),
        );

        // STEP 2: Calculate average temperature per city and week

        const heatmapData = rollups(
          daily,
          (v) => mean(v, (d) => d.temp),
          (d) => d.city,
          (d) => d.week,
        ).flatMap(([city, weeks]) =>
          weeks.map(([week, value]) => ({
            city,
            week,
            value,
          })),
        );

        setData(heatmapData);

        console.log("Daily records:", daily.length);
        console.log("Heatmap records:", heatmapData.length);
        console.log("Sample records:", heatmapData.slice(0, 5));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      {isLoading && <p style={{ color: "#6b7280", margin: 0 }}>Loading...</p>}

      {!isLoading && data && (
        <div>
          <h2>Data fetched successfully!</h2>
        </div>
      )}
    </div>
  );
}
