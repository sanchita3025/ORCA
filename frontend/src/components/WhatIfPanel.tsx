type WhatIfPanelProps = {
  onTimeChange: (time: string) => void;
  selectedTime: string;
  loading?: boolean;
};

function WhatIfPanel({
  onTimeChange,
  selectedTime,
  loading = false,
}: WhatIfPanelProps) {

  const times = [
    "06:00",
    "08:00",
    "10:00",
    "12:00",
  ];

  return (
    <section className="what-if-section">

      <div className="section-heading">

        <span>🔄</span>

        <div>

          <h2>
            WHAT IF?
          </h2>

          <p>
            See how changing the departure
            time affects the assessment.
          </p>

        </div>

      </div>

      <div className="time-options">

        {times.map((time) => (

          <button
            key={time}
            type="button"
            className={
              selectedTime === time
                ? "time-selected"
                : ""
            }
            onClick={() =>
              onTimeChange(time)
            }
            disabled={loading}
          >
            {time}
          </button>

        ))}

      </div>

      {loading && (

        <p className="what-if-loading">
          🐋 ORCA is recalculating the
          conditions...
        </p>

      )}

    </section>
  );
}

export default WhatIfPanel;