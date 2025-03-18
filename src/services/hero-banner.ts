import { fetchWithStatusHandling } from "@/utils/fetch";
import { heroBannerApiURL } from "./constants/url";

// TODO: 성능 이슈로 비디오 기능 삭제?
type Response = {
  id: number;
  mediaType: string;
}[];

type ConfigResponse = {
  photoDisplayTime: number;
  videoMaxDisplayTime: number;
};

// TODO: Dummy fetching
export const fetchHeroBannerItems = async () =>
  fetchWithStatusHandling(heroBannerApiURL, (data: Response) =>
    data.map((item) => ({
      type: item.mediaType.split("/")[0] as "image" | "video",
      url: heroBannerApiURL + "/" + item.id,
    })),
  );

export const fetchHeroBannerConfig = async () => fetchWithStatusHandling(heroBannerApiURL, (data: ConfigResponse) => data);
