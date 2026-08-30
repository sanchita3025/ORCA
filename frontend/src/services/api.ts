export type OrcaQuery = {
  question: string;
  latitude: number;
  longitude: number;
  datetime: string;
};

export type OrcaResponse = {
  answer: string;

  risk: {
    score: number;
    level: string;
  };

  weather?: {
    temperature?: number;
    wind_speed?: number;
    precipitation?: number;
    condition?: string;
    wind_direction?: number;
  };

  ocean?: {
    wave_height?: number;
    wave_period?: number;
    current_speed?: number;
    sst?: number;
  };

  satellite?: {
    pfz_available?: boolean;
    pfz?: string;
  };

  gis?: {
    restricted_zone?: boolean;
    location_name?: string;
  };

  breakdown?: {
    wind?: number;
    waves?: number;
    weather?: number;
    ocean?: number;
    pfz?: number;
    gis?: number;
  };

  recommendation?: string;

  agents_used?: string[];

  evidence?: unknown[];

  verification?: {
    verified?: boolean;
    confidence?: number;
    issues?: string[];
  };
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function askOrca(
  data: OrcaQuery
): Promise<OrcaResponse> {
  const response = await fetch(`${API_BASE_URL}/api/orca/query`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `ORCA request failed: ${response.status}`
    );
  }

  return response.json();
}