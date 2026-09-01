<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";

type LocationResult = {
  name: string;
  latitude: number;
  longitude: number;
};
=======
import { useEffect, useState } from "react";
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

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

<<<<<<< HEAD
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;

  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function getTodayString() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

  return `${year}-${month}-${day}`;
}

function QueryForm({
  onAsk,
  loading = false,
}: QueryFormProps) {
<<<<<<< HEAD
  const [question, setQuestion] = useState("");

  /*
  =========================================================
  LOCATION
  =========================================================
  */

  const [locationInput, setLocationInput] =
    useState("Paradip Coast");

  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult>({
      name: "Paradip Coast",
      latitude: 20.31,
      longitude: 86.61,
    });

  const [locationResults, setLocationResults] =
    useState<LocationResult[]>([]);

  const [locationSearching, setLocationSearching] =
    useState(false);

  const [showLocationResults, setShowLocationResults] =
    useState(false);

  const [locationError, setLocationError] =
    useState("");

  /*
  =========================================================
  DATE + TIME
  =========================================================
  */

  const [selectedDate, setSelectedDate] =
    useState(getTodayString());

  const [selectedTime, setSelectedTime] =
    useState("06:00");

  /*
  =========================================================
  SPEECH
  =========================================================
  */

=======
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

>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
  const [isListening, setIsListening] =
    useState(false);

  const [speechSupported, setSpeechSupported] =
    useState(true);

<<<<<<< HEAD
  const [speechError, setSpeechError] =
    useState("");

  const [interimText, setInterimText] =
    useState("");

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const locationSearchTimer =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
  =========================================================
  SPEECH RECOGNITION
  =========================================================
  */
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
<<<<<<< HEAD
      return;
    }

    setSpeechSupported(true);

    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
=======
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

>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
<<<<<<< HEAD
      setSpeechError("");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        const result = event.results[i];

        const transcript =
          result[0]?.transcript || "";

        if (result.isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript.trim()) {
        setQuestion((previous) => {
          const separator =
            previous.trim().length > 0
              ? " "
              : "";

          return (
            previous.trim() +
            separator +
            finalTranscript.trim()
          );
        });
      }

      setInterimText(interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error(
        "ORCA Speech Recognition Error:",
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
        event.error
      );

      setIsListening(false);
<<<<<<< HEAD

      switch (event.error) {
        case "not-allowed":
          setSpeechError(
            "Microphone permission was denied. Please allow microphone access."
          );
          break;

        case "audio-capture":
          setSpeechError(
            "No microphone was detected. Check your microphone."
          );
          break;

        case "network":
          setSpeechError(
            "Speech service could not connect. Check your internet connection."
          );
          break;

        case "no-speech":
          setSpeechError(
            "No speech was detected. Please try again."
          );
          break;

        case "aborted":
          setSpeechError("");
          break;

        default:
          setSpeechError(
            `Speech recognition error: ${event.error}`
          );
      }
=======
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
    };

    recognition.onend = () => {
      setIsListening(false);
<<<<<<< HEAD
      setInterimText("");
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {
        // Ignore cleanup errors
      }

      recognitionRef.current = null;
    };
  }, []);

  /*
  =========================================================
  LOCATION SEARCH
  OpenStreetMap Nominatim
  =========================================================
  */

  useEffect(() => {
    const searchText =
      locationInput.trim();

    if (
      searchText.length < 3 ||
      searchText === selectedLocation.name
    ) {
      setLocationResults([]);
      setShowLocationResults(false);
      return;
    }

    if (locationSearchTimer.current) {
      clearTimeout(
        locationSearchTimer.current
      );
    }

    locationSearchTimer.current =
      setTimeout(async () => {
        try {
          setLocationSearching(true);
          setLocationError("");

          const url =
            `https://nominatim.openstreetmap.org/search` +
            `?q=${encodeURIComponent(searchText)}` +
            `&format=json` +
            `&limit=5` +
            `&countrycodes=in` +
            `&addressdetails=1`;

          const response =
            await fetch(url, {
              headers: {
                Accept:
                  "application/json",
              },
            });

          if (!response.ok) {
            throw new Error(
              "Location search failed."
            );
          }

          const data =
            await response.json();

          const results: LocationResult[] =
            data.map((item: any) => ({
              name: item.display_name,
              latitude: Number(item.lat),
              longitude: Number(item.lon),
            }));

          setLocationResults(results);

          setShowLocationResults(
            results.length > 0
          );
        } catch (error) {
          console.error(
            "Location search error:",
            error
          );

          setLocationResults([]);

          setLocationError(
            "Unable to search locations right now."
          );
        } finally {
          setLocationSearching(false);
        }
      }, 450);

    return () => {
      if (locationSearchTimer.current) {
        clearTimeout(
          locationSearchTimer.current
        );
      }
    };
  }, [
    locationInput,
    selectedLocation.name,
  ]);

  /*
  =========================================================
  SELECT LOCATION
  =========================================================
  */

  function selectLocation(
    location: LocationResult
  ) {
    setSelectedLocation(location);
    setLocationInput(location.name);
    setLocationResults([]);
    setShowLocationResults(false);
    setLocationError("");
  }

  /*
  =========================================================
  CURRENT LOCATION
  =========================================================
  */

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by this browser."
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
      );

      return;
    }

