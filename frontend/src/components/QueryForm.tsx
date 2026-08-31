import { useEffect, useRef, useState } from "react";

type LocationResult = {
  name: string;
  latitude: number;
  longitude: number;
};

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

  return `${year}-${month}-${day}`;
}

function QueryForm({
  onAsk,
  loading = false,
}: QueryFormProps) {
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

  const [isListening, setIsListening] =
    useState(false);

  const [speechSupported, setSpeechSupported] =
    useState(true);

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

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);

    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
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
        event.error
      );

      setIsListening(false);

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
    };

    recognition.onend = () => {
      setIsListening(false);
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
      );

      return;
    }

    setLocationSearching(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        let locationName =
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

          if (response.ok) {
            const data =
              await response.json();

            locationName =
              data.display_name ||
              "Current location";
          }
        } catch (error) {
          console.warn(
            "Reverse geocoding failed:",
            error
          );
        }

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
      },

      (error) => {
        console.error(
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
      );

      return;
    }

    if (!selectedLocation) {
      setLocationError(
        "Please select a marine location."
      );

      return;
    }

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
    });
  }

  /*
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

            <button
              type="button"
              className={`voice-button ${
                isListening
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

        <div className="location-search-wrapper">

          <input
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
                event.target.value
              )
            }
            disabled={loading}
          />

        </div>

        {/* TIME */}

        <div className="departure-time">

          <label htmlFor="departure-time">
            🕐 DEPARTURE TIME
          </label>

          <div className="time-picker-row">

            <input
              id="departure-time"
              type="time"
              value={selectedTime}
              onChange={(event) =>
                handleTimeChange(
                  event.target.value
                )
              }
              disabled={loading}
            />

            <span className="time-picker-hint">
              Choose any time
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
                  {time}
                </button>
              )
            )}

          </div>

        </div>

      </div>

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

      {/* =================================================
          SUGGESTIONS
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
                  )
                }
                disabled={loading}
              >
                {suggestion}
              </button>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default QueryForm;