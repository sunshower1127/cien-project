import Card from "@/components/ui/card";
import { refetchInterval } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { getAirData, getPM10Color, getPM25Color } from "./service";

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
