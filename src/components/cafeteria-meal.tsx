import { cafeteriaMealUpdateRate, cafetriaMealSlideRate } from "@/constants/time";
import useAutoUpdate from "@/hooks/use-auto-update";
import { fetchCafeteriaMeal } from "@/services/cafeteria-meal";
import { useCallback, useState } from "react";
import AutoScrollSlider, { onSlideProps } from "./ui/auto-scroll-slider";
import Card from "./ui/card";

export default function CafeteriaMeal() {
  const data = useAutoUpdate(cafeteriaMealUpdateRate, fetchCafeteriaMeal);
  const [page, setPage] = useState(1);

  const handleSlide = useCallback(({ index, element, container }: onSlideProps) => {
    setPage(index + 1);

    if (container instanceof HTMLElement) {
      container.style.height = `${element.clientHeight}px`;
    }

    return cafetriaMealSlideRate;
  }, []);

  if (!data) {
    return (
      <Card size="sm" className="h-min">
        <Card.Title>식당 데이터 준비중...</Card.Title>
      </Card>
    );
  }

  return (
    <Card size="sm" className="h-min">
      <AutoScrollSlider className="transition-[height] duration-300" onSlide={handleSlide}>
        {data.map((item, index) => (
          <Page key={index} item={item} />
        ))}
      </AutoScrollSlider>
      <Card.SubTitle className="w-full text-center">
        {page}/{data.length}
      </Card.SubTitle>
    </Card>
  );
}

function Page({
  item,
}: {
  item: {
    cafeteria: string;
    type: "중식" | "석식";
    operatingHours: string;
    menu: string[];
  };
}) {
  return (
    <Card.Section className="h-min w-full gap-[20px]">
      <div className="flex flex-row justify-between">
        <Card.SubTitle>{item.type}</Card.SubTitle>
        <Card.SubText>{item.operatingHours}</Card.SubText>
      </div>
      <Card.Title className="truncate">{item.cafeteria}</Card.Title>
      <ul className="action-md flex flex-col gap-[6px] *:truncate">
        {item.menu.map((menu) => (
          <li key={menu}>{menu}</li>
        ))}
      </ul>
    </Card.Section>
  );
}
