import { useQuery } from "@tanstack/react-query";

import Card from "@/components/ui/card";
import api, { refetchInterval } from "@/services/api";
import Info from "./info";

export default function SubwayArrival() {
  const query = useQuery({ queryKey: ["subway"], queryFn: () => getSubwayData(), refetchInterval: refetchInterval.subway });
  return (
    <Card size="sm" alignment="center">
      <Card.Title>지하철 도착 정보</Card.Title>
      <Card.Data
        query={query}
        render={({ 하행, 상행 }) => (
          <>
            <Info title="개화행" msgs={하행} />
            <Info title="중앙보훈병원행" msgs={상행} />
          </>
        )}
      ></Card.Data>
    </Card>
  );
}

export const getSubwayData = async () => {
  const { realtimeArrivalList } = await api.cien.getSubWayData();

  const messages: { 하행: string[]; 상행: string[] } = { 하행: [], 상행: [] };

  realtimeArrivalList.forEach(({ updnLine, arvlMsg2: message }) => {
    messages[updnLine].push(message);
  });

  return messages;
};
