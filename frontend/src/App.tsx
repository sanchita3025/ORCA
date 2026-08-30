import { useEffect, useState } from "react";
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
import WelcomeScreen from "./components/WelcomeScreen";

import { demoData } from "./data/demoData";

type AssessmentLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [query, setQuery] = useState("");

  const [selectedTime, setSelectedTime] = useState("06:00");

  const [assessmentLocation, setAssessmentLocation] =
    useState<AssessmentLocation>({
      name: "Paradip Coast",
      latitude: 20.31,
      longitude: 86.61,
    });

  const [assessment, setAssessment] = useState({
    ...demoData,
    risk: {
      ...demoData.risk,
      message:
        "Conditions are moderately suitable based on the available marine data.",
    },
  });

  // --------------------------------------------------
  // WELCOME SCREEN
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  function handleWelcomeComplete() {
    setShowWelcome(false);
  }

  // --------------------------------------------------
  // RISK LEVEL
  // --------------------------------------------------

  function getRiskLevel(score: number) {
    if (score <= 25) return "LOW";
    if (score <= 50) return "MODERATE";
    if (score <= 75) return "HIGH";
    return "SEVERE";
  }

  // --------------------------------------------------
  // DEMO TIME CALCULATION
  // --------------------------------------------------

  function createTimeAdjustedAssessment(time: string) {
    const baseScore = Number(demoData.risk.score || 0);

    const adjustments: Record<string, number> = {
      "06:00": 0,
      "08:00": 6,
      "10:00": 12,
      "12:00": 18,
    };

    const adjustment = adjustments[time] ?? 0;

    const newScore = Math.min(
      100,
      Math.max(0, baseScore + adjustment)
    );

    const newLevel = getRiskLevel(newScore);

    let newAnswer =
      "Conditions are moderately suitable based on the available marine data.";

    if (time === "08:00") {
      newAnswer =
        "Conditions may become less favorable by 8 AM. An earlier departure is preferable.";
    }

    if (time === "10:00") {
      newAnswer =
        "Risk increases by 10 AM. ORCA recommends considering an earlier departure.";
    }

    if (time === "12:00") {
      newAnswer =
        "Conditions are less favorable around noon in this demonstration scenario.";
    }

    return {
      ...demoData,

      answer: newAnswer,

      risk: {
        ...demoData.risk,

        score: newScore,

        level: newLevel,

        message:
          adjustment === 0
            ? "Current demonstration conditions are moderately suitable."
            : `Changing the departure time to ${time} increases the demonstration risk score by ${adjustment} points.`,
      },

      breakdown: {
        ...demoData.breakdown,

        wind:
          Number(demoData.breakdown?.wind ?? 0) +
          Math.round(adjustment * 0.3),

        waves:
          Number(
            demoData.breakdown?.waves ??
              demoData.breakdown?.wave ??
              0
          ) +
          Math.round(adjustment * 0.4),

        weather:
          Number(demoData.breakdown?.weather ?? 0) +
          Math.round(adjustment * 0.2),
      },
    };
  }

  // --------------------------------------------------
  // STEP 6 — HANDLE ASK ORCA
  // --------------------------------------------------

  function handleAsk(data: {
    question: string;
    latitude: number;
    longitude: number;
    datetime: string;
    locationName: string;
  }) {
    // Save the user's question
    setQuery(data.question);

    // Save selected location
    setAssessmentLocation({
      name: data.locationName,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    // Extract time from datetime
    const submittedTime =
      data.datetime.split("T")[1]?.slice(0, 5) ||
      "06:00";

    setSelectedTime(submittedTime);

    // Reset error
    setError(false);

    // Start analysis
    setLoading(true);

    // Hide old result while analyzing
    setShowResults(false);

    // Demo analysis delay
    setTimeout(() => {
      try {
        const result =
          createTimeAdjustedAssessment(
            submittedTime
          );

        // Store new assessment
        setAssessment(result);

        // Stop loading
        setLoading(false);

        // Show result
        setShowResults(true);

        // Scroll to result
        setTimeout(() => {
          document
            .getElementById("assessment-results")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 100);
      } catch (err) {
        console.error(err);

        setLoading(false);
        setError(true);
      }
    }, 1500);
  }

  // --------------------------------------------------
  // STEP 6B — WHAT IF
  // --------------------------------------------------

  function handleTimeChange(time: string) {
    setSelectedTime(time);

    setLoading(true);

    setTimeout(() => {
      try {
        const result =
          createTimeAdjustedAssessment(time);

        setAssessment(result);

        setLoading(false);
      } catch (err) {
        console.error(err);

        setLoading(false);
        setError(true);
      }
    }, 700);
  }

  // --------------------------------------------------
  // SCREENS
  // --------------------------------------------------

  if (showWelcome) {
    return (
      <WelcomeScreen
        onComplete={handleWelcomeComplete}
      />
    );
  }

  if (error) {
    return <ErrorScreen />;
  }

  // --------------------------------------------------
  // MAIN APP
  // --------------------------------------------------

  return (
    <div className="app">
      <Navbar />

      <main>
        {/* =========================================
            HERO
        ========================================= */}

        <section className="hero-section">
          <div className="hero-grid" />

          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="hero-content">

            <div className="hero-eyebrow">
              <span className="status-dot" />

              MULTI-AGENT MARINE INTELLIGENCE
            </div>

            <h1>
              Understand the ocean.
              <span>
                Make better decisions.
              </span>
            </h1>

            <p className="hero-description">
              ORCA combines marine, weather,
              ocean, satellite and geographic
              intelligence to reason about
              real-world marine conditions.
            </p>

            <div className="hero-agent-row">
              <span>🌊 Ocean Intelligence</span>
              <span>☁ Weather Analysis</span>
              <span>🛰 Satellite Data</span>
              <span>📍 GIS Intelligence</span>
              <span>🤖 AI Reasoning</span>
            </div>

          </div>
        </section>

        {/* =========================================
            QUERY
        ========================================= */}

        <section className="query-section">

          <div className="section-intro">

            <div>

              <p className="section-label">
                ASK ORCA
              </p>

              <h2>
                Ask a question about the{" "}
                <span>
                  marine environment.
                </span>
              </h2>

              <p>
                Tell ORCA what you want to know,
                choose a location and departure
                time. Coordinates are handled
                automatically.
              </p>

            </div>

            <div className="query-badge">
              ● AI DECISION SUPPORT
            </div>

          </div>

          <QueryForm
            onAsk={handleAsk}
            loading={loading}
          />

        </section>

        {/* =========================================
            AGENT NETWORK
        ========================================= */}

        <section className="agent-network-section">

          <div className="agent-network">

            <div className="agent-network-header">

              <h2>
                Collaborative Agent Network
              </h2>

              <div className="network-status">

                <span className="status-dot" />

                SYSTEM READY

              </div>

            </div>

            <div className="agent-flow">

              <div className="agent-node">
                <div className="agent-icon">
                  🌊
                </div>

                <strong>OCEAN</strong>

                <span>
                  Waves & currents
                </span>
              </div>

              <div className="flow-arrow">
                →
              </div>

              <div className="agent-node">
                <div className="agent-icon">
                  ☁
                </div>

                <strong>WEATHER</strong>

                <span>
                  Wind & rainfall
                </span>
              </div>

              <div className="flow-arrow">
                →
              </div>

              <div className="agent-node">
                <div className="agent-icon">
                  🛰
                </div>

                <strong>SATELLITE</strong>

                <span>
                  Marine observations
                </span>
              </div>

              <div className="flow-arrow">
                →
              </div>

              <div className="agent-node">

                <div className="agent-icon">
                  📍
                </div>

                <strong>GIS</strong>

                <span>
                  Location constraints
                </span>

              </div>

              <div className="flow-arrow">
                →
              </div>

              <div className="agent-node final-agent">

                <div className="agent-icon">
                  🤖
                </div>

                <strong>
                  ORCA REASONER
                </strong>

                <span>
                  Final assessment
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            ANALYSIS LOADING
        ========================================= */}

        {loading && (
          <LoadingScreen />
        )}

        {/* =========================================
            RESULTS
        ========================================= */}

        {showResults && !loading && (

          <section
            id="assessment-results"
            className="content-section results-container"
          >

            {/* RESULT HEADER */}

            <div className="result-header">

              <div>

                <p className="section-label">
                  ORCA ASSESSMENT
                </p>

                <h2>
                  Marine Risk Assessment
                </h2>

                <p className="query-preview">
                  “{query}”
                </p>

                <p className="query-location">
                  📍 {assessmentLocation.name}
                  {" · "}
                  🕐 {selectedTime}
                </p>

              </div>

              <div className="live-badge">
                <span />
                DEMO ANALYSIS
              </div>

            </div>

            {/* RECOMMENDATION */}

            <div className="recommendation-card">

              <div className="recommendation-icon">
                ✓
              </div>

              <div className="recommendation-content">

                <span className="section-label">
                  ORCA RECOMMENDATION
                </span>

                <h3>
                  {assessment.answer}
                </h3>

                <p>
                  This assessment is currently
                  powered by ORCA demonstration
                  data. Live marine sources can
                  be connected to the same
                  interface later.
                </p>

              </div>

            </div>

            {/* RISK */}

            <div className="result-section">

              <RiskCard
                score={assessment.risk.score}
                level={assessment.risk.level}
                message={
                  assessment.risk.message
                }
              />

            </div>

            {/* MARINE CONDITIONS */}

            <div className="result-section">

              <div className="section-heading">

                <p className="section-label">
                  MARINE CONDITIONS
                </p>

                <h2>
                  Environmental Overview
                </h2>

              </div>

              <MarineCards
                weather={assessment.weather}
                ocean={assessment.ocean}
                satellite={
                  assessment.satellite
                }
                gis={assessment.gis}
              />

            </div>

            {/* MAP */}

            <div className="result-section">

              <div className="section-heading">

                <p className="section-label">
                  SPATIAL INTELLIGENCE
                </p>

                <h2>
                  {assessmentLocation.name}
                </h2>

              </div>

              <MarineMap
                latitude={
                  assessmentLocation.latitude
                }
                longitude={
                  assessmentLocation.longitude
                }
                locationName={
                  assessmentLocation.name
                }
              />

            </div>

            {/* RISK BREAKDOWN */}

            <div className="result-section">

              <div className="section-heading">

                <p className="section-label">
                  REASONING
                </p>

                <h2>
                  Risk Breakdown
                </h2>

              </div>

              <RiskBreakdown
                breakdown={
                  assessment.breakdown
                }
              />

            </div>

            {/* EVIDENCE */}

            <div className="result-section">

              <div className="section-heading">

                <p className="section-label">
                  EVIDENCE
                </p>

                <h2>
                  Data Verification
                </h2>

              </div>

              <EvidencePanel
                verification={
                  assessment.verification
                }
              />

            </div>

            {/* WHAT IF */}

            <div className="result-section">

              <WhatIfPanel
                selectedTime={
                  selectedTime
                }
                onTimeChange={
                  handleTimeChange
                }
                loading={loading}
              />

            </div>

          </section>

        )}

      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer>

        <div className="footer-brand">

          <div className="footer-logo">
            🐋
          </div>

          <div>

            <strong>
              ORCA
            </strong>

            <span>
              Marine Ecosystem Reasoning
              with Collaborative Agents
            </span>

          </div>

        </div>

        <p>
          AI-powered marine decision support
        </p>

        <div className="footer-tech">
          SIH 2026 • MARINE INTELLIGENCE
        </div>

      </footer>

    </div>
  );
}

export default App;