import { minute, second } from "@/constants/time";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { kstFormat, parseYYYYMMDD } from "@toss/date";
import { useInterval } from "@toss/react";
import { isEmpty } from "es-toolkit/compat";
import { useCallback, useState } from "react";
import AutoScrollSlider, { onSlideProps } from "./ui/auto-scroll-slider";
import Card from "./ui/card";

export default function CafeteriaMeal() {
  const timeOfDay = useTimeOfDay();
  console.log(timeOfDay);
  const query = useQuery({ queryKey: ["cafeteria-meal", timeOfDay], queryFn: () => cafeteriaMealFetchPlan[timeOfDay]() });

  return (
    <Card size="sm" className="h-min">
      <Card.Data result={query} render={(data) => <Content data={data} />} />
    </Card>
  );
}

function Content({ data }: { data: Meal[] }) {
  const [page, setPage] = useState(1);

  const handleSlide = useCallback(({ index, element, container }: onSlideProps) => {
    setPage(index + 1);

    if (container instanceof HTMLElement) {
      container.style.height = `${element.clientHeight}px`;
    }

    const defaultSlideInterval = 10 * second; // 메뉴 슬라이드하는 기본 간격 = 10초
    const slideDurationMultiplier = element.clientHeight / 400; // 메뉴 길이에 따라서 대략 1/2 ~ 1배
    return slideDurationMultiplier * defaultSlideInterval;
  }, []);

  return (
    <>
      <AutoScrollSlider className="transition-[height] duration-300" onSlide={handleSlide}>
        {data.map((item, index) => (
          <Page key={index} item={item} />
        ))}
      </AutoScrollSlider>
      <Card.SubTitle className="w-full text-center">
        {page}/{data.length}
      </Card.SubTitle>
    </>
  );
}

function Page({ item }: { item: Meal }) {
  return (
    <Card.Section className="h-min w-full gap-[20px]">
      <div className="flex flex-row justify-between">
        <Card.SubTitle>
          {item.date} {item.mealType}
        </Card.SubTitle>
        <Card.SubText>{item.dueTime}</Card.SubText>
      </div>
      <Card.Title className="-mt-[20px] truncate">{item.cafeteria}</Card.Title>
      <ul className="action-md flex flex-col gap-[6px] *:truncate">
        {item.menu.map((menu) => (
          <li key={menu}>{menu}</li>
        ))}
      </ul>
    </Card.Section>
  );
}

type Meal = Awaited<ReturnType<typeof fetchCafeteriaMeal>>[number];

/* 업데이트 주기
0시 -> 당일 아침, 당일 점심
9시 -> 당일 점심
14시 -> 당일 저녁, 익일 아침
19시 -> 익일 아침, 익일 점심
*/
type TimeOfDay = "dawn" | "morning" | "day" | "night";

const timeTable = Array.from({ length: 24 })
  .fill("dawn", 0, 9)
  .fill("morning", 9, 14)
  .fill("day", 14, 19)
  .fill("night", 19, 24) as TimeOfDay[];

const cafeteriaMealFetchPlan = {
  dawn: async () => [...(await fetchCafeteriaMeal("today", "morning")), ...(await fetchCafeteriaMeal("today", "lunch"))],
  morning: () => fetchCafeteriaMeal("today", "lunch"),
  day: async () => [...(await fetchCafeteriaMeal("today", "dinner")), ...(await fetchCafeteriaMeal("tomorrow", "morning"))],
  night: async () => [...(await fetchCafeteriaMeal("tomorrow", "morning")), ...(await fetchCafeteriaMeal("tomorrow", "lunch"))],
};

async function fetchCafeteriaMeal(day: "today" | "tomorrow", mealType: "morning" | "lunch" | "dinner") {
  const meals = await api.siso.getMeals(day, mealType);
  return meals
    .filter(({ menu }) => !isEmpty(menu?.trim()))
    .map(({ cafeteria, date, mealType, menu, dueTime }) => ({
      cafeteria,
      mealType,
      dueTime,
      date: kstFormat(parseYYYYMMDD(date), "MM.dd eee"), // 예: "03.21 월"
      menu: menu.split(","),
    }));
}

function useTimeOfDay() {
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
