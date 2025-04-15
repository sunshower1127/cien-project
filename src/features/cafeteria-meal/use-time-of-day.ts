import useSafeEffect from "@/lib/sw-toolkit/hooks/useSafeEffect";
import { minute } from "@/lib/sw-toolkit/utils/time";
import { useState } from "react";

type TimeOfDay = "dawn" | "morning" | "day" | "night";

const timeTable = Array.from({ length: 24 })
  .fill("dawn", 0, 9)
  .fill("morning", 9, 14)
  .fill("day", 14, 19)
  .fill("night", 19, 24) as TimeOfDay[];

export default function useTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("dawn");

  useSafeEffect(async ({ defer }) => {
    const intervalId = setInterval(() => {
      setTimeOfDay(timeTable[new Date().getHours()]);
    }, 1 * minute);
    defer(() => clearInterval(intervalId));
  }, []);

  return timeOfDay;
}
