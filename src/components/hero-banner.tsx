import { heroBannerImageSlideRate, heroBannerUpdateRate } from "@/constants/time";
import { fetchHeroBannerItems } from "@/services/hero-banner";
import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { heroBannerDefaultImageURL } from "@/constants/url";

export default function HeroBanner() {
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchHeroBannerItems>>>();
  const contentLength = data?.length || 0;
  const [page, setPage] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  // fetch and update
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchHeroBannerItems();
        if (resp) {
          setData(resp);
          setPage(0);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    const heroBannerInterval = setInterval(fetchData, heroBannerUpdateRate);
    return () => clearInterval(heroBannerInterval);
  }, []);

  // slide image or video
  useEffect(() => {
    if (!listRef?.current) return;
    const list = listRef.current;

    const nextElement = list.children[page];

    nextElement.scrollIntoView({ behavior: "smooth", inline: "start" });

    let nextPageTimeout = null;

    const videoElement = nextElement.querySelector("video");
    if (videoElement) {
      videoElement.play();
    } else {
      nextPageTimeout = setTimeout(() => setPage((prev) => (prev === contentLength - 1 ? 0 : prev + 1)), heroBannerImageSlideRate);
    }

    return () => {
      if (nextPageTimeout) clearTimeout(nextPageTimeout);
    };
  }, [page, contentLength]);

  if (!data) {
    return (
      <Card className="aspect-video w-(--lg-width) overflow-hidden p-0">
        <img src={heroBannerDefaultImageURL} alt="기본 이미지" />
      </Card>
    );
  }

  return (
    <Card className="aspect-video w-(--lg-width) overflow-hidden p-0">
      <ul className="flex flex-row gap-[10px] overflow-x-hidden" ref={listRef}>
        {data.map(({ type, url }) => {
          switch (type) {
            case "image":
              return (
                <li className="aspect-video w-(--lg-width)" key={url}>
                  <img className="aspect-video w-full object-cover" src={url} />
                </li>
              );
            case "video":
              return (
                <li className="aspect-video w-(--lg-width)" key={url}>
                  <video className="aspect-video w-full" src={url} muted={true} onEnded={() => setPage((prev) => (prev === contentLength - 1 ? 0 : prev + 1))} />
                </li>
              );
          }
        })}
      </ul>
    </Card>
  );
}
