import { cafeteriaMealUpdateRate, cafetriaMealSlideRate } from "@/constants/time";
import { fetchCafeteriaMeal } from "@/services/cafeteria-meal";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

type CafeteriaMealType = Awaited<ReturnType<typeof fetchCafeteriaMeal>>;

export default function CafeteriaMenu() {
  const [data, setData] = useState<CafeteriaMealType>();
  const [page, setPage] = useState(0);
  const pageLength = data?.length || 0;

  const listRef = useRef<HTMLUListElement>(null);

  // fetch and update
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchCafeteriaMeal();
        if (resp) {
          setData(resp);
          setPage(0);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    const cafeteriaMealInterval = setInterval(fetchData, cafeteriaMealUpdateRate);

    return () => clearInterval(cafeteriaMealInterval);
  }, []);

  // page slide
  useEffect(() => {
    if (!listRef?.current?.children) return;
    const items = listRef.current.children;

    const pageSlideTimeout = setTimeout(() => {
      let newPage = page + 1;
      if (newPage === pageLength) {
        newPage = 0;
      }
      items[newPage].scrollIntoView({ behavior: "smooth", inline: "start" });

      listRef!.current!.style.height = `${items[newPage].clientHeight}px`;

      setPage(newPage);
    }, cafetriaMealSlideRate);

    return () => clearTimeout(pageSlideTimeout);
  }, [page, pageLength]);

  return (
    <Card className="h-min w-(--sm-width)">
      <ul className="flex flex-row gap-[10px] overflow-hidden transition-[height] duration-300" ref={listRef}>
        {data?.map((item, index) => <Page key={index} item={item} />)}
      </ul>
      <CardFooter>
        <div className="title-md w-full text-center">
          {page + 1}/{pageLength}
        </div>
      </CardFooter>
    </Card>
  );
}

function Page({ item }: { item: CafeteriaMealType[number] }) {
  return (
    <li className="flex h-min w-full flex-col gap-[20px]">
      <CardHeader className="flex flex-row justify-between">
        <h6 className="title-md">{item.type}</h6>
        <span className="action-sm">{item.operatingHours}</span>
      </CardHeader>
      <CardTitle className="title-lg truncate">{item.cafeteria}</CardTitle>
      <CardContent>
        <ul className="action-md flex flex-col gap-[8px] *:truncate">
          {item.menu.map((menu) => (
            <li key={menu}>{menu}</li>
          ))}
        </ul>
      </CardContent>
    </li>
  );
}
