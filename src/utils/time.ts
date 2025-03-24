export function getTimeOfDay(breakfastHour = 9, lunchHour = 14, dinnerHour = 19): "dawn" | "morning" | "day" | "night" {
  const currentHour = new Date().getHours();

  if (currentHour < breakfastHour) return "dawn";
  if (currentHour < lunchHour) return "morning";
  if (currentHour < dinnerHour) return "day";
  return "night";
}
