interface RiskCardProps {
  score?: number;
  level?: string;
  message?: string;
}

export default function RiskCard({
  score = 0,
  level = "UNKNOWN",
<<<<<<< HEAD
  message,
}: RiskCardProps) {

  const safeLevel =
    String(
      level || "UNKNOWN"
    ).toUpperCase();

  const safeScore =
    Math.min(
      100,
      Math.max(
        0,
        Number(score) || 0
      )
    );

  const getRiskClass = () => {
    switch (safeLevel) {

=======
  message = "Risk information is currently unavailable.",
}: RiskCardProps) {
  const safeLevel = String(level || "UNKNOWN").toUpperCase();

  const getRiskClass = () => {
    switch (safeLevel) {
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
      case "LOW":
        return "risk-low";

      case "MODERATE":
        return "risk-moderate";

      case "HIGH":
        return "risk-high";

      case "SEVERE":
        return "risk-severe";

      default:
        return "risk-unknown";
    }
  };

<<<<<<< HEAD
  const displayMessage =
    message?.trim() ||
    "Risk information is currently unavailable.";

  return (
    <div
      className={`risk-card ${getRiskClass()}`}
    >

      <div className="risk-header">

=======
  return (
    <div className={`risk-card ${getRiskClass()}`}>
      <div className="risk-header">
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
        <span className="risk-label">
          ORCA RISK ASSESSMENT
        </span>

        <span className="risk-level">
          {safeLevel}
        </span>
<<<<<<< HEAD

      </div>

      <div className="risk-score">

        {Math.round(
          safeScore
        )}

        <span>
          / 100
        </span>

      </div>

      <p className="risk-message">
        {displayMessage}
      </p>

=======
      </div>

      <div className="risk-score">
        {Math.round(score)}
        <span>/ 100</span>
      </div>

      <p className="risk-message">
        {message}
      </p>
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
    </div>
  );
}