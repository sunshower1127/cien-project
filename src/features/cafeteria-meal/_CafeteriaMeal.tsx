import { useQuery } from "@tanstack/react-query";

import Card from "@/components/ui/Card";
import useError from "@/lib/sw-toolkit/hooks/useError";
import Content from "./Content";
import { cafeteriaMealFetchPlan } from "./service";
import useTimeOfDay from "./useTimeOfDay";

export default function CafeteriaMeal() {
  useError({ onInfiniteRendering: "throwError" });
  const timeOfDay = useTimeOfDay();
  const query = useQuery({ queryKey: ["cafeteria-meal", timeOfDay], queryFn: () => cafeteriaMealFetchPlan[timeOfDay]() });

  return (
    <Card size="sm" className="h-min">
      <Card.Data query={query} Component={Content} />
    </Card>
  );
}
