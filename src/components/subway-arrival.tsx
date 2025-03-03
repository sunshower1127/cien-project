import { subwayArrivalUpdateRate } from "@/constants/time";
import useAutoUpdate from "@/hooks/use-auto-update";
import { fetchSubwayData } from "@/services/subway";
import { isNullish } from "@/utils/utils";
import Card from "./ui/card";

// TODO: 시간 감소 기능?
export default function SubwayArrival() {
  const data = useAutoUpdate(subwayArrivalUpdateRate, fetchSubwayData);

  return (
    <Card size="sm" alignment="center">
      <Card.Title>지하철 도착 정보</Card.Title>
      <Info title="개화행" msgs={data?.하행} />
      <Info title="중앙보훈병원행" msgs={data?.상행} />
    </Card>
  );
}

function Info({ title, msgs }: { title: string; msgs?: string[] }) {
  if (isNullish(msgs))
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
