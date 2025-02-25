import { RefObject, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function CafeteriaMenu() {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  return (
    <Card className="h-min w-(--sm-width)">
      <ul className="hide-scroll-bar flex snap-x snap-mandatory flex-row gap-[10px] overflow-x-scroll *:snap-start" ref={scrollContainerRef}>
        {Array.from({ length: 10 }).map(() => (
          <Page />
        ))}
      </ul>
      <CardFooter>
        <PageIndicator scrollContainerRef={scrollContainerRef} />
      </CardFooter>
    </Card>
  );
}

function PageIndicator({ scrollContainerRef }: { scrollContainerRef: RefObject<HTMLUListElement | null> }) {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  useEffect(() => {
    if (!scrollContainerRef || !scrollContainerRef.current) return;
    const scrollContainer = scrollContainerRef.current;

    setMaxPage(scrollContainer.childElementCount);

    // 스크롤 이벤트 감지
    const handleScroll = () => {
      // 컨테이너의 스크롤 위치
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;

      // 현재 보이는 아이템의 인덱스 계산 (가로 스크롤 기준)
      const currentIndex = Math.round(scrollLeft / containerWidth);

      setPage(currentIndex + 1);
    };
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  return (
    <div className="title-md w-full text-center">
      {page}/{maxPage}
    </div>
  );
}

function Page() {
  return (
    <li className="flex w-full flex-col gap-[20px]">
      <CardHeader className="flex flex-row justify-between">
        <h6 className="title-md">중식</h6>
        <span className="action-sm">운영시간 11:00~13:00</span>
      </CardHeader>
      <CardTitle className="title-lg truncate">참슬기 식당</CardTitle>
      <CardContent>
        <ul className="action-md flex flex-col gap-[8px] *:truncate">
          <li>김가루후리가케밥</li>
          <li>두부미소된장국</li>
          <li>튀긴꼬치어묵&칠리소스</li>
          <li>매콤떡볶이</li>
          <li>무순단무지무침</li>
          <li>발렌타인초코베이비슈</li>
          <li>그린야채샐러드/소스</li>
          <li>배추김치</li>
        </ul>
      </CardContent>
    </li>
  );
}
