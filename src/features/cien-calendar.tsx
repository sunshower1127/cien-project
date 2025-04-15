import Card from "@/components/ui/card";
import useSafeEffect from "@/lib/sw-toolkit/hooks/useSafeEffect";
import api, { refetchInterval } from "@/services/api";
import { delay } from "es-toolkit";
import { useState } from "react";

export default function CienCalendar() {
  const [src, setSrc] = useState(api.google.getCalendarURL());

  useSafeEffect(async () => {
    await delay(refetchInterval.calendar);
    setSrc(`${api.google.getCalendarURL()}?refresh=${Date.now()}`);
  }, [src]);

  return (
    <Card size="md" className="flex-1 p-0">
      <iframe className="h-full w-full" src={src} title="Google Calendar"></iframe>
    </Card>
  );
}
