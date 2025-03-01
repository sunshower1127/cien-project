import { airPollutionApiURL } from "@/constants/url";

interface Response {
  RealtimeCityAir: {
    RESULT: {
      CODE: string;
      MESSAGE: string;
    };
    row: [
      {
        PM10: number;
        PM25: number;
      },
    ];
  };
}

export async function fetchAirPollution() {
  const resp = await fetch(airPollutionApiURL);
  if (resp.status === 200) {
    const {
      RealtimeCityAir: { RESULT: msg, row },
    } = (await resp.json()) as Response;

    if (msg.CODE !== "INFO-000") {
      throw new Error(`${msg.CODE}: ${msg.MESSAGE}`);
    }

    if (row && row.length >= 1 && row[0]?.PM10 !== undefined && row[0]?.PM25 !== undefined) {
      const result = { pm10: row[0].PM10, pm25: row[0].PM25 };
      return result;
    }

    return null;
  } else if (resp.status === 304) {
    return null;
  } else {
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }
}

export function getPM10Color(pm10: number) {
  if (pm10 <= 30) return "var(--cien-blue-500)";
  if (pm10 <= 80) return "var(--cien-neon-blue-100)";
  if (pm10 <= 150) return "var(--cien-red)";
  return "var(--cien-black)";
}

export function getPM25Color(pm25: number) {
  if (pm25 <= 15) return "var(--cien-blue-500)";
  if (pm25 <= 50) return "var(--cien-neon-blue-100)";
  if (pm25 <= 100) return "var(--cien-red)";
  return "var(--cien-black)";
}
