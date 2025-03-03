import { cafeterialMealApiURL } from "@/constants/url";
import { fetchWithStatusHandling } from "@/utils/utils";

type Response = {
  cafeteria: string;
  type: "중식" | "석식";
  operatingHours: string;
  menu: string[];
}[];

export const fetchCafeteriaMeal = async () => fetchWithStatusHandling(cafeterialMealApiURL, (data: Response) => data);
