import AutoScrollSlider, { onSlideProps } from "@/components/auto-scroll-slider";
import api from "@/services/api";
import { second } from "@/utils/time";
import { noop } from "es-toolkit";
import { useCallback } from "react";
import { ItemType } from "./_hero-banner";

type ConfigType = Awaited<ReturnType<typeof api.siso.getGalleryConfig>>;

export default function Content({ data, config }: { data: ItemType; config?: ConfigType }) {
  // TODO: 현재 일시적인 서버 에러로 임시방편으로 설정
  if (config) {
    if (config.photoDisplayTime > 1000 || config.videoMaxDisplayTime > 1000) {
      config.photoDisplayTime = 10;
      config.videoMaxDisplayTime = 30;
    }
  }

  const handleSlide = useCallback(
    async ({ prevElement, element }: onSlideProps) => {
      if (prevElement instanceof HTMLVideoElement) {
        try {
          prevElement.pause();
          prevElement.currentTime = 0;
        } catch (e) {
          noop();
        }
      }

      if (element instanceof HTMLVideoElement) {
        try {
          await element.play();
          return Math.min(config?.videoMaxDisplayTime || 10, element.duration || 10) * second;
        } catch (e) {
          return 0;
        }
      }

      return (config?.photoDisplayTime || 10) * second;
    },
    [config?.videoMaxDisplayTime, config?.photoDisplayTime],
  );
  return (
    <AutoScrollSlider onSlide={handleSlide}>
      {data.map(({ type, url }) =>
        type === "image" ? (
          <img className="aspect-video w-full object-cover" key={url} src={url} />
        ) : (
          <video className="aspect-video w-full" key={url} src={url} muted={true} />
        ),
      )}
    </AutoScrollSlider>
  );
}
