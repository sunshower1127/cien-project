import Card from "@/components/ui/card";
import api, { refetchInterval } from "@/services/api";
import { useInterval } from "@toss/react";
import { useState } from "react";

export default function CienCalendar() {
  const [src, setSrc] = useState(api.google.getCalendarURL());

  useInterval(() => {
    setSrc(`${api.google.getCalendarURL()}?refresh=${Date.now()}`);
  }, refetchInterval.calendar);

  return (
    <Card size="md" className="flex-1 p-0">
      <iframe className="h-full w-full" src={src} title="Google Calendar"></iframe>
    </Card>
  );
}
