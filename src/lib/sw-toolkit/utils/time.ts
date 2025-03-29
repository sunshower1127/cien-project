export const second = 1000;
export const minute = 60 * second;
export const hour = 60 * minute;

export function getShortKoreanDayOfWeek(date: Date | string): string {
  const dayOfWeek = new Date(date).getDay();
  const shortKoreanDays = ["일", "월", "화", "수", "목", "금", "토"];

  return shortKoreanDays[dayOfWeek];
}

// export function delay(ms: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
