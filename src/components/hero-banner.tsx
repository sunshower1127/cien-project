import useAutoUpdate from "@/hooks/use-auto-update";
import { heroBannerConfigUpdateRate, heroBannerUpdateRate, second } from "@/services/constants/time";
import { heroBannerDefaultImageURL } from "@/services/constants/url";
import { fetchHeroBannerConfig, fetchHeroBannerItems } from "@/services/hero-banner";
import { useCallback } from "react";
import AutoScrollSlider, { onSlideProps } from "./ui/auto-scroll-slider";
import Card from "./ui/card";

export default function HeroBanner() {
  const config = useAutoUpdate(fetchHeroBannerConfig, { intervalMs: heroBannerConfigUpdateRate });
  const data = useAutoUpdate(fetchHeroBannerItems, { intervalMs: heroBannerUpdateRate });

  const handleSlide = useCallback(
    ({ prevElement, element }: onSlideProps) => {
      if (prevElement instanceof HTMLVideoElement) {
        prevElement.pause();
        prevElement.currentTime = 0;
      }

      if (element instanceof HTMLVideoElement) {
        element.play();
        return Math.min(config?.videoMaxDisplayTime || 10, element.duration) * second;
      }

      return (config?.photoDisplayTime || 10) * second;
    },
    [config?.videoMaxDisplayTime, config?.photoDisplayTime],
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
