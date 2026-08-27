import { useState } from "react";
import { demoData } from "./data/demoData";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [latitude, setLatitude] = useState("20.26");
  const [longitude, setLongitude] = useState("86.70");
  const [showResult, setShowResult] = useState(false);

  const handleAsk = () => {
    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    setShowResult(true);
  };

  return (
    <div className="app">
      {/* NAVBAR */}

      <nav className="navbar">
        <div className="logo">🐋 ORCA</div>

        <div className="nav-subtitle">
          Marine Ecosystem Intelligence
        </div>
      </nav>

      {/* QUERY SECTION */}

      <main className="container">

        <section className="hero">
          <h1>What do you want to know?</h1>

          <p>
            Ask ORCA about marine conditions, fishing safety,
            ocean conditions and more.
          </p>

          <textarea
            placeholder="Can I go fishing tomorrow morning near Paradip?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className="location-row">

            <div className="input-group">
              <label>Latitude</label>

              <input
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Longitude</label>

              <input
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>

          </div>

          <div className="location-row">

            <div className="input-group">
              <label>Date</label>

              <input type="date" />
            </div>

            <div className="input-group">
              <label>Time</label>

              <input type="time" />
            </div>

          </div>

          <button className="ask-button" onClick={handleAsk}>
            🐋 ASK ORCA
          </button>
        </section>


        {/* RESULTS */}

        {showResult && (

          <section className="results">

            {/* RISK */}

            <div className="risk-card">

              <div>
                <span className="risk-label">
                  🟡 {demoData.risk.level} RISK
                </span>

                <h2>{demoData.risk.score} / 100</h2>

                <p>
                  Conditions require caution.
                </p>
              </div>

            </div>


            {/* MARINE DATA */}

            <div className="cards">

              <div className="card">
                <span>🌊</span>
                <h3>Ocean</h3>
                <strong>
                  {demoData.ocean.wave_height} m
                </strong>
                <p>Wave height</p>
              </div>


              <div className="card">
                <span>💨</span>
                <h3>Wind</h3>
                <strong>
                  {demoData.weather.wind_speed} km/h
                </strong>
                <p>Wind speed</p>
              </div>


              <div className="card">
                <span>🌡️</span>
                <h3>SST</h3>
                <strong>
                  {demoData.ocean.sst}°C
                </strong>
                <p>Sea surface temperature</p>
              </div>


              <div className="card">
                <span>🛰️</span>
                <h3>PFZ</h3>
                <strong>
                  {demoData.satellite.pfz}
                </strong>
                <p>Satellite analysis</p>
              </div>

            </div>


            {/* WHY */}

            <div className="section-card">

              <h2>💡 WHY THIS RESULT?</h2>

              <div className="breakdown">

                <div>
                  <span>🌊 Waves</span>
                  <strong>+{demoData.breakdown.waves}</strong>
                </div>

                <div>
                  <span>💨 Wind</span>
                  <strong>+{demoData.breakdown.wind}</strong>
                </div>

                <div>
                  <span>🌦️ Weather</span>
                  <strong>+{demoData.breakdown.weather}</strong>
                </div>

                <div>
                  <span>🌊 Ocean</span>
                  <strong>+{demoData.breakdown.ocean}</strong>
                </div>

                <div>
                  <span>🛰️ PFZ</span>
                  <strong>{demoData.breakdown.pfz}</strong>
                </div>

              </div>

              <p className="explanation">
                Wave and wind conditions are the main
                contributors to the current risk.
              </p>

            </div>


            {/* MAP PLACEHOLDER */}

            <div className="section-card">

              <h2>🗺️ MARINE MAP</h2>

              <div className="map-placeholder">

                <div>
                  📍
                  <p>
                    Near Paradip
                  </p>
                </div>

              </div>

            </div>


            {/* CONFIDENCE */}

            <div className="section-card confidence">

              <h2>📊 DATA CONFIDENCE</h2>

              <div className="confidence-score">
                {Math.round(
                  demoData.verification.confidence * 100
                )}%
              </div>

              <p>✓ Weather</p>
              <p>✓ Ocean</p>
              <p>✓ Satellite</p>
              <p>✓ GIS</p>

            </div>


            {/* WHAT IF */}

            <div className="section-card">

              <h2>🔄 WHAT IF?</h2>

              <p>
                What if I leave at:
              </p>

              <div className="time-buttons">

                <button>6 AM</button>
                <button>8 AM</button>
                <button>10 AM</button>

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default App;