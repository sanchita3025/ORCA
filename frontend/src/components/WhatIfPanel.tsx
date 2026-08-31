type WhatIfPanelProps = {
  onTimeChange: (
    time: string
  ) => void;

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
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  return (
    <section className="what-if-section">

      <div className="section-heading">

        <span>
          🔄
        </span>

        <div>

          <h2>
            WHAT IF?
          </h2>

          <p>
            See how changing the departure
            time affects the complete marine
            assessment.
          </p>

        </div>

      </div>

      <div className="time-options">

        {times.map(
          (time) => {

            const selected =
              selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                className={
                  selected
                    ? "time-selected"
                    : ""
                }
                onClick={() =>
                  onTimeChange(time)
                }
                disabled={
                  loading ||
                  selected
                }
              >
                {time}

                {selected && (
                  <span>
                    ✓
                  </span>
                )}
              </button>
            );
          }
        )}

      </div>

      {loading && (
        <div className="what-if-loading">

          <span className="status-dot" />

          ORCA is recalculating
          weather, ocean, satellite
          and GIS conditions...

        </div>
      )}

    </section>
  );
}

export default WhatIfPanel;