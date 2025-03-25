import api from "@/services/api";

async function getAirData() {
  const {
    RealtimeCityAir: {
      row: [{ PM10: pm10, PM25: pm25 }],
    },
  } = await api.cien.getAirData();

  return { pm10, pm25 };
}

function getPM10Color(pm10: number = 0) {
  if (pm10 <= 30) return "var(--cien-neon-blue-500)";
  if (pm10 <= 80) return "var(--cien-neon-blue-100)";
  if (pm10 <= 150) return "var(--cien-red)";
  return "var(--cien-black)";
}

function getPM25Color(pm25: number = 0) {
  if (pm25 <= 15) return "var(--cien-neon-blue-500)";
  if (pm25 <= 50) return "var(--cien-neon-blue-100)";
  if (pm25 <= 100) return "var(--cien-red)";
  return "var(--cien-black)";
}

export { getAirData, getPM10Color, getPM25Color };
