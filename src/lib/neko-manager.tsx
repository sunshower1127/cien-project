import api, { refetchInterval } from "@/services/api";
import { weightedRandom } from "@/utils/weighted-random";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "es-toolkit";
import { times } from "es-toolkit/compat";
import { useEffect } from "react";

export default function NekoManager() {
  const query = useQuery({
    queryKey: ["people-count"],
    queryFn: () => api.cien.getClubRoomPeopleCount(),
    refetchInterval: refetchInterval.peopleCount,
  });

  const peopleCnt = query.data?.peopleCount;

  useEffect(() => {
    if (isNil(peopleCnt)) return;

    const nekoCnt = getNekoLength();

    if (peopleCnt > nekoCnt) {
      addRandomNekos(peopleCnt - nekoCnt);
    } else {
      times(nekoCnt - peopleCnt, removeNeko);
    }
  }, [peopleCnt]);

  return <div aria-label="neko-container" ref={init}></div>;
}

function init(nekoContainer: HTMLDivElement) {
  setNekoContainer(nekoContainer);
  setNekoSpeed(1.0);
  setNekoSize(2.0);
}

async function addRandomNekos(count: number) {
  try {
    const weights = await api.dummy.getNekoWeights(); // TODO: DUMMY: 추후 수정
    if (weights !== null) {
      times(count, () => addNeko(weightedRandom(weights)));
    }
  } catch (error) {
    console.error(error);
  }
}

// https://webneko.net/ 참고
export type NekoType =
  | "white"
  | "black"
  | "gray"
  | "calico"
  | "robot"
  | "peach"
  | "colourful"
  | "earth"
  | "air"
  | "water"
  | "fire"
  | "spirit"
  | "rainbow"
  | "silversky"
  | "orange"
  | "ghetto"
  | "neon"
  | "pink"
  | "ghost"
  | "lucky"
  | "moka"
  | "usa"
  | "rose"
  | "blue"
  | "silver"
  | "kuramecha"
  | "kina"
  | "ace"
  | "spooky"
  | "holiday"
  | "valentine"
  | "marmalade"
  | "royal"
  | "mermaid"
  | "socks"
  | "dave"
  | "jess"
  | "mike"
  | "lucy"
  | "fancy";

declare function addNeko(nekoType?: NekoType): void;
declare function removeNeko(): void;
declare function getNekoLength(): number;
declare function setNekoContainer(element: string | HTMLElement): void;
declare function setNekoSpeed(speed: number): void;
declare function setNekoSize(ratio: number): void;
