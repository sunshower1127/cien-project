import useAutoUpdate from "@/hooks/use-auto-update";
import { fetchAirPollution, getPM10Color, getPM25Color } from "@/services/air-pollution";
import { airPollutionUpdateRate } from "@/services/constants/time";
import Card from "./ui/card";

export default function AirPollution() {
  const data = useAutoUpdate(fetchAirPollution, { intervalMs: airPollutionUpdateRate });

  return (
    <Card size="sm" alignment="center">
      <Card.Title>동작구 대기 정보</Card.Title>
      <Card.Label style={{ backgroundColor: getPM10Color(data?.pm10) }}>미세먼지 : {data?.pm10} ㎍/㎥</Card.Label>
      <Card.Label style={{ backgroundColor: getPM25Color(data?.pm25) }}>초미세먼지 : {data?.pm25} ㎍/㎥</Card.Label>
    </Card>
  );
}
