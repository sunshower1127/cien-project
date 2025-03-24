import { useQuery } from "@tanstack/react-query";
import Card from "./ui/card";

import api, { refetchInterval } from "@/services/api";
import { isEmpty } from "es-toolkit/compat";

export default function SubwayArrival() {
  const query = useQuery({ queryKey: ["subway"], queryFn: () => getSubwayData(), refetchInterval: refetchInterval.subway });
  return (
    <Card size="sm" alignment="center">
      <Card.Title>지하철 도착 정보</Card.Title>
      <Card.Data
        result={query}
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

function Info({ title, msgs }: { title: string; msgs?: string[] }) {
  if (isEmpty(msgs))
    return (
      <Card.Section className="items-center">
        <Card.Label>현재 열차 정보가 없습니다</Card.Label>
      </Card.Section>
    );

  return (
    <Card.Section className="items-center">
      <Card.SubTitle>{title}</Card.SubTitle>
      <Card.Label>{msgs[0]}</Card.Label>
      {msgs.slice(1).map((msg) => (
        <Card.Text className="text-cien-gray-500" key={msg}>
          {msg}
        </Card.Text>
      ))}
    </Card.Section>
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
