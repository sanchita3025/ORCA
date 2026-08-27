export async function askOrca(data: {
  question: string;
  latitude: number;
  longitude: number;
  datetime: string;
}) {
  console.log("ORCA request:", data);

  return null;
}