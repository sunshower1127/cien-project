import { nekoWeightsApiURL } from "@/constants/url";
import { NekoType } from "@/lib/neko-manager";
import { fetchWithStatusHandling } from "@/utils/api";

type Response = { [name in NekoType]?: number };

export const fetchNekoWeights = async () => fetchWithStatusHandling(nekoWeightsApiURL, (data: Response) => data);
