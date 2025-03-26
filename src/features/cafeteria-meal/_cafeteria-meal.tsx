import { useQuery } from "@tanstack/react-query";

import Card from "@/components/ui/card";
import Content from "./content";
import { cafeteriaMealFetchPlan } from "./service";
import useTimeOfDay from "./use-time-of-day";

export default function CafeteriaMeal() {
  const timeOfDay = useTimeOfDay();
  const query = useQuery({ queryKey: ["cafeteria-meal", timeOfDay], queryFn: () => cafeteriaMealFetchPlan[timeOfDay]() });

  return (
    <Card size="sm" className="h-min">
      <Card.Data result={query} render={(data) => <Content data={data} />} />
    </Card>
  );
}
