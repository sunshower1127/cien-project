import { peopleCountApiURL } from "@/constants/url";

interface Response {
  peopleCount: number;
  isPeopleThere: boolean;
}
export async function fetchCountOfStudentsInClubRoom() {
  const resp = await fetch(peopleCountApiURL);
  if (resp.status === 200) {
    const data = (await resp.json()) as Response;

    if (!data.isPeopleThere) return 0;

    return data.peopleCount;
  } else if (resp.status === 304) {
    return null;
  } else {
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }
}
