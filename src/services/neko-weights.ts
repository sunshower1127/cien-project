import { NekoType } from "@/lib/neko-manager";
import { nekoWeightsApiURL } from "@/services/constants/url";
import { fetchWithStatusHandling } from "@/utils/fetch";

type Response = { [name in NekoType]?: number };

// TODO: Dummy fetching
export const fetchNekoWeights = async () => fetchWithStatusHandling(nekoWeightsApiURL, (data: Response) => data);
