import { noticeBoardApiURL } from "@/constants/url";
import { fetchWithStatusHandling } from "@/utils/utils";

type Response = {
  id: number;
  notice: string;
  date: string;
}[];

export const fetchNoticeBoard = async () =>
  fetchWithStatusHandling(noticeBoardApiURL, (data: Response) => {
    data.sort((a, b) => a.id - b.id);
    return data.slice(0, 3).map(({ notice, date }) => `${date} ${notice}`);
  });
