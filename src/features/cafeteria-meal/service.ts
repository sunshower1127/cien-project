import { getShortKoreanDayOfWeek } from "@/lib/sw-toolkit/utils/time";
import { isNotEmpty } from "@/lib/sw-toolkit/utils/utils";
import api from "@/services/api";

/* 업데이트 주기
0시 -> 당일 아침, 당일 점심
9시 -> 당일 점심
14시 -> 당일 저녁, 익일 아침
19시 -> 익일 아침, 익일 점심
*/
export const cafeteriaMealFetchPlan = {
  dawn: async () => [...(await fetchCafeteriaMeal("today", "morning")), ...(await fetchCafeteriaMeal("today", "lunch"))],
  morning: () => fetchCafeteriaMeal("today", "lunch"),
  day: async () => [...(await fetchCafeteriaMeal("today", "dinner")), ...(await fetchCafeteriaMeal("tomorrow", "morning"))],
  night: async () => [...(await fetchCafeteriaMeal("tomorrow", "morning")), ...(await fetchCafeteriaMeal("tomorrow", "lunch"))],
};

async function fetchCafeteriaMeal(day: "today" | "tomorrow", mealType: "morning" | "lunch" | "dinner") {
  const meals = await api.siso.getMeals(day, mealType);
  return meals
    .filter(({ menu }) => isNotEmpty(menu?.trim()))
    .map(({ cafeteria, date, mealType, menu, dueTime }) => {
      const [year, month, day] = date.split("-");
      return {
        cafeteria,
        mealType,
        dueTime,
        date: `${month}.${day} (${getShortKoreanDayOfWeek(date)})`,
        menu: menu.split("\n"),
      };
    });
}

export type Meal = Awaited<ReturnType<typeof fetchCafeteriaMeal>>[number];
