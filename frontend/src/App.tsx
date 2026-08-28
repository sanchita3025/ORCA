import { useState } from "react";
import "./App.css";

import MarineMap from "./components/MarineMap";
import LoadingScreen from "./components/LoadingScreen";
import { demoData } from "./data/demoData";
import { getSatelliteData } from "./services/api";
import type { SatelliteData } from "./services/api";

function App() {
  const [question, setQuestion] = useState("");

  const [latitude, setLatitude] = useState("20.26");
  const [longitude, setLongitude] = useState("86.70");

  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const [satelliteData, setSatelliteData] =
    useState<SatelliteData | null>(null);

  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    const lat = Number(latitude);
    const lon = Number(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      alert("Please enter valid latitude and longitude.");
      return;
    }

    setLoading(true);
    setShowResult(false);
    setError("");

    try {
      const data = await getSatelliteData(lat, lon);

      console.log("Satellite data:", data);

      setSatelliteData(data);
      setShowResult(true);
    } catch (err) {
      console.error("Satellite API error:", err);

      setError(
        "Unable to fetch satellite data. Please make sure the ORCA backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">
        <div className="logo">
          🐋 ORCA
        </div>

        <div className="nav-subtitle">
          Marine Ecosystem Intelligence
        </div>
      </nav>


      {/* MAIN */}

      <main className="container">

        {/* QUESTION */}

        <section className="hero">

          <h1>
            What do you want to know?
          </h1>

          <p>
            Ask ORCA about marine conditions,
            fishing safety, ocean conditions and more.
          </p>


          <textarea
            placeholder="Can I go fishing tomorrow morning near Paradip?"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />


          {/* LOCATION */}

          <div className="location-row">

            <div className="input-group">

              <label>
                Latitude
              </label>

              <input
                value={latitude}
                onChange={(e) =>
                  setLatitude(e.target.value)
                }
              />

            </div>


            <div className="input-group">

              <label>
                Longitude
              </label>

              <input
                value={longitude}
                onChange={(e) =>
                  setLongitude(e.target.value)
                }
              />

            </div>

          </div>


          {/* DATE + TIME */}

          <div className="location-row">

            <div className="input-group">

              <label>
                Date
              </label>

              <input type="date" />

            </div>


            <div className="input-group">

              <label>
                Time
              </label>

              <input type="time" />

            </div>

          </div>


          {/* ASK BUTTON */}

          <button
            className="ask-button"
            onClick={handleAsk}
            disabled={loading}
          >
            🐋 {loading ? "ANALYZING..." : "ASK ORCA"}
          </button>

        </section>


        {/* ERROR */}

        {error && (
          <div className="section-card">
            <p>{error}</p>
          </div>
        )}


        {/* LOADING */}

        {loading && (
          <LoadingScreen />
        )}


        {/* RESULTS */}

        {showResult &&
          !loading &&
          satelliteData && (

          <section className="results">

            {/* RISK */}

            <div className="risk-card">

              <div>

                <span className="risk-label">
                  🟡 {demoData.risk.level} RISK
                </span>

                <h2>
                  {demoData.risk.score} / 100
                </h2>

                <p>
                  Conditions require caution.
                </p>

              </div>

            </div>


            {/* MARINE DATA */}

            <div className="cards">

              <div className="card">

                <span>🌊</span>

                <h3>
                  Ocean
                </h3>

                <strong>
                  {demoData.ocean.wave_height} m
                </strong>

                <p>
                  Wave height
                </p>

              </div>


              <div className="card">

                <span>💨</span>

                <h3>
                  Wind
                </h3>

                <strong>
                  {demoData.weather.wind_speed} km/h
                </strong>

                <p>
                  Wind speed
                </p>

              </div>


              {/* REAL SST */}

              <div className="card">

                <span>🌡️</span>

                <h3>
                  SST
                </h3>

                <strong>
                  {satelliteData.sst.value}°C
                </strong>

                <p>
                  Sea surface temperature
                </p>

              </div>


              {/* REAL PFZ */}

              <div className="card">

                <span>🛰️</span>

                <h3>
                  PFZ
                </h3>

                <strong>
                  {satelliteData.pfz.available
                    ? "Available"
                    : "Not Available"}
                </strong>

                <p>
                  {satelliteData.source.pfz}
                </p>

              </div>

            </div>


            {/* CHLOROPHYLL */}

            <div className="section-card">

              <h2>
                🌿 CHLOROPHYLL
              </h2>

              <div className="confidence-score">

                {satelliteData.chlorophyll.value}

              </div>

              <p>
                Unit: {satelliteData.chlorophyll.unit}
              </p>

              <p>
                Source: {satelliteData.source.chlorophyll}
              </p>

            </div>


            {/* WHY */}

            <div className="section-card">

              <h2>
                💡 WHY THIS RESULT?
              </h2>


              <div className="breakdown">

                <div>
                  <span>🌊 Waves</span>
                  <strong>
                    +{demoData.breakdown.waves}
                  </strong>
                </div>


                <div>
                  <span>💨 Wind</span>
                  <strong>
                    +{demoData.breakdown.wind}
                  </strong>
                </div>


                <div>
                  <span>🌦️ Weather</span>
                  <strong>
                    +{demoData.breakdown.weather}
                  </strong>
                </div>


                <div>
                  <span>🌊 Ocean</span>
                  <strong>
                    +{demoData.breakdown.ocean}
                  </strong>
                </div>


                <div>
                  <span>🛰️ PFZ</span>
                  <strong>
                    {demoData.breakdown.pfz}
                  </strong>
                </div>

              </div>


              <p className="explanation">

                Satellite observations provide
                real-time marine indicators including
                sea surface temperature,
                chlorophyll concentration and
                potential fishing zone information.

              </p>

            </div>


            {/* MAP */}

            <div className="section-card">

              <h2>
                🗺️ MARINE MAP
              </h2>

              <MarineMap />

            </div>


            {/* CONFIDENCE */}

            <div className="section-card confidence">

              <h2>
                📊 DATA CONFIDENCE
              </h2>

              <div className="confidence-score">

                {Math.round(
                  demoData.verification.confidence * 100
                )}
                %

              </div>


              <p>
                ✓ Weather
              </p>

              <p>
                ✓ Ocean
              </p>

              <p>
                ✓ Satellite
              </p>

              <p>
                ✓ GIS
              </p>

            </div>


            {/* WHAT IF */}

            <div className="section-card">

              <h2>
                🔄 WHAT IF?
              </h2>

              <p>
                What if I leave at:
              </p>


              <div className="time-buttons">

                <button>
                  6 AM
                </button>

                <button>
                  8 AM
                </button>

                <button>
                  10 AM
                </button>

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default App;