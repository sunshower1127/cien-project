import { useQuery } from "@tanstack/react-query";

import Card from "@/components/ui/card";
import useError from "@/lib/sw-toolkit/hooks/useError";
import Content from "./content";
import { cafeteriaMealFetchPlan } from "./service";
import useTimeOfDay from "./use-time-of-day";

export default function CafeteriaMeal() {
  useError({ onInfiniteRendering: "throwError" });
  const timeOfDay = useTimeOfDay();
  const query = useQuery({ queryKey: ["cafeteria-meal", timeOfDay], queryFn: () => cafeteriaMealFetchPlan[timeOfDay]() });

  return (
    <Card size="sm" className="h-min">
      <Card.Data key={timeOfDay} query={query} Component={Content} />
    </Card>
  );
}
