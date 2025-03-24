import { addDays, differenceInMilliseconds, set } from "date-fns";
import { useEffect, useReducer } from "react";

/*
0시-9시 -> dawn
9시-14시 -> morning
14시-19시 -> day
19시-24시 -> night
*/
const timeTable: { name: "dawn" | "morning" | "day" | "night"; begin: number }[] = [
  { name: "dawn", begin: 0 },
  { name: "morning", begin: 9 },
  { name: "day", begin: 14 },
  { name: "night", begin: 19 },
];
const next = (prev: number) => (prev + 1) % timeTable.length;
const prev = (prev: number) => (prev - 1 + timeTable.length) % timeTable.length;

export default function useTimeOfDay() {
  const [index, incrementIndex] = useReducer((prev) => next(prev), getCurrentIndex());

  useEffect(() => {
    const timeout = setTimeout(() => incrementIndex(), getTimeGap(next(index)));
    return () => clearTimeout(timeout);
  }, [index]);

  return timeTable[index].name;
}

function getCurrentIndex(): number {
  const now = new Date();
  // 오늘 날짜 기준으로 각 시간대의 시작 시점을 구하고 반복문을 통해 현재 시각 이후인 마지막 시간대로 판단
  for (let i = timeTable.length - 1; i >= 0; i--) {
    const threshold = set(now, { hours: timeTable[i].begin, minutes: 0, seconds: 0, milliseconds: 0 });
    if (now >= threshold) {
      return i;
    }
  }

  return 0;
}

function getTimeGap(nextIndex: number): number {
  const now = new Date();
  // 오늘 날짜 기준으로 다음 시간대의 시작 시각 설정
  let target = set(now, { hours: timeTable[nextIndex].begin, minutes: 0, seconds: 0, milliseconds: 0 });
  if (target <= now) {
    // 이미 지난 경우 내일로 설정
    target = addDays(target, 1);
  }
  return differenceInMilliseconds(target, now);
}

export function getPrevTimeOfDay() {
  return timeTable[prev(getCurrentIndex())].name;
}
