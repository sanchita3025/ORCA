import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import QueryForm from "./components/QueryForm";
import RiskCard from "./components/RiskCard";
import MarineCards from "./components/MarineCards";
import RiskBreakdown from "./components/RiskBreakdown";
import EvidencePanel from "./components/EvidencePanel";
import MarineMap from "./components/MarineMap";
import WhatIfPanel from "./components/WhatIfPanel";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

import { demoData } from "./data/demoData";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAskOrca = () => {
    setError(false);
    setLoading(true);
    setShowResults(false);

    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1800);
  };

  const handleRetry = () => {
    setError(false);
    handleAskOrca();
  };

  return (
    <div className="app">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="orca-badge">🐋 ORCA MARINE INTELLIGENCE</div>

            <h1>
              Marine Ecosystem
              <span> Reasoning Platform</span>
            </h1>

            <p>
              Ask ORCA about marine conditions, fishing safety, weather,
              ocean conditions and recommended zones.
            </p>
          </div>
        </section>

        {/* QUERY */}
        <section className="query-section">
          <QueryForm onAsk={handleAskOrca} />
        </section>

        {/* LOADING */}
        {loading && (
          <section className="content-section">
            <LoadingScreen />
          </section>
        )}

        {/* ERROR */}
        {error && (
          <section className="content-section">
            <ErrorScreen onRetry={handleRetry} />
          </section>
        )}

        {/* RESULTS */}
        {showResults && !loading && !error && (
          <div className="results-container">

            {/* RESULT HEADER */}
            <section className="content-section">
              <div className="result-header">
                <div>
                  <p className="section-label">ORCA ASSESSMENT</p>
                  <h2>Marine Safety Assessment</h2>
                </div>

                <div className="live-badge">
                  ● DEMO DATA
                </div>
              </div>

              <RiskCard data={demoData.risk} />
            </section>

            {/* RECOMMENDATION */}
            <section className="content-section">
              <div className="recommendation-card">
                <div className="recommendation-icon">💡</div>

                <div>
                  <p className="section-label">ORCA RECOMMENDATION</p>
                  <h3>{demoData.answer}</h3>

                  <p>
                    Consider the current marine and weather conditions
                    before making your decision.
                  </p>
                </div>
              </div>
            </section>

            {/* MARINE DATA */}
            <section className="content-section">
              <div className="section-heading">
                <p className="section-label">MARINE CONDITIONS</p>
                <h2>Environmental Overview</h2>
              </div>

              <MarineCards
                weather={demoData.weather}
                ocean={demoData.ocean}
                satellite={demoData.satellite}
                gis={demoData.gis}
              />
            </section>

            {/* WHY */}
            <section className="content-section">
              <div className="section-heading">
                <p className="section-label">EXPLAINABLE REASONING</p>
                <h2>💡 Why this result?</h2>
                <p>
                  ORCA breaks down the factors contributing to the
                  current risk assessment.
                </p>
              </div>

              <RiskBreakdown data={demoData.breakdown} />
            </section>

            {/* MAP */}
            <section className="content-section">
              <div className="section-heading">
                <p className="section-label">SPATIAL INTELLIGENCE</p>
                <h2>🗺️ Marine Map</h2>
                <p>
                  Explore your location, recommended fishing zones and
                  restricted areas.
                </p>
              </div>

              <MarineMap
                latitude={20.26}
                longitude={86.70}
              />
            </section>

            {/* CONFIDENCE */}
            <section className="content-section">
              <div className="confidence-card">
                <div className="confidence-top">
                  <div>
                    <p className="section-label">DATA CONFIDENCE</p>
                    <h2>
                      {Math.round(
                        demoData.verification.confidence * 100
                      )}
                      %
                    </h2>
                  </div>

                  <div className="confidence-status">
                    ✓ Verified
                  </div>
                </div>

                <div className="confidence-bar">
                  <div
                    style={{
                      width: `${
                        demoData.verification.confidence * 100
                      }%`,
                    }}
                  />
                </div>

                <div className="confidence-sources">
                  <span>✓ Weather</span>
                  <span>✓ Ocean</span>
                  <span>✓ Satellite</span>
                  <span>✓ GIS</span>
                </div>
              </div>
            </section>

            {/* EVIDENCE */}
            <section className="content-section">
              <div className="section-heading">
                <p className="section-label">TRACEABLE DATA</p>
                <h2>📚 Evidence & Sources</h2>
              </div>

              <EvidencePanel />
            </section>

            {/* WHAT IF */}
            <section className="content-section">
              <div className="section-heading">
                <p className="section-label">SCENARIO ANALYSIS</p>
                <h2>🔄 What if?</h2>
                <p>
                  Compare different departure times and see how the
                  assessment changes.
                </p>
              </div>

              <WhatIfPanel />
            </section>

          </div>
        )}
      </main>

      <footer>
        <div>
          🐋 <strong>ORCA</strong>
          <span> Marine Ecosystem Intelligence</span>
        </div>

        <p>
          Decision support powered by collaborative marine intelligence.
        </p>
      </footer>
    </div>
  );
}

export default App;