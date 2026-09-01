type WelcomeScreenProps = {
  onComplete: () => void;
};

<<<<<<< HEAD
function WelcomeScreen({
  onComplete,
}: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">

      <div className="welcome-glow welcome-glow-one" />
      <div className="welcome-glow welcome-glow-two" />

      <div className="welcome-grid" />

      <div className="welcome-content">

        <div className="welcome-logo">
          <div className="orca-symbol">
            🐋
          </div>
=======
function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      <div className="welcome-glow" />

      <div className="welcome-content">
        <div className="welcome-logo">
          <div className="orca-symbol">🐋</div>
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
        </div>

        <p className="welcome-label">
          MARINE INTELLIGENCE PLATFORM
        </p>

<<<<<<< HEAD
        <h1>
          ORCA
        </h1>

        <h2>
          Marine Ecosystem
          <span>
            Reasoning with Collaborative Agents
          </span>
        </h2>

        <p className="welcome-description">
          AI-powered marine intelligence for
          safer decisions, environmental
          awareness, and ocean understanding.
        </p>

        <div className="welcome-loading">

          <div className="welcome-line">
            <div className="welcome-line-progress" />
          </div>

          <span>
            MARINE INTELLIGENCE SYSTEM READY
          </span>

=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
        </div>

        <button
          type="button"
          onClick={onComplete}
<<<<<<< HEAD
          className="welcome-enter-button"
        >
          <span>ENTER ORCA</span>
          <strong>→</strong>
        </button>

      </div>

      <div className="welcome-bottom">
        <span>ORCA</span>
        <span>•</span>
        <span>SIH 2026</span>
        <span>•</span>
        <span>MARINE INTELLIGENCE</span>
      </div>

=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
    </div>
  );
}

export default WelcomeScreen;