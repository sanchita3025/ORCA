import { useEffect, useState } from "react";

type QueryFormProps = {
  onAsk: (data: {
    question: string;
    latitude: number;
    longitude: number;
    datetime: string;
    locationName: string;
  }) => void;

  loading?: boolean;
};

type LocationOption = {
  name: string;
  latitude: number;
  longitude: number;
};

const locations: LocationOption[] = [
  {
    name: "Paradip Coast",
    latitude: 20.31,
    longitude: 86.61,
  },
  {
    name: "Gopalpur Coast",
    latitude: 19.27,
    longitude: 84.91,
  },
  {
    name: "Puri Coast",
    latitude: 19.81,
    longitude: 85.83,
  },
  {
    name: "Chilika Lake",
    latitude: 19.72,
    longitude: 85.32,
  },
  {
    name: "Visakhapatnam Coast",
    latitude: 17.69,
    longitude: 83.22,
  },
];

/* -----------------------------------------
   GET LOCAL DATE
----------------------------------------- */

function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function QueryForm({
  onAsk,
  loading = false,
}: QueryFormProps) {
  const [question, setQuestion] =
    useState("");

  const [location, setLocation] =
    useState<LocationOption>(
      locations[0]
    );

  const [search, setSearch] =
    useState("");

  const [date, setDate] =
    useState(getTodayDate());

  const [time, setTime] =
    useState("06:00");

  const [isListening, setIsListening] =
    useState(false);

  const [speechSupported, setSpeechSupported] =
    useState(true);

  const [gettingLocation, setGettingLocation] =
    useState(false);

  const [showLocationOptions, setShowLocationOptions] =
    useState(false);

  /*
   * --------------------------------------------------
   * QUICK QUESTIONS
   * --------------------------------------------------
   */

  const quickQuestions = [
    "Can I go fishing tomorrow morning?",
    "Is the sea safe for fishing today?",
    "Will the weather be suitable for my trip?",
    "What time is safest to go to sea?",
  ];

  /*
   * --------------------------------------------------
   * LOCATION SEARCH
   * --------------------------------------------------
   */

  const filteredLocations =
    search.trim().length === 0
      ? locations
      : locations.filter((item) =>
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

  /*
   * --------------------------------------------------
   * SPEECH SUPPORT
   * --------------------------------------------------
   */

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  /*
   * --------------------------------------------------
   * VOICE INPUT
   * --------------------------------------------------
   */

  function startVoiceInput() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported in this browser. Please use Google Chrome."
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    /*
     * English for now.
     *
     * In Step 11–14 we will connect this
     * to the selected Indian language.
     */

    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (
      event: any
    ) => {
      const transcript =
        event.results[0][0].transcript;

      setQuestion((previous) =>
        previous.trim()
          ? `${previous} ${transcript}`
          : transcript
      );
    };

    recognition.onerror = (
      event: any
    ) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }

  /*
   * --------------------------------------------------
   * CURRENT LOCATION
   * --------------------------------------------------
   */

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      alert(
        "Location services are not supported by this browser."
      );

      return;
    }

    setGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        let locationName =
          "Current Location";

        /*
         * Reverse geocoding:
         *
         * Coordinates are obtained automatically
         * from the device and converted into a
         * human-readable location name.
         */

        try {
          const response =
            await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );

          if (response.ok) {
            const data =
              await response.json();

            locationName =
              data.display_name ||
              "Current Location";
          }
        } catch (error) {
          console.error(
            "Reverse geocoding failed:",
            error
          );
        }

        setLocation({
          name: locationName,
          latitude,
          longitude,
        });

        setSearch(locationName);

        setShowLocationOptions(false);

        setGettingLocation(false);
      },

      (error) => {
        console.error(
          "Location error:",
          error
        );

        setGettingLocation(false);

        if (error.code === 1) {
          alert(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else {
          alert(
            "Unable to access your current location. Please try again."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  /*
   * --------------------------------------------------
   * SELECT LOCATION
   * --------------------------------------------------
   */

  function selectLocation(
    selectedLocation: LocationOption
  ) {
    setLocation(selectedLocation);

    setSearch(
      selectedLocation.name
    );

    setShowLocationOptions(false);
  }

  /*
   * --------------------------------------------------
   * SUBMIT
   * --------------------------------------------------
   */

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!question.trim()) {
      alert(
        "Please enter or speak your question."
      );

      return;
    }

    if (!date || !time) {
      alert(
        "Please select a departure date and time."
      );

      return;
    }

    onAsk({
      question: question.trim(),

      /*
       * IMPORTANT:
       *
       * The user does NOT enter coordinates.
       *
       * ORCA receives them internally from the
       * selected location or current location.
       */

      latitude:
        location.latitude,

      longitude:
        location.longitude,

      datetime:
        `${date}T${time}:00`,

      locationName:
        location.name,
    });
  }

  /*
   * --------------------------------------------------
   * RENDER
   * --------------------------------------------------
   */

  return (
    <form
      className="query-form"
      onSubmit={handleSubmit}
    >

      {/* ============================================
          QUESTION
      ============================================ */}

      <div className="form-section">

        <label htmlFor="question">
          What do you want to know?
        </label>

        <div className="question-input-wrapper">

          <textarea
            id="question"
            value={question}
            onChange={(event) =>
              setQuestion(
                event.target.value
              )
            }
            placeholder="Ask ORCA anything about your journey, fishing, weather or sea conditions..."
            rows={4}
            disabled={loading}
          />

          {speechSupported && (
            <button
              type="button"
              className={`voice-button ${
                isListening
                  ? "voice-listening"
                  : ""
              }`}
              onClick={
                startVoiceInput
              }
              disabled={
                loading ||
                isListening
              }
              title="Speak your question"
            >
              {isListening
                ? "🔴"
                : "🎤"}
            </button>
          )}

        </div>

        {isListening && (
          <p className="voice-status">
            🎤 Listening... Speak naturally.
          </p>
        )}

        <p className="voice-hint">
          Type your question or tap 🎤 to
          speak.
        </p>

        {/* QUICK QUESTIONS */}

        <div className="example-questions">

          <span>
            TRY ASKING
          </span>

          {quickQuestions.map(
            (quickQuestion) => (
              <button
                type="button"
                key={quickQuestion}
                onClick={() =>
                  setQuestion(
                    quickQuestion
                  )
                }
                disabled={loading}
              >
                {quickQuestion}
              </button>
            )
          )}

        </div>

      </div>

      {/* ============================================
          LOCATION
      ============================================ */}

      <div className="form-section">

        <label htmlFor="location">
          Where are you going?
        </label>

        <div className="location-search-wrapper">

          <input
            id="location"
            type="text"
            value={search}
            onFocus={() =>
              setShowLocationOptions(
                true
              )
            }
            onChange={(event) => {
              setSearch(
                event.target.value
              );

              setShowLocationOptions(
                true
              );
            }}
            placeholder="Search for a coastal location..."
            disabled={loading}
            autoComplete="off"
          />

          {showLocationOptions && (
            <div className="location-options">

              {filteredLocations.length >
              0 ? (
                filteredLocations.map(
                  (item) => (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() =>
                        selectLocation(
                          item
                        )
                      }
                      disabled={loading}
                    >
                      <span>
                        📍
                      </span>

                      <span>
                        {item.name}
                      </span>
                    </button>
                  )
                )
              ) : (
                <p>
                  No matching location
                  found.
                </p>
              )}

            </div>
          )}

        </div>

        {/* CURRENT LOCATION */}

        <button
          type="button"
          className="current-location-button"
          onClick={
            useCurrentLocation
          }
          disabled={
            loading ||
            gettingLocation
          }
        >
          {gettingLocation
            ? "🧭 Finding your location..."
            : "🧭 Use my current location"}
        </button>

        <p className="selected-location">
          Selected location:{" "}
          <strong>
            {location.name}
          </strong>
        </p>

        <p className="voice-hint">
          You don't need to enter latitude
          or longitude. ORCA handles the
          coordinates automatically.
        </p>

      </div>

      {/* ============================================
          DATE + TIME
      ============================================ */}

      <div className="location-row">

        <div className="form-section">

          <label htmlFor="date">
            Departure date
          </label>

          <input
            id="date"
            type="date"
            value={date}
            min={getTodayDate()}
            onChange={(event) =>
              setDate(
                event.target.value
              )
            }
            disabled={loading}
          />

        </div>

        <div className="form-section">

          <label htmlFor="time">
            Departure time
          </label>

          <input
            id="time"
            type="time"
            value={time}
            onChange={(event) =>
              setTime(
                event.target.value
              )
            }
            disabled={loading}
          />

        </div>

      </div>

      {/* ============================================
          ASK ORCA
      ============================================ */}

      <button
        className="ask-button"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "🐋 ORCA IS ANALYZING..."
          : "🐋 ASK ORCA"}
      </button>

    </form>
  );
}

export default QueryForm;