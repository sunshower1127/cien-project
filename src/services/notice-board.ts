import { noticeBoardApiURL } from "@/constants/url";

type Response = {
  id: number;
  notice: string;
  date: string;
}[];

export async function fetchNoticeBoard() {
  const resp = await fetch(noticeBoardApiURL);
  if (resp.status === 200) {
    const data = (await resp.json()) as Response;
    data.sort((a, b) => a.id - b.id);
    return data.slice(0, 3).map(({ notice, date }) => `${date} ${notice}`);
  } else if (resp.status === 304) {
    return null;
  } else {
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }
}
