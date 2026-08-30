interface SpeechRecognitionEvent
  extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition
  extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  start(): void;
  stop(): void;

  onstart:
    | ((this: SpeechRecognition, ev: Event) => any)
    | null;

  onresult:
    | ((
        this: SpeechRecognition,
        ev: SpeechRecognitionEvent
      ) => any)
    | null;

  onerror:
    | ((this: SpeechRecognition, ev: Event) => any)
    | null;

  onend:
    | ((this: SpeechRecognition, ev: Event) => any)
    | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface Window {
  SpeechRecognition?: SpeechRecognitionConstructor;

  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}