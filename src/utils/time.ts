export function getTimeOfDay(breakfastHour = 9, lunchHour = 14, dinnerHour = 19): "dawn" | "morning" | "day" | "night" {
  const currentHour = new Date().getHours();

  if (currentHour < breakfastHour) return "dawn";
  if (currentHour < lunchHour) return "morning";
  if (currentHour < dinnerHour) return "day";
  return "night";
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
