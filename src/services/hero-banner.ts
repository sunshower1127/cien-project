import { fetchWithStatusHandling } from "@/utils/fetch";
import { heroBannerApiURL } from "./constants/url";

// TODO: 성능 이슈로 비디오 기능 삭제?
type Response = {
  type: "image" | "video";
  url: string;
}[];

type ConfigResponse = {
  photoDisplayTime: number;
  videoMaxDisplayTime: number;
};

// TODO: Dummy fetching
export const fetchHeroBannerItems = async () => fetchWithStatusHandling(heroBannerApiURL, (data: Response) => data);

export const fetchHeroBannerConfig = async () => fetchWithStatusHandling(heroBannerApiURL, (data: ConfigResponse) => data);
// {
//   type: "video",
//   url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//   duration: 4,
// },
