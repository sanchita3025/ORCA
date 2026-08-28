export interface OrcaRequest {
  question: string;
  latitude: number;
  longitude: number;
  datetime: string;
}

export interface SatelliteData {
  status: string;

  pfz: {
    available: boolean;
  };

  sst: {
    value: number;
    unit: string;
  };

  chlorophyll: {
    value: number;
    unit: string;
  };

  source: {
    pfz: string;
    sst: string;
    chlorophyll: string;
  };

  timestamp: string;
}


export async function getSatelliteData(
  latitude: number,
  longitude: number
): Promise<SatelliteData> {

  const response = await fetch(
    `http://127.0.0.1:5000/api/satellite?latitude=${latitude}&longitude=${longitude}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch satellite data");
  }

  return await response.json();
}


export async function askOrca(
  data: OrcaRequest
) {

  console.log("ORCA request:", data);

  return null;
}