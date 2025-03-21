import useAutoUpdate from "@/hooks/use-auto-update";
import { cafeteriaMealFetchPlan, fetchCafeteriaMeal } from "@/services/cafeteria-meal";
import { cafeteriaMealUpdateHours, cafetriaMealSlideRate, retryRate } from "@/services/constants/time";
import { getTimeOfDay } from "@/utils/time";
import { useCallback, useEffect, useState } from "react";
import AutoScrollSlider, { onSlideProps } from "./ui/auto-scroll-slider";
import Card from "./ui/card";
import ErrorBoundary from "./ui/error-boundary";

export default function CafeteriaMeal() {
  const timeOfDay = useAutoUpdate(getTimeOfDay, { scheduledHours: cafeteriaMealUpdateHours });

  const [data, setData] = useState<Awaited<ReturnType<typeof fetchCafeteriaMeal>>>(null);

  useEffect(() => {
    let isMounted = true;
    let retryIntervalId: ReturnType<typeof setInterval> | undefined;

    (async () => {
      try {
        const newData = timeOfDay ? await cafeteriaMealFetchPlan[timeOfDay]() : null;
        if (!newData || newData.length === 0) {
          throw new Error("No data");
        }
        setData(newData);
      } catch (e) {
        console.error(e);
        retryIntervalId = setInterval(async () => {
          try {
            if (isMounted) {
              const newData = timeOfDay ? await cafeteriaMealFetchPlan[timeOfDay]() : null;
              if (!newData || newData.length === 0) {
                throw new Error("No data");
              }
              setData(newData);
            }
            clearInterval(retryIntervalId);
            retryIntervalId = undefined;
          } catch (err) {
            console.error("Retry attempt failed:", err);
          }
        }, retryRate);
      }
    })();

    return () => {
      isMounted = false;
      if (retryIntervalId) {
        clearInterval(retryIntervalId);
      }
    };
  }, [timeOfDay]);

  return (
    <Card size="sm" className="h-min">
      {data && (
        <ErrorBoundary>
          <Content data={data} />
        </ErrorBoundary>
      )}
    </Card>
  );
}

type MealsPromise = ReturnType<typeof fetchCafeteriaMeal>;

function Content({ data }: { data: Awaited<MealsPromise> }) {
  const [page, setPage] = useState(1);

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
