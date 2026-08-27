export interface OrcaRequest {

  question: string;

  latitude: number;

  longitude: number;

  datetime: string;

}


export async function askOrca(
  data: OrcaRequest
) {

  console.log(
    "ORCA request:",
    data
  );


  // We will connect this to
  // Akhil's backend later.

  return null;

}