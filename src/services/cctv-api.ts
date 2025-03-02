import { peopleCountApiURL } from "@/constants/url";
import { fetchWithStatusHandling } from "@/utils/utils";

interface Response {
  peopleCount: number;
  isPeopleThere: boolean;
}

export const fetchCountOfStudentsInClubRoom = async () => fetchWithStatusHandling(peopleCountApiURL, (data: Response) => (data.isPeopleThere ? data.peopleCount : 0));
