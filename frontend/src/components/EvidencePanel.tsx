type EvidencePanelProps = {
  verification?: {
    verified?: boolean;
    confidence?: number;
  };
};

function EvidencePanel({
  verification,
}: EvidencePanelProps) {
  const verified =
    verification?.verified ?? false;

  const confidence = Math.round(
    (verification?.confidence ?? 0) * 100
  );

  const evidence = [
    {
      icon: "🌦️",
      name: "Weather",
      status: "Available",
      source: "Weather data service",
      time: "Recent",
    },
    {
      icon: "🌊",
      name: "Ocean",
      status: "Available",
      source: "Marine data service",
      time: "Recent",
    },
    {
      icon: "🛰️",
      name: "Satellite / PFZ",
      status: "Available",
      source: "INCOIS / Satellite data",
      time: "Recent",
    },
    {
      icon: "🗺️",
      name: "GIS",
      status: "Available",
      source: "Geospatial data",
      time: "Recent",
    },
  ];

  return (
    <div className="evidence-panel">

      {/* ==========================================
          VERIFICATION SUMMARY
      ========================================== */}

      <div className="evidence-verification">

        <div>
          <strong>
            Overall verification
          </strong>

          <span>
            {verified
              ? "✓ Verified"
              : "⚠ Partial verification"}
          </span>
        </div>

        <div>
          <strong>
            Confidence
          </strong>

          <span>
            {confidence}%
          </span>
        </div>

      </div>

      {/* ==========================================
          CONFIDENCE BAR
      ========================================== */}

      <div className="evidence-confidence">

        <div className="evidence-confidence-header">

          <span>
            Data confidence
          </span>

          <strong>
            {confidence}%
          </strong>

        </div>

        <div className="evidence-confidence-bar">

          <div
            style={{
              width: `${confidence}%`,
            }}
          />

        </div>

      </div>

      {/* ==========================================
          DATA SOURCES
      ========================================== */}

      <div className="evidence-grid">

        {evidence.map((item) => (

          <div
            className="evidence-card"
            key={item.name}
          >

            <div className="evidence-icon">
              {item.icon}
            </div>

            <div className="evidence-info">

              <h3>
                {item.name}
              </h3>

              <div className="evidence-status">

                <span>
                  ✓
                </span>

                {item.status}

              </div>

              <p>
                {item.source}
              </p>

              <small>
                Updated: {item.time}
              </small>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default EvidencePanel;