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
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0); // 무한 재시도 방지를 위해 합리적인 값으로 변경

  // fetchData에서 retryCount 의존성 제거
  const fetchData = useCallback(async () => {
    if (!timeOfDay) return;

    try {
      setIsLoading(true);
      const newData = await cafeteriaMealFetchPlan[timeOfDay]();

      if (!newData || newData.length === 0) {
        throw new Error("No data");
      }

      setData(newData);
      setRetryCount(0); // 성공 시 리셋
    } catch (e) {
      console.error("Failed to fetch meal data:", e);
      // 여기서 retryCount를 직접 조작하지 않고 실패 신호만 보냄
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [timeOfDay]); // retryCount 의존성 제거

  // 최초 데이터 로드 및 timeOfDay 변경 시 로드
  useEffect(() => {
    fetchData();
  }, [fetchData, timeOfDay]);

  // 재시도 로직을 별도의 useEffect로 분리
  useEffect(() => {
    // 재시도 로직은 retryCount가 0보다 클 때만 실행
    if (retryCount > 0) {
      console.log(`설정된 재시도 간격: ${retryRate}ms`);
      console.log(`${retryCount}번째 재시도 예약됨...`);

      const retryTimer = setTimeout(() => {
        console.log(`${retryCount}번째 재시도 실행 중...`);
        fetchData();
      }, retryRate);

      return () => clearTimeout(retryTimer);
    }
  }, [retryCount, fetchData]);

  return (
    <Card size="sm" className="h-min">
      {data && (
        <ErrorBoundary>
          <Content data={data} />
        </ErrorBoundary>
      )}
      {isLoading && <p className="text-center text-sm">데이터를 불러오는 중...</p>}
      {retryCount > 0 && <p className="text-muted-foreground text-center text-xs">재시도 중... ({retryCount / 2}분째..)</p>}
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
