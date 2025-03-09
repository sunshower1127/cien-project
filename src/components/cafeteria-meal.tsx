import useAutoUpdate from "@/hooks/use-auto-update";
import { cafeteriaMealFetchPlan, fetchCafeteriaMeal } from "@/services/cafeteria-meal";
import { cafeteriaMealUpdateHours, cafetriaMealSlideRate } from "@/services/constants/time";
import { getTimeOfDay } from "@/utils/time";
import { Suspense, use, useCallback, useMemo, useState } from "react";
import ErrorBoundary from "./error-boundary";
import AutoScrollSlider, { onSlideProps } from "./ui/auto-scroll-slider";
import Card from "./ui/card";

export default function CafeteriaMeal() {
  const timeOfDay = useAutoUpdate(getTimeOfDay, { scheduledHours: cafeteriaMealUpdateHours });

  const data = useMemo(() => {
    return timeOfDay ? cafeteriaMealFetchPlan[timeOfDay]() : null;
  }, [timeOfDay]);

  return (
    <Card size="sm" className="h-min">
      {data && (
        <ErrorBoundary>
          <Suspense>
            <Content promise={data} />
          </Suspense>
        </ErrorBoundary>
      )}
    </Card>
  );
}

type MealsPromise = ReturnType<typeof fetchCafeteriaMeal>;

function Content({ promise }: { promise: MealsPromise }) {
  const [page, setPage] = useState(1);
  const data = use(promise);

  const handleSlide = useCallback(({ index, element, container }: onSlideProps) => {
    setPage(index + 1);

    if (container instanceof HTMLElement) {
      container.style.height = `${element.clientHeight}px`;
    }

    const slideDurationMultiplier = element.clientHeight / 400; // 메뉴 길이에 따라서 1/2 ~ 1배
    return slideDurationMultiplier * cafetriaMealSlideRate;
  }, []);

  return (
    <>
      <AutoScrollSlider className="transition-[height] duration-300" onSlide={handleSlide}>
        {data?.map((item, index) => <Page key={index} item={item} />)}
      </AutoScrollSlider>
      <Card.SubTitle className="w-full text-center">
        {page}/{data?.length}
      </Card.SubTitle>
    </>
  );
}

function Page({ item }: { item: NonNullable<Awaited<MealsPromise>>[number] }) {
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
