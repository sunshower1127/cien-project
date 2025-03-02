import { subwayApiURL } from "@/constants/url";
import { fetchWithStatusHandling } from "@/utils/utils";

interface Response {
  errorMessage: {
    status: number;
    code: string;
    message: string;
    link: string;
    developerMessage: string;
    total: number;
  };
  realtimeArrivalList: {
    updnLine: "하행" | "상행";
    arvlMsg2: string;
  }[];
}

export const fetchSubwayData = async () =>
  fetchWithStatusHandling(subwayApiURL, ({ errorMessage, realtimeArrivalList }: Response) => {
    if (errorMessage.status !== 200) {
      throw new Error(JSON.stringify(errorMessage, null, 2));
    }
    if (errorMessage.total !== realtimeArrivalList.length) {
      throw new Error(`기대한 데이터 개수: ${errorMessage.total}, 실제 데이터 개수: ${realtimeArrivalList.length}`);
    }

    const result: { 하행: string[]; 상행: string[] } = { 하행: [], 상행: [] };

    realtimeArrivalList.forEach(({ updnLine, arvlMsg2: msg }) => {
      result[updnLine].push(msg);
    });

    return result;
  });
