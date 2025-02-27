import { subwayApiURL } from "@/constants/url";

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

export async function fetchSubwayData() {
  const resp = await fetch(subwayApiURL);
  if (resp.status === 200) {
    const { errorMessage, realtimeArrivalList } = (await resp.json()) as Response;
    if (errorMessage.status !== 200) {
      throw errorMessage;
    }
    if (errorMessage.total !== realtimeArrivalList.length) {
      throw new Error(`기대한 데이터 개수: ${errorMessage.total}, 실제 데이터 개수: ${realtimeArrivalList.length}`);
    }

    const result: { 하행: string[]; 상행: string[] } = { 하행: [], 상행: [] };

    realtimeArrivalList.forEach(({ updnLine, arvlMsg2: msg }) => {
      result[updnLine].push(msg);
    });

    return result;
  } else if (resp.status === 304) {
    return null;
  } else {
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }
}
