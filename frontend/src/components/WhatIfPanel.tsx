type WhatIfPanelProps = {
<<<<<<< HEAD
  onTimeChange: (
    time: string
  ) => void;

  selectedTime: string;

=======
  onTimeChange: (time: string) => void;
  selectedTime: string;
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
  loading?: boolean;
};

function WhatIfPanel({
  onTimeChange,
  selectedTime,
  loading = false,
}: WhatIfPanelProps) {

<<<<<<< HEAD
  // Internal values stay in 24-hour format for the app/API.
  // Users see a clearer 12-hour AM/PM format.
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

  const formatTime = (time: string) => {
    const [hourString, minute] = time.split(":");
    const hour = Number(hourString);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minute} ${period}`;
  };

=======
  const times = [
    "06:00",
    "08:00",
    "10:00",
    "12:00",
  ];

>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
  return (
    <section className="what-if-section">

      <div className="section-heading">

<<<<<<< HEAD
        <span>
          🔄
        </span>
=======
        <span>🔄</span>
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

        <div>

          <h2>
            WHAT IF?
          </h2>

          <p>
            See how changing the departure
<<<<<<< HEAD
            time affects the complete marine
            assessment.
=======
            time affects the assessment.
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
          </p>

        </div>

      </div>

      <div className="time-options">

<<<<<<< HEAD
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
                {formatTime(time)}

                {selected && (
                  <span>
                    ✓
                  </span>
                )}
              </button>
            );
          }
        )}
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

      </div>

      {loading && (
<<<<<<< HEAD
        <div className="what-if-loading">

          <span className="status-dot" />

          ORCA is recalculating
          weather, ocean, satellite
          and GIS conditions...

        </div>
=======

        <p className="what-if-loading">
          🐋 ORCA is recalculating the
          conditions...
        </p>

>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
      )}

    </section>
  );
}

export default WhatIfPanel;