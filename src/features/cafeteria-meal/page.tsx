import Card from "@/components/ui/Card";
import { Meal } from "./service";

export default function Page({ item }: { item: Meal }) {
  return (
    <Card.Section className="h-min w-full gap-[20px]">
      <div className="flex flex-row justify-between">
        <Card.SubTitle>
          {item.date} {item.mealType}
        </Card.SubTitle>
        <Card.SubText>{item.dueTime}</Card.SubText>
      </div>
      <Card.Title className="-mt-[20px] truncate">{item.cafeteria}</Card.Title>
      <ul className="action-md flex flex-col gap-[6px] *:truncate">
        {item.menu.map((menu) => (
          <li key={menu}>{menu}</li>
        ))}
      </ul>
    </Card.Section>
  );
}
