import { nekoWeightsApiURL } from "@/constants/url";
import { NekoType } from "@/lib/neko-manager";
import { fetchWithStatusHandling } from "@/utils/utils";

type Response = Partial<Record<NekoType, number>>;

export const fetchNekoWeights = async () => fetchWithStatusHandling(nekoWeightsApiURL, (data: Response) => data);
