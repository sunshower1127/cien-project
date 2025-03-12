import { fetchWithStatusHandling } from "@/utils/fetch";
import { getKoreanDay } from "@/utils/time";
import { cafeterialMealApiURL } from "./constants/url";

type Response = {
  id: number;
  date: string;
  cafeteria: string;
  dueTime: string;
  mealType: "아침" | "점심" | "저녁";
  menu: string;
}[];

export const fetchCafeteriaMeal = async (day: "today" | "tomorrow", mealType: "morning" | "lunch" | "dinner") =>
  fetchWithStatusHandling(`${cafeterialMealApiURL}/${day}/${mealType}`, (data: Response) => {
    return data
      .filter(({ menu }) => !!menu)
      .map(({ cafeteria, date, mealType, menu, dueTime }) => ({
        cafeteria,
        mealType,
        dueTime,
        date: ((d) => `${d}(${getKoreanDay(d)})`)(date.slice(5)), // 연도 제거, 요일 추가
        menu: menu.split(","),
      }));
  });

/* 업데이트 주기
9시 -> 당일 점심
14시 -> 당일 저녁, 익일 아침
19시 -> 익일 아침, 익일 점심
*/
export const cafeteriaMealFetchPlan = {
  morning: () => fetchCafeteriaMeal("today", "lunch"),
  day: async () => [...((await fetchCafeteriaMeal("today", "dinner")) || []), ...((await fetchCafeteriaMeal("tomorrow", "morning")) || [])],
  night: async () => [...((await fetchCafeteriaMeal("tomorrow", "morning")) || []), ...((await fetchCafeteriaMeal("tomorrow", "lunch")) || [])],
};
