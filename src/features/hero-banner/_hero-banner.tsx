import defaultHeroBannerImage from "@/assets/default-banner.jpg";
import Card from "@/components/ui/card";
import api, { refetchInterval } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Content from "./content";

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
        emptyElement={() => <img src={defaultHeroBannerImage} alt="기본 이미지" />}
        render={(data) => <Content data={data} config={config} />}
      />
    </Card>
  );
}

async function getBannerItems() {
  const items = await api.siso.getMedias();

  return items.map((item) => ({
    type: item.mediaType.split("/")[0] as "image" | "video",
    url: api.siso.getMediaURL(item.id),
  }));
}

export type ItemType = Awaited<ReturnType<typeof getBannerItems>>;
