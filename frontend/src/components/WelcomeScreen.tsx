type WelcomeScreenProps = {
  onComplete: () => void;
};

function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      <div className="welcome-glow" />

      <div className="welcome-content">
        <div className="welcome-logo">
          <div className="orca-symbol">🐋</div>
        </div>

        <p className="welcome-label">
          MARINE INTELLIGENCE PLATFORM
        </p>

        <h1>ORCA</h1>

        <h2>
          Marine Ecosystem
          <span>Reasoning with Collaborative Agents</span>
        </h2>

        <p className="welcome-description">
          AI-powered marine intelligence for safer decisions,
          environmental awareness, and ocean understanding.
        </p>

        <div className="welcome-loading">
          <div className="welcome-line" />

          <span>INITIALIZING MARINE INTELLIGENCE...</span>
        </div>

        <button
          type="button"
          onClick={onComplete}
          style={{
            marginTop: "24px",
            padding: "10px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(103, 232, 249, 0.2)",
            background: "rgba(8, 47, 73, 0.35)",
            color: "#67e8f9",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          ENTER ORCA
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;