import { second } from "@/constants/time";

import api, { refetchInterval } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { noop } from "es-toolkit";
import { useCallback } from "react";
import AutoScrollSlider, { onSlideProps } from "./ui/auto-scroll-slider";
import Card from "./ui/card";

export default function HeroBanner() {
  const { data: config } = useQuery({
    queryKey: ["hero-banner-config"],
    queryFn: () => api.siso.getGalleryConfig(),
    refetchInterval: refetchInterval.banner,
  });
  const query = useQuery({ queryKey: ["hero-banner-items"], queryFn: () => getBannerItems(), refetchInterval: refetchInterval.banner });

  return (
    <Card size="lg" className="aspect-video p-0">
      <Card.Data
        result={query}
        emptyElement={() => <img src={api.dummy.getDefaultBannerImageURL()} alt="기본 이미지" />}
        render={(data) => <Content data={data} config={config} />}
      />
    </Card>
  );
}

type ConfigType = Awaited<ReturnType<typeof api.siso.getGalleryConfig>>;
type ItemType = Awaited<ReturnType<typeof getBannerItems>>;

function Content({ data, config }: { data: ItemType; config?: ConfigType }) {
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

async function getBannerItems() {
  const items = await api.siso.getMedias();

  return items.map((item) => ({
    type: item.mediaType.split("/")[0] as "image" | "video",
    url: api.siso.getMediaURL(item.id),
  }));
}
