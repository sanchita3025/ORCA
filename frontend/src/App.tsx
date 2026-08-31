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
import WelcomeScreen from "./components/WelcomeScreen";

import { demoData } from "./data/demoData";

type AssessmentLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

type Assessment = {
  answer: string;

  risk: {
    score: number;
    level: string;
    message: string;
  };

  weather: {
    temperature: number;
    wind_speed: number;
    precipitation: number;
  };

  ocean: {
    wave_height: number;
    wave_period: number;
    current_speed: number;
    sst: number;
  };

  satellite: {
    pfz_available: boolean;
    pfz: string;
  };

  gis: {
    restricted_zone: boolean;
    location_name: string;
  };

  breakdown: {
    wind?: number;
    waves?: number;
    wave?: number;
    weather?: number;
    ocean?: number;
    pfz?: number;
    gis?: number;
  };

  verification: {
    verified: boolean;
    confidence: number;
  };
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [query, setQuery] = useState("");

  const [selectedTime, setSelectedTime] =
    useState("06:00");

  const [assessmentLocation, setAssessmentLocation] =
    useState<AssessmentLocation>({
      name: "Paradip Coast",
      latitude: 20.31,
      longitude: 86.61,
    });

  const [assessment, setAssessment] =
    useState<Assessment>({
      answer: demoData.answer,

      risk: {
        score: demoData.risk.score,
        level: demoData.risk.level,
        message:
          "Conditions are moderately suitable based on the available marine data.",
      },

      weather: demoData.weather,
      ocean: demoData.ocean,
      satellite: demoData.satellite,
      gis: demoData.gis,
      breakdown: demoData.breakdown,
      verification: demoData.verification,
    });

  /* =========================================================
     WELCOME
  ========================================================= */

  function handleWelcomeComplete() {
    setShowWelcome(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================================
     RISK LEVEL
  ========================================================= */

  function getRiskLevel(score: number) {
    if (score <= 30) return "LOW";
    if (score <= 50) return "MODERATE";
    if (score <= 70) return "HIGH";
    return "SEVERE";
  }

  /* =========================================================
     TIME MATRIX
     
     Frontend fallback used only when backend
     is unavailable.
  ========================================================= */

  const timeMatrix: Record<
    string,
    {
      adjustment: number;
      message: string;
    }
  > = {
    "06:00": {
      adjustment: 0,
      message:
        "Early morning conditions appear comparatively favorable in this demonstration scenario.",
    },

    "07:00": {
      adjustment: 3,
      message:
        "Conditions remain relatively favorable around 7 AM, though marine conditions should still be monitored.",
    },

    "08:00": {
      adjustment: 6,
      message:
        "Conditions may become less favorable by 8 AM. An earlier departure is preferable.",
    },

    "09:00": {
      adjustment: 9,
      message:
        "Conditions show a gradual increase in risk around 9 AM. Earlier departure is preferable.",
    },

    "10:00": {
      adjustment: 12,
      message:
        "Risk increases by 10 AM. ORCA recommends considering an earlier departure.",
    },

    "11:00": {
      adjustment: 15,
      message:
        "Conditions become progressively less favorable around 11 AM.",
    },

    "12:00": {
      adjustment: 18,
      message:
        "Conditions are less favorable around noon in this demonstration scenario.",
    },

    "13:00": {
      adjustment: 21,
      message:
        "Afternoon conditions indicate increasing demonstration risk.",
    },

    "14:00": {
      adjustment: 24,
      message:
        "Conditions around 2 PM are less favorable compared with the early morning period.",
    },

    "15:00": {
      adjustment: 27,
      message:
        "Marine risk continues to increase around 3 PM in this demonstration scenario.",
    },

    "16:00": {
      adjustment: 30,
      message:
        "Conditions around 4 PM show elevated demonstration risk.",
    },

    "17:00": {
      adjustment: 33,
      message:
        "Conditions around 5 PM are comparatively less favorable.",
    },

    "18:00": {
      adjustment: 36,
      message:
        "Evening conditions indicate higher demonstration risk. Caution is advised.",
    },

    "19:00": {
      adjustment: 39,
      message:
        "Conditions around 7 PM show elevated demonstration risk.",
    },

    "20:00": {
      adjustment: 42,
      message:
        "Conditions around 8 PM are among the less favorable options in this demonstration scenario.",
    },
  };

  /* =========================================================
     DEMO TIME CALCULATION
  ========================================================= */

  function createTimeAdjustedAssessment(
    time: string
  ): Assessment {
    const baseScore =
      Number(demoData.risk.score) || 0;

    const timeData =
      timeMatrix[time] ?? {
        adjustment: 0,
        message:
          "Conditions are moderately suitable based on the available marine data.",
      };

    const adjustment =
      timeData.adjustment;

    const newScore = Math.min(
      100,
      Math.max(
        0,
        baseScore + adjustment
      )
    );

    const newLevel =
      getRiskLevel(newScore);

    return {
      answer: timeData.message,

      risk: {
        score: newScore,

        level: newLevel,

        message:
          adjustment === 0
            ? "The selected departure time has the lowest demonstration risk among the available options."
            : `Changing the departure time to ${time} increases the demonstration risk score by ${adjustment} points.`,
      },

      weather: {
        ...demoData.weather,

        wind_speed:
          Number(
            demoData.weather.wind_speed
          ) +
          Math.round(
            adjustment * 0.15
          ),
      },

      ocean: {
        ...demoData.ocean,

        wave_height:
          Number(
            demoData.ocean.wave_height
          ) +
          adjustment * 0.01,
      },

      satellite:
        demoData.satellite,

      gis:
        demoData.gis,

      breakdown: {
        ...demoData.breakdown,

        wind:
          Number(
            demoData.breakdown.wind ?? 0
          ) +
          Math.round(
            adjustment * 0.3
          ),

        waves:
          Number(
            demoData.breakdown.waves ??
              demoData.breakdown.wave ??
              0
          ) +
          Math.round(
            adjustment * 0.4
          ),

        weather:
          Number(
            demoData.breakdown.weather ?? 0
          ) +
          Math.round(
            adjustment * 0.2
          ),
      },

      verification:
        demoData.verification,
    };
  }

  /* =========================================================
     BACKEND API
  ========================================================= */

  async function analyzeWithBackend(
    data: {
      question: string;
      latitude: number;
      longitude: number;
      datetime: string;
      locationName: string;
    }
  ): Promise<Assessment> {
    const API_URL =
      import.meta.env.VITE_API_URL ||
      "http://localhost:8000";

    const response = await fetch(
      `${API_URL}/analyze`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          question: data.question,
          latitude: data.latitude,
          longitude: data.longitude,
          datetime: data.datetime,
          location: data.locationName,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Backend returned ${response.status}`
      );
    }

    const result =
      await response.json();

    return {
      answer:
        result.answer ??
        "Assessment completed.",

      risk: {
        score:
          Number(
            result.risk?.score ?? 0
          ),

        level:
          String(
            result.risk?.level ??
              "UNKNOWN"
          ),

        message:
          result.risk?.message ??
          result.message ??
          result.answer ??
          "Risk assessment completed.",
      },

      weather:
        result.weather ??
        demoData.weather,

      ocean:
        result.ocean ??
        demoData.ocean,

      satellite:
        result.satellite ??
        demoData.satellite,

      gis:
        result.gis ??
        demoData.gis,

      breakdown:
        result.breakdown ??
        demoData.breakdown,

      verification:
        result.verification ??
        demoData.verification,
    };
  }

  /* =========================================================
     ASK ORCA
  ========================================================= */

  async function handleAsk(
    data: {
      question: string;
      latitude: number;
      longitude: number;
      datetime: string;
      locationName: string;
    }
  ) {
    setQuery(data.question);

    setAssessmentLocation({
      name: data.locationName,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    const submittedTime =
      data.datetime
        .split("T")[1]
        ?.slice(0, 5) ||
      "06:00";

    setSelectedTime(
      submittedTime
    );

    setError(false);
    setLoading(true);
    setShowResults(false);

    try {
      /*
        Try REAL BACKEND first
      */

      const result =
        await analyzeWithBackend(data);

      setAssessment(result);

    } catch (backendError) {
      /*
        Frontend fallback
      */

      console.warn(
        "Backend unavailable. Using demo fallback.",
        backendError
      );

      const fallback =
        createTimeAdjustedAssessment(
          submittedTime
        );

      setAssessment(fallback);
    }

    setLoading(false);
    setShowResults(true);

    setTimeout(() => {
      document
        .getElementById(
          "assessment-results"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 150);
  }

  /* =========================================================
     WHAT IF
     
     Same question
     Same location
     Different departure time
  ========================================================= */

  async function handleTimeChange(
    time: string
  ) {
    if (time === selectedTime) {
      return;
    }

    setSelectedTime(time);
    setLoading(true);
    setError(false);

    /*
      Build today's date dynamically.
    */

    const now = new Date();

    const year =
      now.getFullYear();

    const month =
      String(
        now.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        now.getDate()
      ).padStart(2, "0");

    const datetime =
      `${year}-${month}-${day}T${time}`;

    try {
      /*
        Try REAL BACKEND
      */

      const result =
        await analyzeWithBackend({
          question: query,

          latitude:
            assessmentLocation.latitude,

          longitude:
            assessmentLocation.longitude,

          datetime,

          locationName:
            assessmentLocation.name,
        });

      setAssessment(result);

    } catch (backendError) {
      /*
        Backend unavailable:
        use the frontend time matrix.
      */

      console.warn(
        "What-If backend unavailable. Using demo recalculation.",
        backendError
      );

      const result =
        createTimeAdjustedAssessment(
          time
        );

      setAssessment(result);
    }

    setLoading(false);
  }

  /* =========================================================
     WELCOME
  ========================================================= */

  if (showWelcome) {
    return (
      <WelcomeScreen
        onComplete={
          handleWelcomeComplete
        }
      />
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return <ErrorScreen />;
  }

  /* =========================================================
     MAIN APP
  ========================================================= */

  return (
    <div className="app">

      <Navbar />

      <main>

        {/* =================================================
            HERO
        ================================================= */}

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
              ORCA combines marine,
              weather, ocean, satellite
              and geographic intelligence
              to reason about real-world
              marine conditions.
            </p>

            <div className="hero-agent-row">

              <span>
                🌊 Ocean Intelligence
              </span>

              <span>
                ☁ Weather Analysis
              </span>

              <span>
                🛰 Satellite Data
              </span>

              <span>
                📍 GIS Intelligence
              </span>

              <span>
                🤖 AI Reasoning
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            QUERY
        ================================================= */}

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
                Tell ORCA what you want
                to know, select a location
                and choose your departure
                time. Coordinates are
                handled automatically.
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

        {/* =================================================
            AGENT NETWORK
        ================================================= */}

        <section className="agent-network-section">

          <div className="agent-network">

            <div className="agent-network-header">

              <h2>
                Collaborative Agent Network
              </h2>

              <div className="network-status">

                <span className="status-dot" />

                {loading
                  ? "ANALYZING"
                  : "SYSTEM READY"}

              </div>

            </div>

            <div className="agent-flow">

              <div className="agent-node">

                <div className="agent-icon">
                  🌊
                </div>

                <strong>
                  OCEAN
                </strong>

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

                <strong>
                  WEATHER
                </strong>

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

                <strong>
                  SATELLITE
                </strong>

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

                <strong>
                  GIS
                </strong>

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

        {/* =================================================
            ANALYSIS STATE
        ================================================= */}

        {loading && (
          <LoadingScreen />
        )}

        {/* =================================================
            RESULTS
        ================================================= */}

        {showResults &&
          !loading && (

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

                    📍{" "}
                    {assessmentLocation.name}

                    {" · "}

                    🕐{" "}
                    {selectedTime}

                  </p>

                </div>

                <div className="live-badge">

                  <span />

                  LIVE INTELLIGENCE

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
                    ORCA combines multiple
                    environmental intelligence
                    sources to generate this
                    decision-support assessment.
                  </p>

                </div>

              </div>

              {/* RISK */}

              <div className="result-section">

                <RiskCard
                  score={
                    assessment.risk.score
                  }

                  level={
                    assessment.risk.level
                  }

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
                  weather={
                    assessment.weather
                  }

                  ocean={
                    assessment.ocean
                  }

                  satellite={
                    assessment.satellite
                  }

                  gis={
                    assessment.gis
                  }
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

                  loading={
                    loading
                  }
                />

              </div>

            </section>
          )}

      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

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