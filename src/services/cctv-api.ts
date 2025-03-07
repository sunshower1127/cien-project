import { fetchWithStatusHandling } from "@/utils/fetch";
import { peopleCountApiURL } from "./constants/url";

interface Response {
  peopleCount: number;
  isPeopleThere: boolean;
}

export const fetchCountOfStudentsInClubRoom = async () => fetchWithStatusHandling(peopleCountApiURL, (data: Response) => (data.isPeopleThere ? data.peopleCount : 0));
