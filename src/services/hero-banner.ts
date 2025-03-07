import { fetchWithStatusHandling } from "@/utils/fetch";
import { heroBannerApiURL } from "./constants/url";

// TODO: 성능 이슈로 비디오 기능 삭제?
type Response = {
  type: "image" | "video";
  url: string;
  duration?: number; // 초 단위라고 가정
}[];

export const fetchHeroBannerItems = async () => fetchWithStatusHandling(heroBannerApiURL, (data: Response) => data);

// {
//   type: "video",
//   url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//   duration: 4,
// },
