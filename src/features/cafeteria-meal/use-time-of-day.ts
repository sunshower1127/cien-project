import { minute } from "@/utils/time";
import { useInterval } from "@toss/react";
import { useState } from "react";

type TimeOfDay = "dawn" | "morning" | "day" | "night";

const timeTable = Array.from({ length: 24 })
  .fill("dawn", 0, 9)
  .fill("morning", 9, 14)
  .fill("day", 14, 19)
  .fill("night", 19, 24) as TimeOfDay[];

export default function useTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("dawn");

  useInterval(
    () => {
      const newTimeOfDay = timeTable[new Date().getHours()];
      if (timeOfDay !== newTimeOfDay) {
        setTimeOfDay(newTimeOfDay);
      }
    },
    { delay: 1 * minute, trailing: false },
  );

  return timeOfDay;
}
