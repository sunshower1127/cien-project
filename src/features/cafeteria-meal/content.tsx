import AutoScrollSlider, { OnSlideProps } from "@/components/auto-scroll-slider";
import Card from "@/components/ui/card";
import ErrorBoundary from "@/lib/sw-toolkit/components/ErrorBoundary";
import { second } from "@/lib/sw-toolkit/utils/time";
import { useCallback, useState } from "react";
import Page from "./page";
import { Meal } from "./service";

export default function Content({ data }: { data: Meal[] }) {
  const [page, setPage] = useState(1);

  const handleSlide = useCallback(({ index, element, container }: OnSlideProps) => {
    setPage(index + 1);

    if (container instanceof HTMLElement) {
      container.style.height = `${element.clientHeight}px`;
    }

    const defaultSlideInterval = 10 * second; // 메뉴 슬라이드하는 기본 간격 = 10초
    const slideDurationMultiplier = element.clientHeight / 400; // 메뉴 길이에 따라서 대략 1/2 ~ 1배
    const duration = slideDurationMultiplier * defaultSlideInterval;
    return duration;
  }, []);

  return (
    <>
      <ErrorBoundary>
        <AutoScrollSlider className="transition-[height] duration-300" onSlide={handleSlide}>
          {data.map((item, index) => (
            <Page key={index} item={item} />
          ))}
        </AutoScrollSlider>
      </ErrorBoundary>
      <Card.SubTitle className="w-full text-center">
        {page}/{data.length}
      </Card.SubTitle>
    </>
  );
}
