import api, { refetchInterval } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Card from "./ui/card";

export default function AirPollution() {
  const query = useQuery({ queryKey: ["air"], queryFn: () => getAirData(), refetchInterval: refetchInterval.airData });

  return (
    <Card size="sm" alignment="center">
      <Card.Title>동작구 대기 정보</Card.Title>
      <Card.Data
        result={query}
        render={({ pm10, pm25 }) => (
          <>
            <Card.Label style={{ backgroundColor: getPM10Color(pm10) }}>미세먼지 : {pm10} ㎍/㎥</Card.Label>
            <Card.Label style={{ backgroundColor: getPM25Color(pm25) }}>초미세먼지 : {pm25} ㎍/㎥</Card.Label>
          </>
        )}
      ></Card.Data>
    </Card>
  );
}

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
