<<<<<<< HEAD
type VerificationData = {
  verified?: boolean;
  confidence?: number;
};

type EvidencePanelProps = {
  verification?: VerificationData;
=======
type EvidencePanelProps = {
  verification?: {
    verified?: boolean;
    confidence?: number;
  };
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
};

function EvidencePanel({
  verification,
}: EvidencePanelProps) {
<<<<<<< HEAD

  const verified =
    verification?.verified ??
    false;

  const confidenceValue =
    Number(
      verification?.confidence ?? 0
    );

  /*
    Backend may return:
    0.87

    or occasionally:
    87

    Normalize both.
  */

  const confidence =
    confidenceValue <= 1
      ? Math.round(
          confidenceValue * 100
        )
      : Math.round(
          confidenceValue
        );

  const safeConfidence =
    Math.min(
      100,
      Math.max(
        0,
        confidence
      )
    );
=======
  const verified =
    verification?.verified ?? false;

  const confidence = Math.round(
    (verification?.confidence ?? 0) * 100
  );
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

  const evidence = [
    {
      icon: "🌦️",
      name: "Weather",
      status: "Available",
      source: "Weather data service",
      time: "Recent",
    },
<<<<<<< HEAD

=======
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
    {
      icon: "🌊",
      name: "Ocean",
      status: "Available",
      source: "Marine data service",
      time: "Recent",
    },
<<<<<<< HEAD

=======
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
    {
      icon: "🛰️",
      name: "Satellite / PFZ",
      status: "Available",
      source: "INCOIS / Satellite data",
      time: "Recent",
    },
<<<<<<< HEAD

=======
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
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

<<<<<<< HEAD
      {/* VERIFICATION SUMMARY */}
=======
      {/* ==========================================
          VERIFICATION SUMMARY
      ========================================== */}
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

      <div className="evidence-verification">

        <div>
<<<<<<< HEAD

=======
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
          <strong>
            Overall verification
          </strong>

          <span>
            {verified
              ? "✓ Verified"
              : "⚠ Partial verification"}
          </span>
<<<<<<< HEAD

        </div>

        <div>

=======
        </div>

        <div>
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
          <strong>
            Confidence
          </strong>

          <span>
<<<<<<< HEAD
            {safeConfidence}%
          </span>

=======
            {confidence}%
          </span>
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
        </div>

      </div>

<<<<<<< HEAD
      {/* CONFIDENCE */}
=======
      {/* ==========================================
          CONFIDENCE BAR
      ========================================== */}
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

      <div className="evidence-confidence">

        <div className="evidence-confidence-header">

          <span>
            Data confidence
          </span>

          <strong>
<<<<<<< HEAD
            {safeConfidence}%
=======
            {confidence}%
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
          </strong>

        </div>

        <div className="evidence-confidence-bar">

          <div
            style={{
<<<<<<< HEAD
              width:
                `${safeConfidence}%`,
=======
              width: `${confidence}%`,
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
            }}
          />

        </div>

      </div>

<<<<<<< HEAD
      {/* SOURCES */}

      <div className="evidence-grid">

        {evidence.map(
          (item) => (

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

          )
        )}
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

      </div>

    </div>
  );
}

export default EvidencePanel;