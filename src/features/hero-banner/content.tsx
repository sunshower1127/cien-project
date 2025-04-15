import AutoScrollSlider, { OnSlideProps } from "@/components/auto-scroll-slider";
import ErrorBoundary from "@/lib/sw-toolkit/components/ErrorBoundary";
import { second } from "@/lib/sw-toolkit/utils/time";
import api from "@/services/api";
import { useCallback } from "react";
import { ItemType } from ".";

type ConfigType = Awaited<ReturnType<typeof api.siso.getGalleryConfig>>;

export default function Content({ data, config }: { data: ItemType; config?: ConfigType }) {
  const handleSlide = useCallback(
    async ({ prevElement, element }: OnSlideProps) => {
      if (prevElement instanceof HTMLVideoElement) {
        try {
          prevElement.pause();
          prevElement.currentTime = 0;
        } catch (e) {
          // ignore
        }
      }

      if (element instanceof HTMLVideoElement) {
        try {
          await element.play();
          return Math.min(config?.videoMaxDisplayTime || 10, element.duration || 10) * second;
        } catch (e) {
          // ignore
        }
      }

      return (config?.photoDisplayTime || 10) * second;
    },
    [config?.videoMaxDisplayTime, config?.photoDisplayTime],
  );
  return (
    <ErrorBoundary>
      <AutoScrollSlider onSlide={handleSlide}>
        {data.map(({ type, url }) =>
          type === "image" ? (
            <img className="aspect-video w-full object-cover" key={url} src={url} />
          ) : (
            <video className="aspect-video w-full" key={url} src={url} muted={true} />
          ),
        )}
      </AutoScrollSlider>
    </ErrorBoundary>
  );
}