<<<<<<< HEAD
    setLocationSearching(true);
    setLocationError("");
=======
    setGettingLocation(true);
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        let locationName =
<<<<<<< HEAD
          "Current location";

        try {
          const url =
            `https://nominatim.openstreetmap.org/reverse` +
            `?lat=${latitude}` +
            `&lon=${longitude}` +
            `&format=json`;

          const response =
            await fetch(url, {
              headers: {
                Accept:
                  "application/json",
              },
            });
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

          if (response.ok) {
            const data =
              await response.json();

            locationName =
              data.display_name ||
<<<<<<< HEAD
              "Current location";
          }
        } catch (error) {
          console.warn(
=======
              "Current Location";
          }
        } catch (error) {
          console.error(
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
            "Reverse geocoding failed:",
            error
          );
        }

<<<<<<< HEAD
        const location = {
          name: locationName,
          latitude,
          longitude,
        };

        setSelectedLocation(location);
        setLocationInput(locationName);
        setShowLocationResults(false);
        setLocationResults([]);
        setLocationSearching(false);
=======
        setLocation({
          name: locationName,
          latitude,
          longitude,
        });

        setSearch(locationName);

        setShowLocationOptions(false);

        setGettingLocation(false);
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
      },

      (error) => {
        console.error(
<<<<<<< HEAD
          "Geolocation error:",
          error
        );

        setLocationSearching(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "Location permission was denied. Please allow location access."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationError(
              "Your current location could not be determined."
            );
            break;

          case error.TIMEOUT:
            setLocationError(
              "Location request timed out. Please try again."
            );
            break;

          default:
            setLocationError(
              "Unable to get your current location."
            );
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
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
<<<<<<< HEAD
  =========================================================
  VOICE
  =========================================================
  */

  function toggleListening() {
    if (!speechSupported) {
      setSpeechError(
        "Speech recognition is not supported. Please use Chrome or Edge."
      );

      return;
    }

    const recognition =
      recognitionRef.current;

    if (!recognition) {
      setSpeechError(
        "Speech recognition could not be initialized."
      );

      return;
    }

    if (isListening) {
      try {
        recognition.stop();
      } catch {
        // Ignore
      }

      setIsListening(false);
      setInterimText("");

      return;
    }

    setSpeechError("");
    setInterimText("");

    try {
      recognition.start();
    } catch (error) {
      console.error(error);

      setIsListening(false);

      setSpeechError(
        "Could not start the microphone. Please try again."
      );
    }
  }

  /*
  =========================================================
  DATE
  =========================================================
  */

  function handleDateChange(
    date: string
  ) {
    if (!date) return;

    setSelectedDate(date);
  }

  /*
  =========================================================
  TIME
  =========================================================
  */

  function handleTimeChange(
    time: string
  ) {
    setSelectedTime(time);
  }

  function parseTime12(time: string) {
    const [hourText, minute] = time.split(":");
    const hour24 = Number(hourText);
    const period = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 || 12;

    return {
      hour: String(hour12),
      minute,
      period,
    };
  }

  function buildTime24(
    hour: string,
    minute: string,
    period: string
  ) {
    let hour24 = Number(hour);

    if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    }

    return `${String(hour24).padStart(2, "0")}:${minute}`;
  }

  function formatTime12(time: string) {
    if (!time) return "Select time";

    const { hour, minute, period } = parseTime12(time);
    return `${hour}:${minute} ${period}`;
  }

  /*
  =========================================================
  ASK ORCA
  =========================================================
  */

  function handleSubmit() {
    const cleanedQuestion =
      question.trim();

    if (!cleanedQuestion) {
      setSpeechError(
        "Please enter or speak a question first."
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
      );

      return;
    }

<<<<<<< HEAD
    if (!selectedLocation) {
      setLocationError(
        "Please select a marine location."
=======
    if (!date || !time) {
      alert(
        "Please select a departure date and time."
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
      );

      return;
    }

<<<<<<< HEAD
    if (!selectedDate) {
      setSpeechError(
        "Please select a departure date."
      );

      return;
    }

    if (!selectedTime) {
      setSpeechError(
        "Please select a departure time."
      );

      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // Ignore
      }

      setIsListening(false);
    }

    /*
      Combine the selected date and time.

      Example:
      2026-08-31 + 06:30
      becomes:
      2026-08-31T06:30
    */

    const datetime =
      `${selectedDate}T${selectedTime}`;

    setSpeechError("");

    onAsk({
      question: cleanedQuestion,

      latitude:
        selectedLocation.latitude,

      longitude:
        selectedLocation.longitude,

      datetime,

      locationName:
        selectedLocation.name,
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
    });
  }

  /*
<<<<<<< HEAD
  =========================================================
  SUGGESTIONS
  =========================================================
  */

  const suggestions = [
    "Is it safe to go fishing tomorrow morning?",
    "What are the marine conditions today?",
    "Is the sea safe for a small fishing boat?",
  ];

  function useSuggestion(
    text: string
  ) {
    setQuestion(text);
    setSpeechError("");
    setInterimText("");
  }

  /*
  =========================================================
  QUICK TIME OPTIONS
  =========================================================
  */

  const quickTimes = [
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
  ];

  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (
    <div className="query-form">

      {/* =================================================
          QUESTION
      ================================================= */}

      <div
        className={`query-input-wrapper ${
          isListening
            ? "query-listening"
            : ""
        }`}
      >

        <textarea
          value={question}
          onChange={(event) => {
            setQuestion(
              event.target.value
            );

            setSpeechError("");
          }}
          placeholder="Ask ORCA about the marine environment..."
          disabled={loading}
          rows={4}
        />

        {isListening &&
          interimText && (
            <div className="speech-interim">
              <span className="speech-dot" />
              {interimText}
            </div>
          )}

        <div className="query-controls">

          <div className="query-left-controls">

=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
            <button
              type="button"
              className={`voice-button ${
                isListening
<<<<<<< HEAD
                  ? "voice-button-active"
                  : ""
              }`}
              onClick={toggleListening}
              disabled={loading}
            >
              {isListening ? (
                <>
                  <span className="mic-animation">
                    ●
                  </span>

                  LISTENING...
                </>
              ) : (
                <>
                  🎙️
                  <span>SPEAK</span>
                </>
              )}
            </button>

            {question.length > 0 && (
              <button
                type="button"
                className="clear-button"
                onClick={() => {
                  setQuestion("");
                  setInterimText("");
                  setSpeechError("");
                }}
              >
                CLEAR
              </button>
            )}

          </div>

          <button
            type="button"
            className="ask-button"
            onClick={handleSubmit}
            disabled={
              loading ||
              !question.trim()
            }
          >
            {loading
              ? "ANALYZING..."
              : "ASK ORCA →"}
          </button>

        </div>

      </div>

      {/* =================================================
          TRY ASKING
      ================================================= */}

      <div className="try-asking">

        <p>TRY ASKING</p>

        <div className="suggestion-list">

          {suggestions.map(
            (suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() =>
                  useSuggestion(
                    suggestion
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
                  )
                }
                disabled={loading}
              >
<<<<<<< HEAD
                {suggestion}
                <span aria-hidden="true">→</span>
=======
                {quickQuestion}
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
              </button>
            )
          )}

        </div>

      </div>

<<<<<<< HEAD
      {/* =================================================
          LOCATION
      ================================================= */}

      <div className="location-selector">

        <div className="location-header">

          <label>
            📍 LOCATION
          </label>

          <button
            type="button"
            className="current-location-button"
            onClick={useCurrentLocation}
            disabled={
              loading ||
              locationSearching
            }
          >
            {locationSearching
              ? "LOCATING..."
              : "◎ USE CURRENT LOCATION"}
          </button>

        </div>
=======
      {/* ============================================
          LOCATION
      ============================================ */}

      <div className="form-section">

        <label htmlFor="location">
          Where are you going?
        </label>
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

        <div className="location-search-wrapper">

          <input
<<<<<<< HEAD
            type="text"
            value={locationInput}
            onChange={(event) => {
              setLocationInput(
                event.target.value
              );

              setShowLocationResults(true);
              setLocationError("");
            }}
            onFocus={() => {
              if (
                locationResults.length > 0
              ) {
                setShowLocationResults(true);
              }
            }}
            placeholder="Search coastal city, port or marine location..."
            disabled={loading}
          />

          {locationSearching && (
            <span className="location-search-spinner">
              ●
            </span>
          )}

          {showLocationResults &&
            locationResults.length > 0 && (
              <div className="location-results">

                {locationResults.map(
                  (location, index) => (
                    <button
                      type="button"
                      key={`${location.latitude}-${location.longitude}-${index}`}
                      onClick={() =>
                        selectLocation(
                          location
                        )
                      }
                    >
                      <span>📍</span>

                      <div>
                        <strong>
                          {location.name.split(
                            ","
                          )[0]}
                        </strong>

                        <small>
                          {location.name}
                        </small>
                      </div>
                    </button>
                  )
                )}

              </div>
            )}

        </div>

        {selectedLocation && (
          <div className="selected-location">

            <span className="selected-location-dot" />

            <div>
              <strong>
                {selectedLocation.name}
              </strong>

              <small>
                Location selected for assessment
              </small>
            </div>

          </div>
        )}

        {locationError && (
          <div className="speech-error">
            <span>⚠</span>

            <span>
              {locationError}
            </span>
          </div>
        )}

      </div>

      {/* =================================================
          DATE + TIME
      ================================================= */}

      <div className="departure-settings">

        {/* DATE */}

        <div className="departure-date">

          <label htmlFor="departure-date">
            📅 DEPARTURE DATE
          </label>

          <input
            id="departure-date"
            type="date"
            value={selectedDate}
            min={getTodayString()}
            onChange={(event) =>
              handleDateChange(
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
                event.target.value
              )
            }
            disabled={loading}
          />

        </div>

<<<<<<< HEAD
        {/* TIME */}

        <div className="departure-time">

          <label htmlFor="departure-time">
            🕐 DEPARTURE TIME
          </label>

          <div className="time-picker-row">

            {(() => {
              const current = parseTime12(
                selectedTime || "06:00"
              );

              const updateTime = (
                hour: string,
                minute: string,
                period: string
              ) => {
                handleTimeChange(
                  buildTime24(
                    hour,
                    minute,
                    period
                  )
                );
              };

              return (
                <div
                  className="time-picker"
                  aria-label="Departure time"
                >
                  <span className="time-picker-icon">🕐</span>

                  <select
                    id="departure-time-hour"
                    value={current.hour}
                    onChange={(event) =>
                      updateTime(
                        event.target.value,
                        current.minute,
                        current.period
                      )
                    }
                    disabled={loading}
                    aria-label="Hour"
                  >
                    {Array.from(
                      { length: 12 },
                      (_, index) => String(index + 1)
                    ).map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>

                  <span className="time-colon">:</span>

                  <select
                    id="departure-time-minute"
                    value={current.minute}
                    onChange={(event) =>
                      updateTime(
                        current.hour,
                        event.target.value,
                        current.period
                      )
                    }
                    disabled={loading}
                    aria-label="Minute"
                  >
                    {["00", "15", "30", "45"].map(
                      (minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      )
                    )}
                  </select>

                  <select
                    id="departure-time-period"
                    value={current.period}
                    onChange={(event) =>
                      updateTime(
                        current.hour,
                        current.minute,
                        event.target.value
                      )
                    }
                    disabled={loading}
                    aria-label="AM or PM"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              );
            })()}

            <span className="time-picker-hint">
              {selectedTime
                ? formatTime12(selectedTime)
                : "Choose a time"}
            </span>

          </div>

          {/* QUICK TIMES */}

          <div className="departure-time-options">

            {quickTimes.map(
              (time) => (
                <button
                  type="button"
                  key={time}
                  className={
                    selectedTime === time
                      ? "departure-time-selected"
                      : ""
                  }
                  onClick={() =>
                    handleTimeChange(
                      time
                    )
                  }
                  disabled={loading}
                >
                  {formatTime12(time)}
                </button>
              )
            )}

          </div>
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

        </div>

      </div>

<<<<<<< HEAD
      {/* =================================================
          SPEECH ERROR
      ================================================= */}

      {speechError && (
        <div className="speech-error">

          <span>⚠</span>

          <span>
            {speechError}
          </span>

        </div>
      )}

      {!speechSupported && (
        <div className="speech-error">

          <span>⚠</span>

          <span>
            Voice input is not supported in this
            browser. Please use Chrome or Edge.
          </span>

        </div>
      )}


    </div>
=======
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
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
  );
}

export default QueryForm;