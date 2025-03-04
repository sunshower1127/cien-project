import { heroBannerDefaultSlideRate, heroBannerUpdateRate, seconds } from "@/constants/time";
import { heroBannerDefaultImageURL } from "@/constants/url";
import useAutoUpdate from "@/hooks/use-auto-update";
import { fetchHeroBannerItems } from "@/services/hero-banner";
import { useCallback } from "react";
import AutoScrollSlider, { onSlideProps } from "./ui/auto-scroll-slider";
import Card from "./ui/card";

export default function HeroBanner() {
  const data = useAutoUpdate(fetchHeroBannerItems, { intervalMs: heroBannerUpdateRate });

  const handleSlide = useCallback(
    ({ prevElement, element, index }: onSlideProps) => {
      if (prevElement instanceof HTMLVideoElement) {
        prevElement.pause();
        prevElement.currentTime = 0;
      }

      if (element instanceof HTMLVideoElement) {
        element.play();
      }

      if (data && data.length > index && data[index].duration) {
        return data[index].duration * seconds;
      }
      return heroBannerDefaultSlideRate;
    },
    [data],
  );

  if (!data) {
    return (
      <Card size="lg" className="aspect-video p-0">
        <img src={heroBannerDefaultImageURL} alt="기본 이미지" />
      </Card>
    );
  }

  return (
    <Card size="lg" className="aspect-video p-0">
      <AutoScrollSlider onSlide={handleSlide}>
        {data.map(({ type, url }) =>
          type === "image" ? (
            <img className="aspect-video w-full object-cover" key={url} src={url} />
          ) : (
            <video className="aspect-video w-full" key={url} src={url} muted={true} />
          ),
        )}
      </AutoScrollSlider>
    </Card>
  );
}
