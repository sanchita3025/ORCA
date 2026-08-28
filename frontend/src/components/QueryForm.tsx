import { useState } from "react";

type QueryFormProps = {
  onAsk: (data: {
    question: string;
    latitude: number;
    longitude: number;
    datetime: string;
  }) => void;
  loading?: boolean;
};

function QueryForm({ onAsk, loading = false }: QueryFormProps) {
  const [question, setQuestion] = useState(
    "Can I go fishing near Paradip tomorrow at 6 AM?"
  );

  const [latitude, setLatitude] = useState("20.31");
  const [longitude, setLongitude] = useState("86.61");
  const [date, setDate] = useState("2026-08-28");
  const [time, setTime] = useState("06:00");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    const lat = Number(latitude);
    const lon = Number(longitude);

    if (Number.isNaN(lat) || lat < -90 || lat > 90) {
      alert("Please enter a valid latitude.");
      return;
    }

    if (Number.isNaN(lon) || lon < -180 || lon > 180) {
      alert("Please enter a valid longitude.");
      return;
    }

    onAsk({
      question,
      latitude: lat,
      longitude: lon,
      datetime: `${date}T${time}:00`,
    });
  }

  return (
    <form className="query-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <label htmlFor="question">What do you want to know?</label>

        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask ORCA about marine conditions..."
          rows={4}
        />
      </div>

      <div className="location-row">
        <div className="form-section">
          <label htmlFor="latitude">Latitude</label>

          <input
            id="latitude"
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label htmlFor="longitude">Longitude</label>

          <input
            id="longitude"
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <div className="location-row">
        <div className="form-section">
          <label htmlFor="date">Date</label>

          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label htmlFor="time">Time</label>

          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <button className="ask-button" type="submit" disabled={loading}>
        {loading ? "🐋 ORCA IS ANALYZING..." : "🐋 ASK ORCA"}
      </button>
    </form>
  );
}

export default QueryForm;