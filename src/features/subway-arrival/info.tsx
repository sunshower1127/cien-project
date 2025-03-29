import Card from "@/components/ui/Card";
import { isEmpty } from "es-toolkit/compat";

export default function Info({ title, msgs }: { title: string; msgs?: string[] }) {
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
