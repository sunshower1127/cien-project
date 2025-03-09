import { cafeteriaMealUpdateHours } from "@/services/constants/time";

export function getTimeOfDay(): "morning" | "day" | "night" {
  const currentHour = new Date().getHours();

  if (currentHour >= cafeteriaMealUpdateHours[0] && currentHour < cafeteriaMealUpdateHours[1]) {
    return "morning";
  } else if (currentHour >= cafeteriaMealUpdateHours[1] && currentHour < cafeteriaMealUpdateHours[2]) {
    return "day";
  } else {
    return "night";
  }
}

export function getKoreanDay(dateStr: string): string {
  const [monthStr, dayStr] = dateStr.split(".");
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);
  const year = new Date().getFullYear();
  const date = new Date(year, month, day);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
}
